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

function splitNumber(n: number): number[] {
  if (n <= 19) return [n]

  const digits = n.toString().split('')
  const numbers: number[] = []
  for (let i = 0; i < digits.length - 2; ++i) {
    if (digits[i] != '0') {
      numbers.push(parseInt(digits[i]), 10 ** (digits.length - 1 - i))
    }
  }

  if (parseInt(digits[digits.length - 2]) !== 0) {
    numbers.push(parseInt(digits[digits.length - 2]))
  }
  numbers.push(parseInt(digits[digits.length - 1]))

  if (n % 100 === 0) return numbers.slice(0, -2)
  if (numbers.slice(-2).join() === '1,0') return [...numbers.slice(0, -2), 10]

  return numbers
}

export { getLetters, getNumbers, getLettersSettings, splitNumber }
