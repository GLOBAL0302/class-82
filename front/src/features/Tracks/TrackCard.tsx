import type { ITrack } from '../../types';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Button, Modal } from '@mui/material';
import { useAppDispatch } from '../../app/hooks';
import { addTrackToHistory } from './tracksThunk';
import ReactPlayer from 'react-player';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface Props {
  track: ITrack;
}

const TrackCard: React.FC<Props> = ({ track }) => {
  const [modal, closeModal] = React.useState(false);
  const handleOpen = () => closeModal(true);
  const handleClose = () => closeModal(false);

  const dispatch = useAppDispatch();

  const onPlay = () => {
    handleOpen();
    dispatch(addTrackToHistory(track));
  };
  console.log(track.url);

  return (
    <Card sx={{ display: 'flex', border: 1, width: 200 }}>
      <div>
        <Modal
          open={modal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ReactPlayer
              url="http://www.youtube.com/watch?v=7sDY4m8KNLc"
              playing={modal}
              controls
              width="100%"
              height="100%"
            />
          </Box>
        </Modal>
      </div>
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
          <Button onClick={onPlay} startIcon={<PlayArrowIcon sx={{ height: 38, width: 38 }} />}></Button>
        </Box>
      </Box>
    </Card>
  );
};

export default TrackCard;
