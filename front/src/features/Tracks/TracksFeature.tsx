import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectTracks } from './tracksSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchTracks } from './tracksThunk';
import TrackCard from './TrackCard';
import { selectUser } from '../Users/userSlice';
import type { ITrack } from '../../types';

const TracksFeature = () => {
  const { albumId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const tracks = useAppSelector(selectTracks);

  const fetchAllTracks = useCallback(() => {
    if (albumId) dispatch(fetchTracks(albumId));
  }, [albumId]);

  useEffect(() => {
    if (user) {
      void fetchAllTracks();
    } else {
      navigate('/login');
    }
  }, [fetchAllTracks, albumId]);

  return (
    <div className="flex justify-center gap-3 flex-wrap">
      {tracks.map((item: ITrack) => (
        <TrackCard key={item._id} track={item} />
      ))}
    </div>
  );
};

export default TracksFeature;
