import { Route, Routes } from 'react-router-dom';
import ArtistsFeature from './features/Artists/ArtistsFeature';
import './index.css';
import AlbumFeature from './features/Albums/AlbumFeature';
import TracksFeature from './features/Tracks/TracksFeature';
import AppToolBar from './components/AppToolBar/AppToolBar';
import SigninUser from './features/Users/SigninUser';
import LoginUser from './features/Users/LoginUser';

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
          <Route path="/tracks/:albumId" element={<TracksFeature />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
