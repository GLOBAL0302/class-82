import { Button, Menu, MenuItem, Typography } from '@mui/material';
import type { IUser } from '../../types';
import { useState, type MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { logOutThunk } from '../../features/Users/userThunk';

interface Props {
  user: IUser;
}

const CurrentUser: React.FC<Props> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const logOut = ()=>{
    dispatch(logOutThunk())
    setAnchorEl(null)
  }

  const handleClose = () => {
    navigate('/tracks_history');
    setAnchorEl(null);
  };
  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {user.username}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        <MenuItem onClick={handleClose}>Track History</MenuItem>
         <MenuItem onClick={logOut}>Log Out</MenuItem>
      </Menu>
    </>
  );
};

export default CurrentUser;
