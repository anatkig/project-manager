
import { Link } from "react-router";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Project Manager
        </Typography>
        <Button color="inherit" component={Link} to="/project-manager/">
          Projects
        </Button>
        <Button color="inherit" component={Link} to="/project-manager/create">
          Create Project
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
