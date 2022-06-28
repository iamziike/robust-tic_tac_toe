import styled from 'styled-components';

const StyledBoard = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
  align-items: center;
  height: max-content;
  gap: ${({ theme }) => theme.spacing.lg};
  font-size: 40px;

  .board-cell {
    text-align: center;
    cursor: pointer;
    transition: transform 0.5s;
    text-shadow: 2px 3px black;
  }

  .board-cell:hover {
    transform: scale(1.2);
  }

  .board-line {
    position: absolute;
    /* transform: rotate(1deg); */
  }

  .board-line--vertical-left,
  .board-line--vertical-right {
    height: 120%;
    border-left: dashed 4px;
    top: -10%;
  }

  .board-line--vertical-left {
    left: 33%;
  }

  .board-line--vertical-right {
    right: 33%;
  }

  .board-line--horizontal-top,
  .board-line--horizontal-bottom {
    width: 100%;
    height: 10px;
    border-top: dashed 4px;
    left: 0%;
  }

  .board-line--horizontal-top {
    top: 30%;
  }

  .board-line--horizontal-bottom {
    bottom: 30%;
  }
`;

export default StyledBoard;
