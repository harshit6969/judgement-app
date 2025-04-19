// src/components/NotificationCenter.tsx
import { useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useAppStore, useNotify } from '../store/appStore';

export const NotificationCenter = () => {
  const { notifications, removeNotification } = useAppStore();
  
  const handleClose = (id: string) => () => {
    removeNotification(id);
  };

  return (
    <>
      {notifications.map((notification) => (
        <Snackbar
          key={notification.id}
          open={true}
          autoHideDuration={notification.duration}
          onClose={handleClose(notification.id)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={handleClose(notification.id)}
            severity={notification.type}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};

export const GlobalErrorBoundary = ({ children }: { children: React.ReactNode }) => {
    const notify = useNotify();
  
    useEffect(() => {
      const handleError = (event: ErrorEvent) => {
        notify.error(event.error?.message || 'An unexpected error occurred');
      };
  
      const handleRejection = (event: PromiseRejectionEvent) => {
        notify.error(event.reason?.message || 'An async error occurred');
      };
  
      window.addEventListener('error', handleError);
      window.addEventListener('unhandledrejection', handleRejection);
  
      return () => {
        window.removeEventListener('error', handleError);
        window.removeEventListener('unhandledrejection', handleRejection);
      };
    }, [notify]);
  
    return <>{children}</>;
  };