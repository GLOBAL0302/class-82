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
    if (artistId) dispatch(fetchAlbums(artistId));
  }, [artistId]);

  useEffect(() => {
    void fetchAllAlbums();
  }, [artistId, fetchAllAlbums]);

  return (
    <div className="flex gap-2 flex-wrap justify-center">
      {albums.map((item) => (
        <AlbumCard key={item._id} album={item} />
      ))}
    </div>
  );
};

export default AlbumFeature;
