import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectTracks } from './tracksSlice';
import { useParams } from 'react-router-dom';
import { fetchTracks } from './tracksThunk';
import TrackCard from './TrackCard';

const TracksFeature = () => {
  const { albumId } = useParams();
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);

  const fetchAllTracks = useCallback(() => {
    if (albumId) dispatch(fetchTracks(albumId));
  }, [albumId]);

  useEffect(() => {
    void fetchAllTracks();
  }, [fetchAllTracks, albumId]);

  return (
    <div className="flex gap-3">
      {tracks.map((item) => (
        <TrackCard key={item._id} track={item} />
      ))}
    </div>
  );
};

export default TracksFeature;
