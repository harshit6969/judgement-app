import { Card, CardHeader, List, Divider, Checkbox } from '@mui/material';
import { PlayerListProps } from '../../utils/types';
import { PlayerListItem } from './PlayerListItem';
import usePlayerStore from '../../store/playerStore';

export const PlayerList = ({
  title,
  players,
}: PlayerListProps) => {
  const checkedPlayers = usePlayerStore.use.checked();

  const toggleAllPlayers = usePlayerStore.use.toggleAllPlayers();
  const numChecked = players.filter(p => checkedPlayers.includes(p)).length;

  return (
    <Card className='players-card'>
      <CardHeader
        avatar={
          <Checkbox
            onClick={() => toggleAllPlayers(players)}
            checked={numChecked === players.length && players.length > 0}
            indeterminate={numChecked > 0 && numChecked < players.length}
            disabled={players.length === 0}
            inputProps={{ 'aria-label': 'all items selected' }}
          />
        }
        title={title}
        subheader={`${numChecked}/${players.length} selected`}
      />
      <Divider />
      <List dense className='players-list'>
        {players.map((player) => (
          <PlayerListItem
            key={player.ID}
            player={player}
            checked={checkedPlayers.includes(player)}
          />
        ))}
      </List>
    </Card>
  );
};