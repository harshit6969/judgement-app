import {
  Avatar,
  Badge,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import useGameStore from "../../store/gameStore";
import { useEffect, useState } from "react";
import { Player } from "../../utils/types";
import { sortPlayersByScore } from "../../utils/helper";

const Leaderboard = () => {
  const players = useGameStore.use.players();
  const currentRound = useGameStore.use.currentRound();
  const status = useGameStore.use.status();

  const [leaders, setLeaders] = useState<Player[]>([]);

  useEffect(() => {
    setLeaders(sortPlayersByScore(players));
  }, [players, currentRound]);

  return (
    <Grid
      size={{ xs: 12, md: 4 }}
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
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              badgeContent={
                status === 2 && (
                  <Avatar sx={{ width: 20, height: 20, backgroundColor: Player.ColorCode }}>
                    {Player.CurrentRoundScore}
                  </Avatar>
                )
              }
            >
              <Avatar src={Player.Profile} />
            </Badge>
          </ListItemAvatar>
          <ListItemText primary={Player.Name} />
        </ListItem>
      ))}
    </Grid>
  );
};

export default Leaderboard;
