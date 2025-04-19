import {
  AppBar,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import useGameStore from "../store/gameStore";
import { useParams } from "react-router-dom";

export const Header = () => {
  const { id } = useParams();
  const currentRound = useGameStore.use.currentRound();
  const gameStatus = useGameStore.use.status();
  const toggleRound = useGameStore.use.toggleRound();

  console.log(id, gameStatus);
  return (
    <AppBar position="static">
      <Toolbar>
        <Container>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h5">
              {!id ? "Judgement" : `Game: ${currentRound}`}
            </Typography>
            <Button color="inherit" variant="text" onClick={toggleRound}>
              {gameStatus === 0 ? "Start" : "End"}
            </Button>
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
