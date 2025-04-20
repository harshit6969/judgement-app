import { Button } from "@mui/material";
import usePlayerStore from "../../store/playerStore";

export const TransferControls = () => {
  const available = usePlayerStore.use.available();
  const selected = usePlayerStore.use.selected();
  const checked = usePlayerStore.use.checked();
  const transferPlayers = usePlayerStore.use.transferPlayers();

  return (
    <div className="transfer-controls">
      <Button
        variant="contained"
        size="large"
        onClick={() => transferPlayers("right")}
        disabled={available.filter((p) => checked.includes(p)).length === 0}
        aria-label="move selected right"
        style={{ marginBottom: "8px" }}
      >
        &gt;
      </Button>
      <Button
        variant="contained"
        size="large"
        onClick={() => transferPlayers("left")}
        disabled={selected.filter((p) => checked.includes(p)).length === 0}
        aria-label="move selected left"
      >
        &lt;
      </Button>
    </div>
  );
};
