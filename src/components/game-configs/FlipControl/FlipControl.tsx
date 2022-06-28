import useFunctionalityStore from '../../../store/store-hooks/userFunctionalityStore';
import Icon from '../../ui/Icon/Icon';
import { ReactComponent as FlipIcon } from '/src/assets/horizontal_flip.svg';

const FlipControl = () => {
  const { changeIsFlip, getStore } = useFunctionalityStore();

  const handleClick = () => {
    changeIsFlip(!getStore().isFlip);
  };

  return (
    <Icon item={<FlipIcon />} onClick={handleClick} description='Flip Board' />
  );
};

export default FlipControl;
