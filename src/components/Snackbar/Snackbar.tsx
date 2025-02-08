import { Alert, AlertColor } from "@mui/material";
import LibrarySnackbar from "@mui/material/Snackbar";
import { useEffect } from "react";

import SlideTransition from "./SlideTransition";

interface ISnackbarProps {
  open: boolean;
  message: string;
  onClose: () => void;
  autoHideDuration?: number;
  severity?: AlertColor;
}

const Snackbar = ({
  open,
  message,
  onClose,
  autoHideDuration = 3000,
  severity,
}: ISnackbarProps) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, autoHideDuration);

      return () => clearTimeout(timer);
    }
  }, [open, autoHideDuration, onClose]);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    onClose();
  };

  return (
    <LibrarySnackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      autoHideDuration={autoHideDuration}
      open={open}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
    >
      <Alert
        onClose={handleClose}
        severity={severity || "info"}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </LibrarySnackbar>
  );
};

export default Snackbar;
