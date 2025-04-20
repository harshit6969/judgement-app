import { useEffect } from "react";
import { useNotify } from "../store/appStore";
export const GlobalErrorBoundary = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const notify = useNotify();

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      notify.error(event.error?.message || "An unexpected error occurred");
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      notify.error(event.reason?.message || "An async error occurred");
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, [notify]);

  return <>{children}</>;
};
