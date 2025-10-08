import { Route, Routes } from 'react-router-dom';
import ArtistsFeature from './features/Artists/ArtistsFeature';
import './index.css';
import AlbumFeature from './features/Albums/AlbumFeature';
import TracksFeature from './features/Tracks/TracksFeature';
import AppToolBar from './components/AppToolBar/AppToolBar';
import SigninUser from './features/Users/SigninUser';
import LoginUser from './features/Users/LoginUser';
import Track_history from './features/Track_History/Track_history';
import AddArtistForm from './features/Artists/AddArtistForm';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/Users/userSlice';
import AddAlbum from './features/Albums/AddAlbum';
import { Typography } from '@mui/material';

function App() {
  const user = useAppSelector(selectUser);
  return (
    <div className="overflow-hidden h-screen">
      <AppToolBar />
      <div className="px-2">
        <Routes>
          <Route path="/" element={<ArtistsFeature />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/signin" element={<SigninUser />} />
          <Route path="/albums/:artistId" element={<AlbumFeature />} />
          <Route path="/tracks" element={<TracksFeature />} />
          <Route path="/tracks/:albumId" element={<TracksFeature />} />
          <Route path="/tracks_history" element={<Track_history />} />
          <Route path="*" element={<Typography variant="h6">404 Not Found</Typography>} />
          <Route
            path="/addArtist"
            element={
              <ProtectedRoute isAllowed={user && user.role == 'admin'}>
                <AddArtistForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/addAlbum"
            element={
              <ProtectedRoute isAllowed={user && user.role == 'admin'}>
                <AddAlbum />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
