import { Alert, Avatar, Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import type { ILoginMutation } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loginThunk } from './userThunk';
import { selectUserLoginError, selectUserLoginLoading } from './userSlice';
const initalStateUserMutation = {
  username: '',
  password: '',
};

const LoginUser = () => {
  const navigate = useNavigate();
  const [userMutation, setUserMutation] = useState<ILoginMutation>(initalStateUserMutation);
  const dispatch = useAppDispatch();
  const loginError = useAppSelector(selectUserLoginError);
  const loginLoading = useAppSelector(selectUserLoginLoading);

  const onSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(loginThunk(userMutation)).unwrap();
      navigate('/');
    } catch (e) {
      console.log(e);
    }
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
      {loginError && <Alert severity="error">{loginError.error}</Alert>}
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
        <Button disabled={loginLoading} loading={loginLoading} variant="contained" color="primary" type="submit">
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
