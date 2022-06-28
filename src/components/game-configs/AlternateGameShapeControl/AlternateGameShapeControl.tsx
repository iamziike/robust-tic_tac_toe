import styled from 'styled-components';

import Icon from '../../ui/Icon/Icon';
import useBoardStore from '../../../store/store-hooks/useBoardStore';

const StyledIcon = styled(Icon)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary};
  width: 20px;
  height: 20px;
  border-radius: 500px;
`;

const AlternateGameShapeControl = () => {
  const { changePlayerShape, getPlayers } = useBoardStore();

  return (
    <StyledIcon
      item={getPlayers()[0].shape}
      onClick={changePlayerShape}
      description='Change Players Shapes'
    />
  );
};

export default AlternateGameShapeControl;
