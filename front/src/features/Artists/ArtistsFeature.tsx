import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchArtist } from './artistsThunk';
import ArtistCard from './ArtistCard';
import { selectArtists } from './artistsSlice';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ArtistsFeature = () => {
  const useDispatch = useAppDispatch();
  const allArtist = useAppSelector(selectArtists);
  const navigage = useNavigate();

  const fetchAllArtist = useCallback(() => {
    useDispatch(fetchArtist());
  }, []);

  useEffect(() => {
    void fetchAllArtist();
  }, []);
  return (
    <>
      <div className="flex justify-end mb-2">
        <Button variant="contained" color="success" onClick={() => navigage('/addArtist')}>
          add Artist
        </Button>
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        {allArtist.map((item) => (
          <ArtistCard key={item._id} artist={item} />
        ))}
      </div>
    </>
  );
};

export default ArtistsFeature;
