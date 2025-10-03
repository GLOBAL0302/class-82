import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import type { IAlbum } from '../../types';
import { apiUrl } from '../../GlobalConstant';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import type React from 'react';
import { albumDeleteThunk, albumPublishThunk, fetchAlbums } from './albumThunk';
import { selectAlbumDelLoading } from './albumSlice';
import NotesIcon from '@mui/icons-material/Notes';

interface Props {
  album: IAlbum;
}

const AlbumCard: React.FC<Props> = ({ album }) => {
  let image;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { artistId } = useParams();

  const deleteLoading = useAppSelector(selectAlbumDelLoading);

  if (album.image) {
    image = apiUrl + '/' + album.image;
  }

  const handleNavigate = () => {
    navigate(`/tracks/${album._id}`);
  };

  const deleteAlbum = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    await dispatch(albumDeleteThunk(album._id));
  };

  const publishAlbum = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    try {
      await dispatch(albumPublishThunk(album._id));
      if (artistId) await dispatch(fetchAlbums(artistId)).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Card sx={{ width: 345, border: 2 }} onClick={handleNavigate}>
        <CardMedia component="img" alt="green iguana" image={image} sx={{ height: 300 }} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {album.title}
          </Typography>
          <Typography
            gutterBottom
            variant="subtitle1"
            component="p"
            className="p-2 border-2 inline-block text-white rounded-xl bg-red-500"
          >
            {album.isPublished ? 'Published' : 'Not Published'}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', textDecoration: 'underline' }}>
            {album.artist.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {new Date(album.create_at).getFullYear()}
          </Typography>
        </CardContent>
        <Box component="div" className="flex justify-end m-2 gap-3">
          <Button
            disabled={deleteLoading}
            loading={deleteLoading}
            onClick={deleteAlbum}
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
          >
            delete
          </Button>

          <Button onClick={publishAlbum} variant="outlined" color="info" startIcon={<NotesIcon />}>
            Publish
          </Button>
        </Box>
      </Card>
    </>
  );
};

export default AlbumCard;
