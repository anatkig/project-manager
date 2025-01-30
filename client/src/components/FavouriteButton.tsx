import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const FavoriteButton = ({ projectId }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favoriteProjects") || "[]") || [];
    setFavorites(storedFavorites);
  }, []);

  const toggleFavorite = () => {
    let updatedFavorites;
    if (favorites.includes(projectId)) {
      updatedFavorites = favorites.filter((id) => id !== projectId);
    } else {
      updatedFavorites = [...favorites, projectId];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favoriteProjects", JSON.stringify(updatedFavorites));
  };

  return (
    <IconButton onClick={toggleFavorite}>
      {favorites.includes(projectId) ? <StarIcon color="primary" /> : <StarBorderIcon />}
    </IconButton>
  );
};

export default FavoriteButton;
