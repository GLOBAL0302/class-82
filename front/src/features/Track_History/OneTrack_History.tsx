import { Paper, Typography } from '@mui/material';
import type { ITrackHistory } from '../../types';
import { DateTime } from 'luxon';

interface Props {
  track: ITrackHistory;
}

const OneTrack_History: React.FC<Props> = ({ track }) => {
  const dt = DateTime.fromISO(track.played_at.toString(), { zone: 'utc' });
  const formatted = dt.toFormat('yyyy-MM-dd HH:mm:ss');

  return (
    <div className="p-2">
      <Paper className="p-2">
        <Typography variant="h5" component="p">
          {track.track.title}
        </Typography>
        <Typography variant="body2" component="p">
          {track.track.album.artist.title}
        </Typography>
        <Typography variant="body2" component="p">
          {formatted}
        </Typography>
      </Paper>
    </div>
  );
};

export default OneTrack_History;
