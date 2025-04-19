import {
  Avatar,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import useGameStore from "../../store/gameStore";
import { useEffect, useState } from "react";
import { Player } from "../../utils/types";

const getSortedPlayers = (players: Player[]) => {
  return players.sort((p1, p2) => p2.TotalScore - p1.TotalScore);
};

const Leaderboard = () => {
  const players = useGameStore.use.players();
  const currentRound = useGameStore.use.currentRound();

  const [leaders, setLeaders] = useState<Player[]>([]);

  useEffect(() => {
    console.log("Leaderboard players", players);
    setLeaders(getSortedPlayers(players));
  }, [currentRound]);

  return (
    <Grid
      size={4}
      container
      direction="column"
      sx={{
        justifyContent: "space-evenly",
        alignItems: "stretch",
      }}
    >
      {leaders.map((Player) => (
        <ListItem
          key={Player.Name}
          secondaryAction={
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: Player.ColorCode }}>
                {Player.TotalScore}
              </Avatar>
            </ListItemAvatar>
          }
        >
          <ListItemAvatar>
            <Avatar src={Player.Profile} />
          </ListItemAvatar>
          <ListItemText primary={Player.Name} />
        </ListItem>
      ))}
    </Grid>
  );
};

export default Leaderboard;
