import { Logout, Settings } from '@mui/icons-material';
import {
  Avatar,
  Button,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authActions } from 'features/auth/authSlice';
import ChangePasswordForm from 'features/auth/components/ChangePasswordForm';
import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChangePasswordPayload } from '../../models/changePassword';
import Popup from './PopUp';
import { toast } from 'react-toastify';

export function Header() {
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const user = useAppSelector((s) => s.auth.currentUser);
  const name = user ? (user.fullName ? user.fullName : user.username) : '';

  const handleOpenPopup = () => {
    setOpenPopup(!openPopup);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  const handleSubmit = async (formValues: ChangePasswordPayload) => {
    dispatch(authActions.changePassword(formValues));
    toast.success('Change password success');
    setOpenPopup(false);
  };

  return (
    <>
      <Toolbar
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h5" component="h1"></Typography>
        <Tooltip title="Account settings">
          <Button
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            {name}
            <Avatar sx={{ width: 32, height: 32, marginLeft: 1 }}>{name.split(' ')[0][0]}</Avatar>
          </Button>
        </Tooltip>
      </Toolbar>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            minWidth: '180px',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar /> {t('Profile')}
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          {t('Settings')}
        </MenuItem>

        <MenuItem onClick={handleOpenPopup}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          {t('Change Password')}
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {t('Logout')}
        </MenuItem>
      </Menu>
      <Popup
        title="Đổi mật khẩu"
        openPopup={openPopup}
        onClose={() => {
          setOpenPopup(false);
        }}
      >
        <ChangePasswordForm onSubmit={handleSubmit}></ChangePasswordForm>
      </Popup>
    </>
  );
}
