import useBoardStore from '../../../store/store-hooks/useBoardStore';
import Icon from '../../ui/Icon/Icon';
import { ReactComponent as ResetIcon } from '/src/assets/refresh.svg';

const ResetControl = () => {
  const { resetBoard } = useBoardStore();

  return (
    <Icon item={<ResetIcon />} onClick={resetBoard} description='Reset Game' />
  );
};

export default ResetControl;
