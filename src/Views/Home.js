import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Grid,
  Card,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Button,
  Divider,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Avatar,
} from "@material-ui/core";
import { v4 as uuidv } from "uuid";
import { usePlayersStore } from "../store/playerStore";
import { withRouter } from "react-router-dom";
import { setValue } from "../data-access-layer/storage-helper";

// Utility functions
function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

const GamesHome = ({ history }) => {
  const { players } = usePlayersStore(); // Zustand state management

  // Local state for checked items, available and selected players
  const [checked, setChecked] = useState([]);
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  useEffect(() => {
    setAvailablePlayers(players); // Set available players on mount
  }, [players]);

  // Function to toggle selection for a player
  const handleToggle = useCallback(
    (player) => {
      const currentIndex = checked.indexOf(player);
      const newChecked = [...checked];

      if (currentIndex === -1) {
        newChecked.push(player);
      } else {
        newChecked.splice(currentIndex, 1);
      }

      setChecked(newChecked);
    },
    [checked] // Dependency on `checked`
  );

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  // Move selected items from available to selected
  const handleCheckedRight = () => {
    setSelectedPlayers(
      selectedPlayers.concat(intersection(checked, availablePlayers))
    );
    setAvailablePlayers(not(availablePlayers, checked));
    setChecked(not(checked, checked));
  };

  // Move selected items from selected to available
  const handleCheckedLeft = () => {
    setAvailablePlayers(
      availablePlayers.concat(intersection(checked, selectedPlayers))
    );
    setSelectedPlayers(not(selectedPlayers, checked));
    setChecked(not(checked, checked));
  };

  // Function to start the game
  const startGame = () => {
    if (selectedPlayers.length >= 4 && selectedPlayers.length <= 10) {
      const gameId = uuidv();
      setValue(gameId, { Players: selectedPlayers });
      history.push(`/judgement-app/${gameId}`);
    } else {
      alert(
        "Player count not suitable for the game. Select between 4 and 10 players."
      );
    }
  };

  // Memoize the list to avoid unnecessary re-renders
  const memoizedPlayers = useMemo(() => {
    return (items) =>
      items.map((player) => {
        const labelId = `transfer-list-all-item-${player.ID}-label`;

        return (
          <ListItem key={player.ID} button onClick={() => handleToggle(player)}>
            <ListItemIcon>
              <Checkbox
                checked={checked.indexOf(player) !== -1}
                disableRipple
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemIcon>
            <Avatar
              src={player.Profile} // Use Profile for image source
              alt={player.Name}
              style={{ width: 40, height: 40, marginRight: "8px" }} // Responsive avatar size
            />
            <ListItemText id={labelId} primary={player.Name} />
          </ListItem>
        );
      });
  }, [checked, handleToggle]);

  const customList = (title, items) => (
    <Card style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <CardHeader
        avatar={
          <Checkbox
            onClick={() => handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{ "aria-label": "all items selected" }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List dense style={{ flex: 1, overflowY: "auto" }}>
        {memoizedPlayers(items)}
      </List>
    </Card>
  );

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      style={{ height: "95vh", display: "flex", flexDirection: "column" }} // Full height with flexbox
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Home</Typography>
        </Toolbar>
      </AppBar>

      <Container
        style={{
          flex: 1, // Fill available space
          paddingTop: "16px",
          display: "flex",
          flexDirection: "column",
        }} // Full height with flex
      >
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="stretch" // Stretch to fill height
            style={{ flex: 1 }}
          >
            <Grid item xs={5} style={{ height: "100%" }}>
              {customList("Available Players", availablePlayers)}
            </Grid>
            <Grid
              item
              xs={2}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="outlined"
                size="small"
                onClick={handleCheckedRight}
                disabled={intersection(checked, availablePlayers).length === 0}
                aria-label="move selected right"
                style={{ marginBottom: "8px" }}
              >
                &gt;
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={handleCheckedLeft}
                disabled={intersection(checked, selectedPlayers).length === 0}
                aria-label="move selected left"
              >
                &lt;
              </Button>
            </Grid>
            <Grid item xs={5} style={{ height: "100%" }}>
              {customList("Selected Players", selectedPlayers)}
            </Grid>
          </Grid>

        <Button
          variant="contained"
          color="primary"
          onClick={startGame}
          disabled={selectedPlayers.length < 4 || selectedPlayers.length > 10}
          style={{ marginTop: "16px", alignSelf: "center", width: "50%" }}
        >
          Start Game
        </Button>
      </Container>
    </Grid>
  );
};

export default withRouter(GamesHome);
