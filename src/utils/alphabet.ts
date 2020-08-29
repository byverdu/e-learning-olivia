const alphabetLength = 26
// eslint-disable-next-line @typescript-eslint/naming-convention
const UTF_16_Code_For_a = 97

export const alphabet = (): string[] => {
  const utfCodes = Array.from({ length: alphabetLength }, (_, ind) => UTF_16_Code_For_a + ind)

  return String.fromCharCode(...utfCodes).split('')
}
