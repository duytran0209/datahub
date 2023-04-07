import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

interface CommonDialogProps {
  open: boolean;
  onClose: () => void;
  item: any;
  onConfirm: (item: any) => void;
  mainMessage: string;
  subMessage: string;
}

export default function CommonDialog({
  open,
  onClose,
  item,
  onConfirm,
  mainMessage,
  subMessage,
}: CommonDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle sx={{ textAlign: 'center' }}>
        <ClearIcon sx={{ fontSize: 60 }} color="error" />
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" align="center">
          <Typography color="#223354" component="h1" variant="h6">
            {mainMessage}
          </Typography>{' '}
          <br />
          {subMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Hủy
        </Button>

        <Button onClick={() => onConfirm(item as any)} color="error" variant="contained" autoFocus>
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  );
}
