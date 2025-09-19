import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

const Incognito = () => {
  return (
    <div className="flex gap-3">
      <Button variant="outlined" color="primary" component={NavLink} to="/login">
        Log in
      </Button>
      <div className="h-100 w-1 bg-white"></div>
      <Button variant="outlined" color="primary" component={NavLink} to="/signin">
        Sign in
      </Button>
    </div>
  );
};

export default Incognito;
