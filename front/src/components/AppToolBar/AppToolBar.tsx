import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { Button } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
const AppToolBar = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 bg-zinc-900 mb-5 flex justify-between">
      <LibraryMusicIcon fontSize="large" sx={{ color: 'white' }} onClick={() => navigate('/')} />
      <div className="flex gap-3">
        <Button variant="outlined" color="primary" component={NavLink} to="/login">
          Log in
        </Button>
        <div className="h-100 w-1 bg-white"></div>
        <Button variant="outlined" color="primary" component={NavLink} to="/signin">
          Sign in
        </Button>
      </div>
    </div>
  );
};

export default AppToolBar;
