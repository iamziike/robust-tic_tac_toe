import { Cells, Index, PositionsPlayed } from '../../../types/types';
import StyledBoard from './StyledBoard';

type BoardProps = {
  onClick: (index: Index) => void;
  positionsPlayed: PositionsPlayed;
  className?: string;
};

const BOARD_CELLS: Index = 9;

const Board = ({ onClick, positionsPlayed, className = '' }: BoardProps) => {
  const cellsToRender: JSX.Element[] = [];

  for (let cellCount = 1; cellCount <= BOARD_CELLS; cellCount++) {
    cellsToRender.push(
      <div
        onClick={() => onClick(cellCount as Index)}
        className='board-cell'
        key={cellCount}
      >
        {positionsPlayed[cellCount as Index] ?? '_'}
      </div>
    );
  }

  return (
    <StyledBoard className={className}>
      <div className='board-line board-line--vertical-left'></div>
      <div className='board-line board-line--vertical-right'></div>
      <div className='board-line board-line--horizontal-top'></div>
      <div className='board-line board-line--horizontal-bottom'></div>
      {cellsToRender}
    </StyledBoard>
  );
};

export default Board;
