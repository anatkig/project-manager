import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import styled from "styled-components";

const StyledBox = styled(Box)`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;`;

const Loader = () => {
  return (
    <StyledBox>
      <CircularProgress />
    </StyledBox>
  );
};

export default Loader;