import { IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import styled from "styled-components";
import { FavoriteButtonProps } from "../../types";

const FavoriteButtonWrapper = styled.div`
  position: relative !important;
  display: inline-block;
`;

const FavoriteButtonBorder = styled(IconButton).withConfig({
  shouldForwardProp: (prop) => prop !== "isFavorite", 
})<{ isFavorite: boolean }>`
  && {
    position: absolute;
    left: 0;
    width: 36px;
    height: 46px;
    background-color: ${({ isFavorite }) => (isFavorite ? "#f87171" : "black")};
    border-radius: 2px;
    padding: 3px;
    padding-bottom: 15px;
    clip-path: polygon(100% 0, 100% 100%, 50% 63%, 0 100%, 0 0);
    z-index: 0;
    pointer-events: none;
  }
`;

const StyledFavoriteButton = styled(IconButton).withConfig({
  shouldForwardProp: (prop) => prop !== "isFavorite",
})<{ isFavorite: boolean }>`
  && {
    background-color: ${({ isFavorite }) => (isFavorite ? "#f87171" : "white")};
    width: 36px;
    height: 45px;
    border: ${({ isFavorite }) => (isFavorite ? "1px solid #f87171" : "1px solid black")};
    border-radius: 2px;
    padding: 3px;
    padding-bottom: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    clip-path: polygon(100% 0, 100% 100%, 50% 63%, 0 100%, 0 0);
    z-index: 1;
  }

  &:hover {
    background-color: ${({ isFavorite }) => (isFavorite ? "#f87171" : "#e5e7eb")};
  }

  svg {
    color: ${({ isFavorite }) => (isFavorite ? "white" : "black")};
    font-size: 20px;
  }
`;

const FavoriteButton = ({ isFavorite, toggleFavorite }: FavoriteButtonProps) => {
  return (
    <FavoriteButtonWrapper>
      <FavoriteButtonBorder isFavorite={isFavorite} />
      <StyledFavoriteButton isFavorite={isFavorite} onClick={toggleFavorite}>
        {isFavorite ? <StarIcon /> : <StarBorderIcon />}
      </StyledFavoriteButton>
    </FavoriteButtonWrapper>
  );
};

export default FavoriteButton;
