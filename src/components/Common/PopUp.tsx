import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from '@mui/styles';
import {
  Breakpoint,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Theme,
  Typography,
} from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
  dialogWrapper: {
    // padding: theme.spacing(2),
    position: 'absolute',
    // top: theme.spacing(5),
  },
  dialogTitle: {
    paddingRight: '0px',
  },
  closeBtn: {
    position: 'absolute',
    // top: theme.spacing(2),
    // right: theme.spacing(2),
  },
}));

interface PopupProps {
  title: string;
  subtitle?: string;
  children: any;
  openPopup: boolean;
  onClose: () => void;
  fullWith?: boolean;
  maxWidth?: Breakpoint;
  fullScreen?: boolean;
}

export default function Popup({
  title,
  subtitle,
  children,
  openPopup,
  onClose,
  fullWith,
  maxWidth,
  fullScreen,
}: PopupProps) {
  const classes = useStyles();

  return (
    <Dialog
      open={openPopup}
      classes={{ paper: classes.dialogWrapper }}
      fullWidth={fullWith}
      maxWidth={maxWidth}
      fullScreen={fullScreen}
    >
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Typography variant="subtitle1" component="div">
            {subtitle}
          </Typography>
          {onClose ? (
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </div>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
