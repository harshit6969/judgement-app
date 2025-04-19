import useGameStore from "../../store/gameStore";
import { GameMode } from "../../utils/types";
import RoundEndDialog from "./RoundEndDialog";
import RoundStartDialog from "./RoundStartDialog";

const RoundDialog = () => {
  const status = useGameStore.use.status();
  switch (status) {
    case GameMode.ROUND_START:
      return <RoundStartDialog />;
    case GameMode.ROUND_END:
      return <RoundEndDialog />;
    default:
      return null;
  }
};

export default RoundDialog;
