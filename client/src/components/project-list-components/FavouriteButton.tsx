import { IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

interface FavoriteButtonProps {
  isFavorite: boolean;
  toggleFavorite?: () => void;
}

const FavoriteButton = ({ isFavorite, toggleFavorite }: FavoriteButtonProps) => {
  return (
    <IconButton onClick={toggleFavorite}>
      {isFavorite ? <StarIcon color="primary" /> : <StarBorderIcon />}
    </IconButton>
  );
};

export default FavoriteButton;
