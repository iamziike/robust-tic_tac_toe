import Icon from '../../ui/Icon/Icon';
import useBoardStore from '../../../store/store-hooks/useBoardStore';
import { ReactComponent as AlternateGameModeIcon } from '/src/assets/game-mode.svg';

const AlternateGameModeControl = () => {
  const { changeGameMode } = useBoardStore();

  return (
    <Icon
      item={<AlternateGameModeIcon />}
      onClick={changeGameMode}
      description='Change Game Mode'
    />
  );
};

export default AlternateGameModeControl;
