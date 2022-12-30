export const getRandomInteger = (min: number = 0, max: number = 100000): number => {
  return Math.floor(Math.random() * (max - min) + min)
}
