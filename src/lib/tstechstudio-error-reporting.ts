type TstechstudioErrorOptions = {
  mechanism?: "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";
  handled?: boolean;
  severity?: "error" | "warning" | "info";
};

type TstechstudioEvents = {
  captureException?: (
    error: unknown,
    context?: Record<string, unknown>,
    options?: TstechstudioErrorOptions,
  ) => void;
};

declare global {
  interface Window {
    __tstechstudioEvents?: TstechstudioEvents;
  }
}

export function reportTstechstudioError(error: unknown, context: Record<string, unknown> = {}) {
  console.error("TS Tech Studio Error:", error, context);
  if (typeof window === "undefined") return;
  window.__tstechstudioEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context,
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error",
    },
  );
}
