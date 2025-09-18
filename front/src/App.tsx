import { Route, Routes } from 'react-router-dom';
import ArtistsFeature from './features/Artists/ArtistsFeature';
import './index.css';
import AlbumFeature from './features/Albums/AlbumFeature';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ArtistsFeature />} />
        <Route path="/albums/:artistId" element={<AlbumFeature />} />
      </Routes>
    </>
  );
}

export default App;
