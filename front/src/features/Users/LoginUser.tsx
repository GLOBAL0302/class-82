import { Avatar, Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
const initalStateUserMutation = {
  username: '',
  password: '',
};

const LoginUser = () => {
  const [userMutation, setUserMutation] = useState(initalStateUserMutation);

  const onSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userMutation);
  };
  const handleUserMutation = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { value, name } = e.target;
    setUserMutation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <Box component="div" className="flex flex-col items-center gap-4">
      <Avatar>
        <LoginIcon />
      </Avatar>
      <Typography variant="h4" component="h5">
        Log in
      </Typography>
      <Box component="form" onSubmit={onSubmitLogin} className="w-96 flex flex-col gap-2">
        <TextField
          id="username"
          label="Username"
          name="username"
          fullWidth
          variant="filled"
          type="text"
          onChange={handleUserMutation}
          autoComplete="current-user"
        />
        <TextField
          id="password"
          label="Password"
          name="password"
          fullWidth
          variant="filled"
          type="password"
          onChange={handleUserMutation}
          autoComplete="current-password"
        />
        <Button variant="contained" color="primary" type="submit">
          Signin
        </Button>
        <Grid>
          <Link to="/signin" variant="body2" component={RouterLink}>
            do not have account? sign in
          </Link>
        </Grid>
      </Box>
    </Box>
  );
};

export default LoginUser;
