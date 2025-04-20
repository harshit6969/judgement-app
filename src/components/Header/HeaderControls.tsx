import { Box, Button, IconButton, Tooltip, useColorScheme } from "@mui/material";
import useGameStore from "../../store/gameStore";
import { useParams } from "react-router-dom";
import { useNotify } from "../../store/appStore";
import {
  DarkMode,
  LightMode,
  PersonAdd,
  PlayArrow,
  Stop,
  Undo,
} from "@mui/icons-material";
import { GameMode } from "../../utils/types";

const HeaderControls = () => {
  const { mode, setMode } = useColorScheme();
  const { id } = useParams();
  const currentRound = useGameStore.use.currentRound();
  const status = useGameStore.use.status();
  const undoRound = useGameStore.use.undoRound();
  const notify = useNotify();

  const handleAddPlayer = () => {
    notify.warning("TO DO");
  };

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <Tooltip
        title={
          mode === "dark" ? "Switch to light mode" : "Switch to dark mode"
        }
      >
        <IconButton
          onClick={() => setMode(mode === "dark" ? "light" : "dark")}
          color="inherit"
          sx={{ ml: 1 }}
        >
          {mode === "light" ? <DarkMode /> : <LightMode />}
        </IconButton>
      </Tooltip>
      {currentRound > 1 &&
        [GameMode.ROUND_EXECUTING, GameMode.IDLE].includes(status) && (
          <Button
            size="large"
            color="warning"
            variant="contained"
            onClick={() => undoRound()}
            startIcon={<Undo />}
          >
            Undo
          </Button>
        )}
      {id ? (
        <HeaderControlBtn />
      ) : (
        <Button
          size="large"
          color="success"
          variant="contained"
          onClick={handleAddPlayer}
          startIcon={<PersonAdd />}
        >
          Add Player
        </Button>
      )}
    </Box>
  );
};

export default HeaderControls;

const HeaderControlBtn = () => {
  const status = useGameStore.use.status();
  const toggleRound = useGameStore.use.toggleRound();
  switch (status) {
    case GameMode.IDLE:
      return (
        <Button
          size="large"
          color="success"
          variant="contained"
          onClick={toggleRound}
          startIcon={<PlayArrow />}
        >
          Start
        </Button>
      );
    case GameMode.ROUND_EXECUTING:
      return (
        <Button
          size="large"
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
