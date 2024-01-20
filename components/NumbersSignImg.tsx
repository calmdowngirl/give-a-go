export default function NumbersSignImg(n: number) {
  const list = splitNumber(n)

  return (
    <div class="flex flex-row justify-center m-0 p-0">
      <div class="flex flex-column flex-wrap justify-start ml-3">
        {...list.map((elem) => {
          const path = `/numbers/${elem}.jpg`
          return <img src={path} class="w-24" />
        })}
      </div>
    </div>
  )
}

export function splitNumber(n: number): number[] {
  if (n <= 19) return [n]

  const digits = n.toString().split('')
  const numbers: number[] = []
  for (let i = 0; i < digits.length - 2; ++i) {
    if (digits[i] != '0') {
      numbers.push(parseInt(digits[i]), 10 ** (digits.length - 1 - i))
    }
  }

  numbers.push(parseInt(digits[digits.length - 2]), parseInt(digits[digits.length - 1]))

  if (n % 100 === 0) return numbers.slice(0, -2)
  if (numbers.slice(-2).join() === '1,0') return [...numbers.slice(0, -2), 10]

  return numbers
}
