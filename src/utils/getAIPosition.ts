import { Difficulty } from './../types/types';
import { getUniqueNeedles, isSomeNeedlesInHay } from './helpers';
import { Index, WINNING_POSITIONS_TYPE } from '../types/types';

const INDEX_PLAYABLE: Index[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const getRandomSelection = <T>(items: T[]) =>
  items[Math.floor(Math.random() * items.length)];

// returns only the first one about to complete
const getClosestMatchingPosition = (
  winningPositions: WINNING_POSITIONS_TYPE,
  includingPositions: Index[],
  excludingPositions: Index[] = []
): [Index, Index, Index] | null => {
  let matchingPosition: [Index, Index, Index] | null = null;

  winningPositions.some((winningPosition) => {
    if (isSomeNeedlesInHay(winningPosition, excludingPositions)) return false;

    let count = 0;
    includingPositions.forEach((includingPosition) => {
      if (winningPosition.includes(includingPosition)) count++;
    });

    if (count === 2) {
      matchingPosition = winningPosition;
      return true;
    }
    return false;
  });
  return matchingPosition;
};

const getAIPosition = (
  winningPositions: WINNING_POSITIONS_TYPE,
  difficulty: Difficulty,
  indexPositionsByOpponent: Index[],
  indexPositionsByAI: Index[]
): Index => {
  const indexPositionsCombined = [
    ...indexPositionsByOpponent,
    ...indexPositionsByAI,
  ];

  if (difficulty === 'HARD') {
    // EXCLUSIVE GAME PLAN 1 (real ART OF WAR STUFF)
    const isAllowGamePlanOne = (
      opponentPosition: Index,
      positionToPlay: Index
    ) => {
      if (
        indexPositionsByOpponent.length === 1 &&
        indexPositionsByAI.length === 0
      )
        return (
          indexPositionsByOpponent.includes(opponentPosition) &&
          !indexPositionsByOpponent.includes(positionToPlay)
        );
      return false;
    };

    if (isAllowGamePlanOne(1, 9)) return 9;
    if (isAllowGamePlanOne(3, 7)) return 7;
    if (isAllowGamePlanOne(7, 3)) return 3;
    if (isAllowGamePlanOne(9, 1)) return 1;

    // START UP CONFIGS
    if (
      indexPositionsByOpponent.length === 0 &&
      indexPositionsByAI.length === 0 &&
      !indexPositionsCombined.includes(5)
    )
      return 5;

    // WIN / KO
    const closestMatchingPositionByAI = getClosestMatchingPosition(
      winningPositions,
      indexPositionsByAI,
      indexPositionsByOpponent
    );
    if (closestMatchingPositionByAI)
      return <Index>(
        getUniqueNeedles(indexPositionsByAI, closestMatchingPositionByAI)
      );

    // DEFEND
    const closestMatchingPositionByOpponent = getClosestMatchingPosition(
      winningPositions,
      indexPositionsByOpponent,
      indexPositionsByAI
    );
    if (closestMatchingPositionByOpponent)
      return <Index>(
        getUniqueNeedles(
          indexPositionsByOpponent,
          closestMatchingPositionByOpponent
        )
      );

    // EXCLUSIVE GAME PLAN 2 (real ART OF WAR STUFF)
    if (
      indexPositionsByAI.includes(5) ||
      indexPositionsByOpponent.includes(5)
    ) {
      const tactics = [
        { key: 1, value: 9 },
        { key: 9, value: 1 },
        { key: 7, value: 3 },
        { key: 3, value: 7 },
      ];

      const tacticsKeys = tactics.map((tactic) => tactic.key);

      const uniqueKeys = <Array<Index>>(
        getUniqueNeedles(indexPositionsCombined, tacticsKeys, false)
      );
      if (uniqueKeys) {
        const randomSelection = getRandomSelection(uniqueKeys);

        if (randomSelection) return randomSelection;
      }
    }
  }

  // if it reaches here just return a random number
  return getRandomSelection(
    INDEX_PLAYABLE.filter((index) => !indexPositionsCombined.includes(index))
  );
};

export default getAIPosition;
