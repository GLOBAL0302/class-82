import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import type { IArtist } from "../../types";
import { apiUrl } from "../../GlobalConstant";

interface Props {
  artist: IArtist;
}

const ArtistCard: React.FC<Props> = ({artist}) => {
    let image
    if(artist.image){
        image = apiUrl + "/" + artist.image
    }
  return (
    <Card sx={{ maxWidth: 345 , border:1}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {artist.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {artist.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ArtistCard;
