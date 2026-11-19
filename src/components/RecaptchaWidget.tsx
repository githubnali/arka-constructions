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
  const widgetPromise = useRef<Promise<number> | null>(null);
  const pending = useRef<PendingChallenge | null>(null);
  const [widgetError, setWidgetError] = useState("");
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  function rejectPending(message: string) {
    pending.current?.reject(new Error(message));
    pending.current = null;
  }

  function ensureWidget() {
    if (widgetId.current !== undefined) return Promise.resolve(widgetId.current);
    if (widgetPromise.current) return widgetPromise.current;

    widgetPromise.current = loadRecaptcha().then(() => {
      const host = container.current;
      if (!host || !window.grecaptcha) throw new Error("The security check could not start. Please try again.");

      const target = document.createElement("div");
      host.replaceChildren(target);
      const id = window.grecaptcha.render(target, {
        sitekey: siteKey,
        size: "invisible",
        badge: "bottomright",
        callback: (token: string) => {
          setWidgetError("");
          pending.current?.resolve(token);
          pending.current = null;
        },
        "expired-callback": () => {
          const message = "The security check expired. Please submit the form again.";
          setWidgetError(message);
          rejectPending(message);
        },
        "error-callback": () => {
          const message = "The security check could not complete. Check your connection and retry.";
          setWidgetError(message);
          rejectPending(message);
        },
      });
      widgetId.current = id;
      return id;
    }).catch((error) => {
      widgetPromise.current = null;
      const message = error instanceof Error ? error.message : "The security check could not load. Check your connection and retry.";
      setWidgetError(message);
      throw new Error(message);
    });

    return widgetPromise.current;
  }

  useImperativeHandle(ref, () => ({
    async execute() {
      if (!siteKey) return Promise.reject(new Error("Security check is not configured."));
      if (pending.current) return pending.current.promise;

      setWidgetError("");
      const id = await ensureWidget();
      if (!window.grecaptcha) throw new Error("The security check could not start. Please try again.");

      let resolveChallenge!: (token: string) => void;
      let rejectChallenge!: (error: Error) => void;
      const promise = new Promise<string>((resolve, reject) => {
        resolveChallenge = resolve;
        rejectChallenge = reject;
      });
      pending.current = { promise, resolve: resolveChallenge, reject: rejectChallenge };
      try {
        window.grecaptcha.execute(id);
      } catch {
        rejectPending("The security check could not start. Please try again.");
      }
      return promise;
    },
    reset() {
      if (widgetId.current !== undefined) window.grecaptcha?.reset(widgetId.current);
      rejectPending("The security check was reset. Please try again.");
    },
  }), [siteKey]);

  useEffect(() => {
    if (resetKey > 0 && widgetId.current !== undefined) window.grecaptcha?.reset(widgetId.current);
  }, [resetKey]);

  useEffect(() => () => {
    rejectPending("The security check was cancelled. Please try again.");
    if (widgetId.current !== undefined) window.grecaptcha?.reset(widgetId.current);
    widgetId.current = undefined;
    widgetPromise.current = null;
  }, []);

  if (!siteKey) return <p className="form-error" role="alert">Security check is not configured.</p>;
  return <div className="recaptcha-check">
    <div className="recaptcha-widget" ref={container} aria-label="Invisible Google reCAPTCHA security check" />
    {widgetError && <p className="form-error" role="alert">{widgetError}</p>}
  </div>;
});
