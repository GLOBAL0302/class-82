import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectTrack_history } from '../Tracks/tracksSlice';
import { fetchTrackHistoryThunk } from '../Tracks/tracksThunk';
import { Alert } from '@mui/material';
import OneTrack_History from './OneTrack_History';

const Track_history = () => {
  const track_histories = useAppSelector(selectTrack_history);
  const dispatch = useAppDispatch();
  console.log(track_histories);

  const fetchTrackHistories = useCallback(async () => {
    try {
      await dispatch(fetchTrackHistoryThunk()).unwrap();
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    void fetchTrackHistories();
  }, []);
  return (
    <div>
      {track_histories.length == 0 && <Alert severity="info">No history now</Alert>}
      {track_histories.map((item) => (
        <OneTrack_History key={item._id} track={item} />
      ))}
    </div>
  );
};

export default Track_history;
