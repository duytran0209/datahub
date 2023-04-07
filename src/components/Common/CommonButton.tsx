import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
export const CommonButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#4B4DED'),
  backgroundColor: '#4B4DED',
  '&:hover': {
    backgroundColor: '#4C6FFF',
  },
}));
