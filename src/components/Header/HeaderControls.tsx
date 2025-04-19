import { Box, Button } from "@mui/material";
import useGameStore from "../../store/gameStore";
import { useParams } from "react-router-dom";
import { useNotify } from "../../store/appStore";
import { PersonAdd, PlayArrow, Stop, Undo } from "@mui/icons-material";

const HeaderControls = () => {
  const { id } = useParams();
  const currentRound = useGameStore.use.currentRound();
  const notify = useNotify();

  const handleAddPlayer = () => {
    notify.warning("TO DO");
  };

  if (!id) {
    return (
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button
          color="warning"
          variant="contained"
          onClick={handleAddPlayer}
          startIcon={<PersonAdd />}
        >
          Add Player
        </Button>
      </Box>
    );
  }
  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      {currentRound > 1 && (
        <Button
          color="warning"
          variant="contained"
          onClick={handleAddPlayer}
          startIcon={<Undo />}
        >
          Undo
        </Button>
      )}

      <HeaderControlBtn />
    </Box>
  );
};

export default HeaderControls;

const HeaderControlBtn = () => {
  const gameStatus = useGameStore.use.status();
  const toggleRound = useGameStore.use.toggleRound();
  switch (gameStatus) {
    case 0:
      return (
        <Button
          color="success"
          variant="contained"
          onClick={toggleRound}
          startIcon={<PlayArrow />}
        >
          Start
        </Button>
      );
    case 2:
      return (
        <Button
          color="error"
          variant="contained"
          onClick={toggleRound}
          startIcon={<Stop />}
        >
          End
        </Button>
      );
    default:
      return null;
  }
};
