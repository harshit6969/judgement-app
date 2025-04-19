import { Box, Button, IconButton, Tooltip } from "@mui/material";
import useGameStore from "../../store/gameStore";
import { useParams } from "react-router-dom";
import { useAppStore, useNotify } from "../../store/appStore";
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
  const { id } = useParams();
  const currentRound = useGameStore.use.currentRound();
  const { theme, setTheme } = useAppStore();
  const notify = useNotify();

  const handleAddPlayer = () => {
    notify.warning("TO DO");
  };

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <Tooltip
        title={
          theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
        }
      >
        <IconButton
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          color="inherit"
          sx={{ ml: 1 }}
        >
          {theme === "light" ? <LightMode /> : <DarkMode />}
        </IconButton>
      </Tooltip>
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
      {id ? (
        <HeaderControlBtn />
      ) : (
        <Button
          color="warning"
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
