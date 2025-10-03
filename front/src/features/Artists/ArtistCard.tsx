import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import type { IArtist } from '../../types';
import { apiUrl } from '../../GlobalConstant';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch } from '../../app/hooks';
import { artistDeleteThunk, artistToggleThunk } from './artistsThunk';
import NotesIcon from '@mui/icons-material/Notes';
interface Props {
  artist: IArtist;
}

const ArtistCard: React.FC<Props> = ({ artist }) => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleNavigate = () => {
    navigate(`/albums/${artist._id}`);
  };

  let image;
  if (artist.image) {
    image = apiUrl + '/' + artist.image;
  }
  return (
    <Card sx={{ width: 300, border: 1 }} className="shadow-2xl">
      <CardActionArea onClick={handleNavigate}>
        <CardMedia component="img" sx={{ width: 300, height: 300 }} image={image} alt="green iguana" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {artist.title}
          </Typography>
          <Typography className="p-2 bg-red-500 inline-block text-white rounded-xl">
            {artist.isPublished ? 'Published' : 'Not Published'}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {artist.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Box component="div" className="flex gap-3 justify-end m-2">
        <Button
          onClick={() => dispatch(artistDeleteThunk(artist._id))}
          color="error"
          variant="outlined"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>

        <Button
          onClick={() => dispatch(artistToggleThunk(artist._id))}
          color="info"
          variant="outlined"
          startIcon={<NotesIcon />}
        >
          Publish
        </Button>
      </Box>
    </Card>
  );
};

export default ArtistCard;
