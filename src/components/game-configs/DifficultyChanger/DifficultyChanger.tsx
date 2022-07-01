import useBoardStore from '../../../store/store-hooks/useBoardStore';
import Icon from '../../ui/Icon/Icon';
import { ReactComponent as EasyIcon } from '/src/assets/baby.svg';
import { ReactComponent as HardIcon } from '/src/assets/smart.svg';

const DifficultyChanger = () => {
  const { changeGameDifficulty, getStore } = useBoardStore();

  const { difficulty } = getStore();

  const icon = difficulty === 'EASY' ? <HardIcon /> : <EasyIcon />;

  return (
    <Icon
      item={icon}
      onClick={changeGameDifficulty}
      description={`Change To  ${difficulty === 'EASY' ? 'Hard' : 'Easy'}`}
    />
  );
};

export default DifficultyChanger;
