import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/Users/userSlice';
import CurrentUser from './CurrentUser';
import Incognito from './Incognito';
const AppToolBar = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  return (
    <div className="p-4 bg-zinc-900 flex justify-between sticky top-0 mb-2 md:mb-0">
      <LibraryMusicIcon fontSize="large" sx={{ color: 'white' }} onClick={() => navigate('/')} />
      <div className="flex gap-3">{user ? <CurrentUser user={user} /> : <Incognito />}</div>
    </div>
  );
};

export default AppToolBar;
