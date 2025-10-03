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

function App() {
  return (
    <>
      <AppToolBar />
      <div className="p-5">
        <Routes>
          <Route path="/" element={<ArtistsFeature />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/signin" element={<SigninUser />} />
          <Route path="/albums/:artistId" element={<AlbumFeature />} />
          <Route path="/tracks" element={<TracksFeature />} />
          <Route path="/tracks/:albumId" element={<TracksFeature />} />
          <Route path="/tracks_history" element={<Track_history />} />

          <Route path="/addArtist" element={<AddArtistForm />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
