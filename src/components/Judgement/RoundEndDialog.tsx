import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import useGameStore from "../../store/gameStore";
import { isEndValid } from "../../utils/validation";
import { useEffect, useState } from "react";
import { CheckboxOptions, GameMode } from "../../utils/types";
import { useNotify } from "../../store/appStore";

const RoundEndDialog = () => {
  const players = useGameStore.use.players();
  const status = useGameStore.use.status();
  const updateStatus = useGameStore.use.updateStatus();
  const completeRound = useGameStore.use.completeRound();
  const notify = useNotify();

  const [selected, setSelected] = useState<CheckboxOptions>(new Map());

  useEffect(() => {
    const initialSelections = players.reduce((map, player) => {
      map.set(player.ID, true);
      return map;
    }, new Map());
    setSelected(initialSelections);
  }, [players]);

  const handleSubmit = () => {
    if (!isEndValid(selected)) {
      notify.error("Bhosdike");
      return;
    }
    completeRound(selected);
  };

  const handleCheckboxChange = (playerId: number) => {
    setSelected((prevSelections) => {
      const newSelections = new Map(prevSelections);
      newSelections.set(playerId, !newSelections.get(playerId));
      return newSelections;
    });
  };

  return (
    <Dialog fullWidth maxWidth="xs" disableEscapeKeyDown open>
      <DialogContent>
        <FormControl required component="fieldset">
          <FormLabel component="legend">Unselect failures</FormLabel>
          <FormGroup>
            {players.map((player) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selected.get(player.ID)}
                    onChange={() => handleCheckboxChange(player.ID)}
                    value={player.ID}
                  />
                }
                label={`${player.Name} - ${player.CurrentRoundScore}`}
                key={player.ID}
              />
            ))}
          </FormGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
        {status !== GameMode.UNDO && (
          <Button
            variant="contained"
            color="warning"
            onClick={() => updateStatus(GameMode.ROUND_EXECUTING)}
          >
            Back
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default RoundEndDialog;
