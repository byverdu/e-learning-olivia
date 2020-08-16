export const getRandomNumber = (qtty = 5): string => {
  const array = new Uint32Array(qtty)
  return window.crypto.getRandomValues(array).join('-')
}
