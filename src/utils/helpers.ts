export const isSomeNeedlesInHay = <T>(hay: T[], needles: T[]) =>
  needles.some((needle) => hay.includes(needle));

export const isAllNeedlesInHay = <T>(hay: T[], needles: T[]) =>
  needles.every((needle) => hay.includes(needle));

export const getUniqueNeedles = <T>(
  hay: T[],
  needles: T[],
  single: boolean = true
) => {
  const results = needles.filter((needle) => !hay.includes(needle));

  if (!results.length) return null;
  if (single) return results[0];
  return results;
};

export const clearTimeoutIDs = (ids: number[]) => {
  ids.forEach((id) => id && clearTimeout(id));
};

export const executeTillReturnRandomNumber = (
  greatherThan: number,
  lessThan: number
) => {
  let number = 0;
  while (number < greatherThan) {
    number = Math.random() * lessThan;
  }
  return number;
};
