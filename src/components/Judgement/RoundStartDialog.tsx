import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Slider,
  Typography,
} from "@mui/material";
import useGameStore from "../../store/gameStore";
import { isStartValid } from "../../utils/validation";
import { useNotify } from "../../store/appStore";

const RoundStartDialog = () => {
  const players = useGameStore.use.players();
  const updateStatus = useGameStore.use.updateStatus();
  const updateCurrentScore = useGameStore.use.updateCurrentScore();
  const notify = useNotify();

  const totalHands = Math.floor(52 / players.length);

  const handleSubmit = () => {
    if (!isStartValid(players)) {
      notify.error('Bhosdike');
      return;
    }
    updateStatus(2);
  };

  return (
    <Dialog fullWidth maxWidth="lg" disableEscapeKeyDown open>
      <DialogContent sx={{ overflowX: 'hidden' }}>
        <Grid
          container
          direction="column"
          spacing={5}
          paddingTop={2}
        >
          {players.map((player, index) => (
            <Grid
              size={12}
              key={player.ID}
              sx={{ 
                color: player.ColorCode,
                display: 'flex',
              }}
            >
              <Typography variant="subtitle1" sx={{ minWidth: 120 }}>
                {player.Name}
              </Typography>
              <Slider
                value={player.CurrentRoundScore}
                onChange={(_, value) => updateCurrentScore(index, value as number)}
                min={0}
                max={totalHands}
                step={1}
                marks={Array.from({ length: totalHands + 1 }, (_, i) => ({
                  value: i,
                  label: i.toString(),
                }))}
                valueLabelDisplay={player.CurrentRoundScore !== undefined ? "on" : "off"}
                sx={{
                  flex: 1,
                  color: 'inherit',
                  maxWidth: 'calc(100% - 140px)'
                }}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
        <Button variant="contained" color="warning" onClick={() => updateStatus(0)}>
          Back
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RoundStartDialog;
