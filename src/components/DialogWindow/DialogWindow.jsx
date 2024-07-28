import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  DialogContentText,
} from "@mui/material";

const DialogWindow = ({
  open,
  handleClose,
  WindowText = "Your order has been successfully placed on the website. A manager will contact you shortly.",
}) => {
  const dialogStyles = {
    backgroundColor: "rgba(13, 80, 255, 1)",
    color: "rgba(255, 255, 255, 1)",
    
    
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box
        sx={{

          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          ...dialogStyles,
        }}
      >
        <DialogTitle sx={dialogStyles} id="alert-dialog-title">
          {"Congratulations!"}
        </DialogTitle>
        <DialogActions sx={dialogStyles}>
          <Button sx={dialogStyles} onClick={handleClose}>
            x
          </Button>
        </DialogActions>
      </Box>
      <DialogContent sx={dialogStyles}>
        <DialogContentText id="alert-dialog-description" sx={dialogStyles}>
          {WindowText}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default DialogWindow;
