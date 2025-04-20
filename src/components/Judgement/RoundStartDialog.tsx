import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Slider,
  Typography,
} from "@mui/material";
import useGameStore from "../../store/gameStore";
import { isStartValid } from "../../utils/validation";
import { useNotify } from "../../store/appStore";
import { GameMode } from "../../utils/types";
import { useEffect, useState } from "react";

const RoundStartDialog = () => {
  const players = useGameStore.use.players();
  const currentRound = useGameStore.use.currentRound();
  const updateStatus = useGameStore.use.updateStatus();
  const updateCurrentScore = useGameStore.use.updateCurrentScore();
  const notify = useNotify();

  const totalHands = Math.floor(52 / players.length);
  const handsPlayed = players.reduce(
    (acc, p) => acc + (p.CurrentRoundScore || 0),
    0
  );

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const isEditMode = players.every(
      (player) => player.CurrentRoundScore !== undefined
    );
    setIsEdit(isEditMode);
  }, []);

  const handleSubmit = () => {
    if (!isStartValid(players)) {
      notify.error("Bhosdike");
      return;
    }
    updateStatus(GameMode.ROUND_EXECUTING);
  };

  return (
    <Dialog fullWidth maxWidth="xl" disableEscapeKeyDown open scroll={"paper"}>
      <DialogTitle>{`Round: ${currentRound} | Hands: ${handsPlayed}`}</DialogTitle>
      <DialogContent dividers={true}>
        <Grid container direction="column" spacing={2} paddingTop={2}>
          {players.map((player, index) => (
            <Grid
              size={12}
              key={player.ID}
              sx={{
                color: player.ColorCode,
                display: "flex",
              }}
            >
              <Typography variant="subtitle1" sx={{ minWidth: 120 }}>
                {player.Name}
              </Typography>
              <Slider
                value={player.CurrentRoundScore}
                onChangeCommitted={(_, value) =>
                  updateCurrentScore(index, value as number)
                }
                min={0}
                max={totalHands}
                step={1}
                marks={Array.from({ length: totalHands + 1 }, (_, i) => ({
                  value: i,
                  label: i.toString(),
                }))}
                valueLabelDisplay={
                  player.CurrentRoundScore !== undefined ? "on" : "off"
                }
                sx={{
                  flex: 1,
                  color: "inherit",
                  maxWidth: "calc(100% - 140px)",
                }}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
        {!isEdit && (
          <Button
            size="large"
            variant="contained"
            color="error"
            onClick={() => updateStatus(GameMode.IDLE)}
          >
            Back
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default RoundStartDialog;
