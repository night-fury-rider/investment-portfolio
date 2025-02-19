import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  Dialog as DialogLibrary,
  DialogTitle,
} from "@mui/material";
import React from "react";

import Transition from "$/components/Transition/Transition";

interface IDialogProps {
  handleCancel: () => void;
  open: boolean;
  cancelText?: string;
  confirmText?: string;
  content?: string;
  handleConfirm?: () => void;
  title?: string;
}

const Dialog = ({
  cancelText,
  confirmText,
  content,
  handleCancel,
  handleConfirm,
  open,
  title,
}: IDialogProps) => {
  return (
    <React.Fragment>
      <DialogLibrary
        open={open}
        TransitionComponent={Transition}
        onClose={handleCancel}
        aria-describedby="alert-dialog-slide-description"
        closeAfterTransition={false}
      >
        <DialogTitle>{title}</DialogTitle>
        {content && (
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {content}
            </DialogContentText>
          </DialogContent>
        )}

        <DialogActions>
          <Button onClick={handleCancel}>{cancelText}</Button>
          {handleConfirm && (
            <Button onClick={handleConfirm}>{confirmText}</Button>
          )}
        </DialogActions>
      </DialogLibrary>
    </React.Fragment>
  );
};

export default Dialog;
