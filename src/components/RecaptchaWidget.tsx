import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    grecaptcha?: {
      render: (element: HTMLElement, options: Record<string, unknown>) => number;
      reset: (widgetId: number) => void;
    };
    arkaRecaptchaReady?: () => void;
  }
}

let apiPromise: Promise<void> | undefined;

function loadRecaptcha() {
  if (window.grecaptcha?.render) return Promise.resolve();
  if (apiPromise) return apiPromise;
  apiPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    const fail = () => {
      clearTimeout(timeout);
      script.remove();
      apiPromise = undefined;
      reject(new Error("The security check could not load. Check your connection and retry."));
    };
    const timeout = window.setTimeout(fail, 20_000);
    // Google's callback runs after all widget dependencies are ready.
    window.arkaRecaptchaReady = () => {
      clearTimeout(timeout);
      script.onerror = null;
      resolve();
    };
    script.src = "https://www.google.com/recaptcha/api.js?onload=arkaRecaptchaReady&render=explicit";
    script.async = true;
    script.defer = true;
    script.onerror = fail;
    document.head.appendChild(script);
  });
  return apiPromise;
}

export function RecaptchaWidget({ onToken, resetKey = 0 }: { onToken: (token: string) => void; resetKey?: number }) {
  const container = useRef<HTMLDivElement>(null);
  const [retryKey, setRetryKey] = useState(0);
  const [widgetError, setWidgetError] = useState("");
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    const host = container.current;
    if (!siteKey || !host) return;
    let cancelled = false;
    let widgetId: number | undefined;
    onToken("");
    setWidgetError("");
    // A fresh child allows remounts and retries without reusing Google's render target.
    const target = document.createElement("div");
    host.appendChild(target);
    loadRecaptcha().then(() => {
      if (cancelled || !window.grecaptcha) return;
      widgetId = window.grecaptcha.render(target, {
        sitekey: siteKey,
        theme: "light",
        size: host.clientWidth < 304 ? "compact" : "normal",
        callback: (token: string) => {
          if (cancelled) return;
          setWidgetError("");
          onToken(token);
        },
        "expired-callback": () => {
          if (cancelled) return;
          onToken("");
          setWidgetError("The security check expired. Please complete reCAPTCHA again.");
        },
        "error-callback": () => {
          if (cancelled) return;
          onToken("");
          setWidgetError("The security check could not complete. Check your connection and retry.");
        },
      });
    }).catch(() => {
      if (cancelled) return;
      onToken("");
      setWidgetError("The security check could not load. Check your connection and retry.");
    });
    return () => {
      cancelled = true;
      if (widgetId !== undefined) window.grecaptcha?.reset(widgetId);
      target.remove();
    };
  }, [siteKey, onToken, resetKey, retryKey]);

  if (!siteKey) return <p className="form-error" role="alert">Security check is not configured.</p>;
  return <div className="recaptcha-check">
    <div className="recaptcha-widget" ref={container} aria-label="Google reCAPTCHA security check" />
    {widgetError && <p className="form-error" role="alert">{widgetError} <button type="button" className="recaptcha-retry" onClick={() => setRetryKey((key) => key + 1)}>Retry security check</button></p>}
  </div>;
}
