import { Box, Chip } from "@mui/material";
import useGameStore from "../../store/gameStore";
import { useParams } from "react-router-dom";

const HeaderInfo = () => {
  const { id } = useParams();
  const currentRound = useGameStore.use.currentRound();
  const players = useGameStore.use.players();
  if (!id) return;
  const handsPlayed = players.reduce((acc, p) => acc + (p.CurrentRoundScore || 0), 0);
  const label = handsPlayed > 0 
  ? `Round: ${currentRound} | Hands: ${handsPlayed}`
  : `Round: ${currentRound}`;
  
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
        label={label}
        color="warning"
        sx={{ fontWeight: "bold", fontSize: "1rem" }}
      />
    </Box>
  );
};

export default HeaderInfo;
