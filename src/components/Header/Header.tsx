import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import HeaderInfo from "./HeaderInfo";
import HeaderControls from "./HeaderControls";

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h6"
              component="div"
            >
              Judgement
            </Typography>
          </Box>
          <HeaderInfo />
          <HeaderControls />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
