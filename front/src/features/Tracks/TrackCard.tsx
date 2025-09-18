import type { ITrack } from '../../types';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

interface Props {
  track: ITrack;
}

const TrackCard: React.FC<Props> = ({ track }) => {
  const theme = useTheme();
  return (
    <Card sx={{ display: 'flex', border: 1 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {track.title}
          </Typography>
          <Typography component="div" variant="subtitle1" sx={{ textDecoration: 'underline' }}>
            {track.album.artist.title}
          </Typography>
          <Typography variant="subtitle2" component="div" sx={{ color: 'text.secondary' }}>
            {track.album.title}
          </Typography>
          <Typography variant="body2" component="div" sx={{ color: 'text.secondary' }}>
            {track.track_number}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};

export default TrackCard;
