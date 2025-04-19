import { Container, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PlayerList } from "../components/PlayerTransfer/PlayerList";
import { TransferControls } from "../components/PlayerTransfer/TransferControls";
import usePlayerStore from "../store/playerStore";

export const SelectPlayers = () => {
  const navigate = useNavigate();

  const available = usePlayerStore.use.available();
  const selected = usePlayerStore.use.selected();
  const initGame = usePlayerStore.use.initGame();

  const handleStartGame = async () => {
    const gameId = await initGame(selected);
    navigate(`/judgement-app/${gameId}`);
  };

  return (
    <>
      <Container sx={{ pt: 2, display: "flex", flexDirection: "column" }}>
        <Grid container spacing={2}>
          <Grid size={5}>
            <PlayerList title="Available Players" players={available} />
          </Grid>
          <Grid
            size={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TransferControls />
          </Grid>
          <Grid size={5}>
            <PlayerList title="Selected Players" players={selected} />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="primary"
          onClick={handleStartGame}
          disabled={selected.length < 4 || selected.length > 10}
          sx={{ mt: 2, alignSelf: "center", width: "50%" }}
        >
          Start Game
        </Button>
      </Container>
    </>
  );
};

export default SelectPlayers;
