function getLetters(): string[] {
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')
  const indexes = getNumbers(0, 25, 26)
  return indexes.map(elem => letters[elem])
}

function getNumbers(min: number, max: number, total: number): number[] {
  const numSet = new Set<number>()
  if (min > max) [min, max] = [max, min]
  if (total > max - min + 1) total = max - min + 1
  while (numSet.size < total) {
    numSet.add(Math.floor(Math.random() * (max - min + 1)) + min)
  }
  return Array.from<number>(numSet)
}

function getLettersSettings() {
  const min = 0, max = 25, total = 26, interval = 3, secsForImgDisplaying = 1
  return { min, max, total, interval, secsForImgDisplaying }
}

export { getLetters, getNumbers, getLettersSettings }
