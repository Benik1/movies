import { AppBar } from '@mui/material';

import { useSelector } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';

function NavBar() {
  const user = useSelector((state) => state.user);
  const { profile } = user;

  console.log('profile ', profile)

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
    </AppBar>
  )
}

export default NavBar;
