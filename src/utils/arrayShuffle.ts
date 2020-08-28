export const arrayShuffle = (
  array: unknown[],
): unknown[] => [...array.sort(() => Math.random() - 0.5)]
