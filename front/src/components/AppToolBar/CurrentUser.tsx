import { Typography } from '@mui/material';
import type { IUser } from '../../types';

interface Props {
  user: IUser;
}

const CurrentUser: React.FC<Props> = ({ user }) => {
  return (
    <>
      <Typography variant="h5" component="h5" color="white">
        {user.username}
      </Typography>
    </>
  );
};

export default CurrentUser;
