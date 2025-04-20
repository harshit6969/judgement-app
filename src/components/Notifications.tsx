import { Snackbar, Alert } from "@mui/material";
import { useAppStore } from "../store/appStore";

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
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose(notification.id)}
            severity={notification.type}
            variant="filled"
          >
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};
