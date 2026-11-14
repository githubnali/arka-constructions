import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

declare global {
  interface Window {
    grecaptcha?: {
      execute: (widgetId: number) => void;
      render: (element: HTMLElement, options: Record<string, unknown>) => number;
      reset: (widgetId: number) => void;
    };
    arkaRecaptchaReady?: () => void;
  }
}

export type RecaptchaWidgetHandle = {
  execute: () => Promise<string>;
  reset: () => void;
};

type PendingChallenge = {
  promise: Promise<string>;
  resolve: (token: string) => void;
  reject: (error: Error) => void;
};

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

export const RecaptchaWidget = forwardRef<RecaptchaWidgetHandle, { resetKey?: number }>(function RecaptchaWidget(
  { resetKey = 0 },
  ref,
) {
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef<number | undefined>(undefined);
  const pending = useRef<PendingChallenge | null>(null);
  const [ready, setReady] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const [widgetError, setWidgetError] = useState("");
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  function rejectPending(message: string) {
    pending.current?.reject(new Error(message));
    pending.current = null;
  }

  useImperativeHandle(ref, () => ({
    execute() {
      if (!siteKey) return Promise.reject(new Error("Security check is not configured."));
      if (!ready || widgetId.current === undefined || !window.grecaptcha) {
        return Promise.reject(new Error("The security check is still loading. Please try again."));
      }
      if (pending.current) return pending.current.promise;

      setWidgetError("");
      let resolveChallenge!: (token: string) => void;
      let rejectChallenge!: (error: Error) => void;
      const promise = new Promise<string>((resolve, reject) => {
        resolveChallenge = resolve;
        rejectChallenge = reject;
      });
      pending.current = { promise, resolve: resolveChallenge, reject: rejectChallenge };
      try {
        window.grecaptcha.execute(widgetId.current);
      } catch {
        rejectPending("The security check could not start. Please try again.");
      }
      return promise;
    },
    reset() {
      if (widgetId.current !== undefined) window.grecaptcha?.reset(widgetId.current);
      rejectPending("The security check was reset. Please try again.");
    },
  }), [ready, siteKey]);

  useEffect(() => {
    const host = container.current;
    if (!siteKey || !host) return;
    let cancelled = false;
    setReady(false);
    setWidgetError("");
    const target = document.createElement("div");
    host.appendChild(target);

    loadRecaptcha().then(() => {
      if (cancelled || !window.grecaptcha) return;
      widgetId.current = window.grecaptcha.render(target, {
        sitekey: siteKey,
        size: "invisible",
        badge: "bottomright",
        callback: (token: string) => {
          if (cancelled) return;
          setWidgetError("");
          pending.current?.resolve(token);
          pending.current = null;
        },
        "expired-callback": () => {
          if (cancelled) return;
          const message = "The security check expired. Please submit the form again.";
          setWidgetError(message);
          rejectPending(message);
        },
        "error-callback": () => {
          if (cancelled) return;
          const message = "The security check could not complete. Check your connection and retry.";
          setWidgetError(message);
          rejectPending(message);
        },
      });
      setReady(true);
    }).catch(() => {
      if (cancelled) return;
      const message = "The security check could not load. Check your connection and retry.";
      setWidgetError(message);
      rejectPending(message);
    });

    return () => {
      cancelled = true;
      setReady(false);
      rejectPending("The security check was cancelled. Please try again.");
      if (widgetId.current !== undefined) window.grecaptcha?.reset(widgetId.current);
      widgetId.current = undefined;
      target.remove();
    };
  }, [siteKey, resetKey, retryKey]);

  if (!siteKey) return <p className="form-error" role="alert">Security check is not configured.</p>;
  return <div className="recaptcha-check">
    <div className="recaptcha-widget" ref={container} aria-label="Invisible Google reCAPTCHA security check" />
    {widgetError && <p className="form-error" role="alert">{widgetError} <button type="button" className="recaptcha-retry" onClick={() => setRetryKey((key) => key + 1)}>Retry security check</button></p>}
  </div>;
});
