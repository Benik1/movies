import { useState } from 'react';
import {
  Menu,
  Grid,
  Avatar,
  AppBar,
  MenuItem,
  Typography,
  IconButton,
  ListItemIcon
} from '@mui/material';
import { resetProfile } from '../../store/user';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { profile } = user;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => setAnchorEl(null);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const singOut = () => {
    localStorage.removeItem('access_token');
    dispatch(resetProfile());
    navigate('/sing-in');
  }

  return (
    <AppBar
      position='fixed'
      sx={{
        mb: 60,
        height: 60,
        display: 'flex',
        backgroundColor: 'white',
      }}
    >
      <Grid
        px={2}
        container
        height='100%'
        alignItems='center'
        justifyContent='space-between'
      >
        <Grid item xs={6} />
        <Grid
          item
          xs={6}
          container
          alignItems='center'
          justifyContent='flex-end'
        >
          <Typography sx={{ mr: 1 }}>
            {`${profile?.firstName || ''} ${profile?.lastName || ''}`}
          </Typography>

          <IconButton onClick={openMenu}>
            <Avatar>{String(profile?.firstName[0])}</Avatar>
          </IconButton>
          <Menu open={open} anchorEl={anchorEl} onClose={handleClose} PaperProps={{ sx: { minWidth: 150 } }}>
            <MenuItem>
              <ListItemIcon>
                <AccountCircleIcon fontSize="small" />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={singOut}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </AppBar>
  )
}

export default NavBar;
