import { useEffect } from "react";
import useGameStore from "../store/gameStore";
import { useParams } from "react-router-dom";
import { CircularProgress, Grid } from "@mui/material";
import Graph from "../components/Judgement/Graph";
import RoundDialog from "../components/Judgement/RoundDialog";
import Leaderboard from "../components/Judgement/Leaderboard";

export const Judgement = () => {
  const { id } = useParams();
  console.log(useGameStore);
  const loading = useGameStore.use.loading();
  const loadGameState = useGameStore.use.loadGameState();

  useEffect(() => {
    (async () => {
      try {
        await loadGameState(id);
      } catch (error) {
        console.error("Error loading game state:", error);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "2rem" }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <Grid container spacing={2} sx={{height: '80%'}}>
      <Graph />
      <Leaderboard />
      <RoundDialog />
    </Grid>
  );
};

export default Judgement;
