/**
 * Simple module to get a random value from an array
 * of things.
 *
 * @param {any[]} array Array of values.
 * @returns {any} Single random value from array.
 */
export const getRandomValue = <T>(array: T[]): T => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};
