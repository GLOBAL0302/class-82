import { Route, Routes } from 'react-router-dom';
import ArtistsFeature from './features/Artists/ArtistsFeature';
import './index.css';
import AlbumFeature from './features/Albums/AlbumFeature';
import TracksFeature from './features/Tracks/TracksFeature';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ArtistsFeature />} />
        <Route path="/albums/:artistId" element={<AlbumFeature />} />
        <Route path="/tracks/:albumId" element={<TracksFeature />} />
      </Routes>
    </>
  );
}

export default App;
