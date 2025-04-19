import useGameStore from "../../store/gameStore";
import RoundEndDialog from "./RoundEndDialog";
import RoundStartDialog from "./RoundStartDialog";


const RoundDialog = () => {
    const status = useGameStore.use.status();
    switch (status) {
        case 1:
            return <RoundStartDialog />;
        case 3:
            return <RoundEndDialog />;
        default:
            return null;
    }
};

export default RoundDialog;