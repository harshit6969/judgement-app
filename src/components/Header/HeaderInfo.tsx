import { Box, Chip } from "@mui/material";
import useGameStore from "../../store/gameStore";
import { useParams } from "react-router-dom";
import { useMemo } from "react";

const HeaderInfo = () => {
  const currentRound = useGameStore.use.currentRound();
  const players = useGameStore.use.players();
  const { id } = useParams();
  if (!id) return;
  const roundSummary = useMemo(() => {
    const handsPlayed = players.reduce((acc, p) => acc + (p.CurrentRoundScore || 0), 0);
    return handsPlayed > 0 
      ? `Round: ${currentRound} | Hands: ${handsPlayed}`
      : `Round: ${currentRound}`;
  }, [currentRound, players]);
  
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <Chip
        label={roundSummary}
        color="secondary"
        sx={{ fontWeight: "bold", fontSize: "1rem" }}
      />
    </Box>
  );
};

export default HeaderInfo;
