import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { IAlbum } from '../../types';
import { apiUrl } from '../../GlobalConstant';

interface Props {
  album: IAlbum;
}

const AlbumCard: React.FC<Props> = ({ album }) => {
  let image;

  if (album.image) {
    image = apiUrl + '/' + album.image;
  }
  return (
    <>
      <Card sx={{ width: 345, border: 2 }}>
        <CardMedia component="img" alt="green iguana" image={image} sx={{ height: 300 }} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {album.title}
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' ,textDecoration:"underline"}}>
            {album.artist.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {new Date(album.create_at).getFullYear()}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default AlbumCard;
