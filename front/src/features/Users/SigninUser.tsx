import { Avatar, Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
const initalStateUserMutation = {
  username: '',
  password: '',
};

const SigninUser = () => {
  const [userMutation, setUserMutation] = useState(initalStateUserMutation);

  const onSubmitSignin = (e: React.FormEvent<HTMLFormElement>) => {
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
    <>
      <Box component="div" className="flex flex-col items-center gap-4">
        <Avatar>
          <LockIcon />
        </Avatar>
        <Typography variant="h4" component="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={onSubmitSignin} className="w-96 flex flex-col gap-2">
          <TextField id="filled-basic" label="Username" fullWidth variant="filled" onChange={handleUserMutation} />
          <TextField id="filled-basic" label="password" fullWidth variant="filled" onChange={handleUserMutation} />
          <Button variant="contained" color="primary" type="submit">
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
