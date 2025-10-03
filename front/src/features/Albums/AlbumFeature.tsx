import { useCallback, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchAlbums } from './albumThunk';
import { selectAlbums } from './albumSlice';
import AlbumCard from './AlbumCard';
import { Box, Button } from '@mui/material';
import { selectUser } from '../Users/userSlice';

const AlbumFeature = () => {
  const { artistId } = useParams();
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const user = useAppSelector(selectUser);

  const fetchAllAlbums = useCallback(() => {
    if (artistId) dispatch(fetchAlbums(artistId));
  }, [artistId]);

  useEffect(() => {
    void fetchAllAlbums();
  }, [artistId, fetchAllAlbums]);

  return (
    <>
      <Box className="flex justify-end">
        {user && user.role === 'admin' && (
          <Button component={NavLink} to="/addAlbum" variant="contained">
            Add Album
          </Button>
        )}
      </Box>
      <div className="flex gap-2 flex-wrap justify-center">
        {albums.map((item) => (
          <AlbumCard key={item._id} album={item} />
        ))}
      </div>
    </>
  );
};

export default AlbumFeature;
