import { ListItem, ListItemIcon, ListItemText, Checkbox, Avatar } from '@mui/material';
import { PlayerListItemProps } from '../../utils/types';
import usePlayerStore from '../../store/playerStore';

export const PlayerListItem = ({ player, checked }: PlayerListItemProps) => {
  const togglePlayer = usePlayerStore.use.togglePlayer();
  const labelId = `transfer-list-item-${player.ID}-label`;

  return (
    <ListItem key={player.ID} onClick={() => togglePlayer(player)}>
      <ListItemIcon>
        <Checkbox
          checked={checked}
          tabIndex={-1}
          disableRipple
        />
      </ListItemIcon>
      <Avatar src={player.Profile} alt={player.Name} sx={{ width: 40, height: 40, mr: 1 }} />
      <ListItemText id={labelId} primary={player.Name} />
    </ListItem>
  );
};