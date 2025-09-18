import { useCallback, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchAlbums } from './albumThunk';
import { selectAlbums } from './albumSlice';
import AlbumCard from './AlbumCard';

const AlbumFeature = () => {
  const { artistId } = useParams();
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);

  const fetchAllAlbums = useCallback(() => {
    dispatch(fetchAlbums());
  }, []);

  useEffect(() => {
    void fetchAllAlbums();
  }, [artistId, fetchAllAlbums]);

  return (
    <div className="flex gap-2 flex-wrap">
      {albums.map((item) => (
        <AlbumCard key={item._id} album={item} />
      ))}
    </div>
  );
};

export default AlbumFeature;
