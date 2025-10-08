import { Avatar, Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loginGoogleThunk, signinThunk } from './userThunk';
import { selectUserSigninError, selectUserSigninLoading } from './userSlice';
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
const initalStateUserMutation = {
  username: '',
  password: '',
};

const SigninUser = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [userMutation, setUserMutation] = useState(initalStateUserMutation);
  const signinError = useAppSelector(selectUserSigninError);
  const signinLoading = useAppSelector(selectUserSigninLoading);

  const getFieldError = (fieldName: string) => {
    try {
      return signinError?.errors[fieldName].message;
    } catch (e) {
      return undefined;
    }
  };

  const onSubmitSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(signinThunk(userMutation)).unwrap();
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

  const googleLogin = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      await dispatch(loginGoogleThunk(credentialResponse.credential)).unwrap();
      navigate('/');
    }
  };
  return (
    <Box component="div" className="flex flex-col md:flex-row justify-center items-center space-x-6 h-screen ">
      <Box component="div" className="hidden md:block w-1/2">
        <img src="src/assets/logIn.svg" alt="log in Pic" className="ml-auto " />
      </Box>
      <Box component="div" className="flex flex-col items-center gap-4 md:w-1/2 md:items-start">
        <Avatar>
          <LockIcon />
        </Avatar>
        <Typography variant="h4" component="h5">
          Sign in
        </Typography>
        <Typography variant="subtitle2" component="p" className="text-gray-500">
          Welcome, Please input your Data
        </Typography>
        <Box component="form" onSubmit={onSubmitSignin} className="w-96 flex flex-col gap-6 md:mt-8 mt-5">
          <TextField
            id="username"
            name="username"
            label="Username"
            fullWidth
            variant="filled"
            onChange={handleUserMutation}
            type="text"
            autoComplete="new-user"
            error={Boolean(getFieldError('username'))}
            helperText={getFieldError('username')}
          />
          <TextField
            id="password"
            label="Password"
            name="password"
            fullWidth
            variant="filled"
            onChange={handleUserMutation}
            type="password"
            autoComplete="new-password"
            error={Boolean(getFieldError('password'))}
            helperText={getFieldError('password')}
          />
          <Button disabled={signinLoading} loading={signinLoading} variant="contained" color="primary" type="submit">
            Signin
          </Button>
          <Grid>
            <Link to="/login" variant="body2" component={RouterLink}>
              do you have an account ?
            </Link>
          </Grid>
          <Grid>
            <GoogleLogin
              onSuccess={googleLogin}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default SigninUser;
