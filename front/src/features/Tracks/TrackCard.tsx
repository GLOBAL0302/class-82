import type { ITrack } from '../../types';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Button, Modal } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addTrackToHistory, fetchTracks, trackDeleteThunk, trackToggleThunk } from './tracksThunk';
import ReactPlayer from 'react-player';
import DeleteIcon from '@mui/icons-material/Delete';
import { selectTrackDelLoading } from './tracksSlice';
import NotesIcon from '@mui/icons-material/Notes';
import { useParams } from 'react-router-dom';

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
  const { albumId } = useParams();

  const deletingLoading = useAppSelector(selectTrackDelLoading);

  const onPlay = () => {
    handleOpen();
    dispatch(addTrackToHistory(track));
  };

  const onCLickPublish = async () => {
    try {
      await dispatch(trackToggleThunk(track._id));
      if (albumId) await dispatch(fetchTracks(albumId)).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

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

          <Typography component="p" variant="body2" className="border-2 p-2 inline-block bg-red-500 text-white">
            {track.isPublished ? 'Not piublished' : 'Published'}
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
          <Button
            loading={deletingLoading}
            disabled={deletingLoading}
            onClick={() => dispatch(trackDeleteThunk(track._id))}
            startIcon={<DeleteIcon />}
            color="error"
          />
          <Button onClick={onCLickPublish} startIcon={<NotesIcon />} color="warning" />
        </Box>
      </Box>
    </Card>
  );
};

export default TrackCard;
