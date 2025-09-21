import { Avatar, Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { signinThunk } from './userThunk';
import { selectUserSigninError, selectUserSigninLoading } from './userSlice';
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
  return (
    <>
      <Box component="div" className="flex flex-col items-center gap-4">
        <Avatar>
          <LockIcon />
        </Avatar>
        <Typography variant="h4" component="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={onSubmitSignin} className="w-96 flex flex-col gap-2">
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
        </Box>
      </Box>
    </>
  );
};

export default SigninUser;
