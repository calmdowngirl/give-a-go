import { splitNumber } from "../helpers/list.helper.ts"

export function NumbersSign(n: number) {
  const list = splitNumber(n)

  return (
    <div class="flex flex-row justify-center m-0 p-0">
      <div class="flex flex-column flex-wrap justify-start ml-3">
        {...list.map((elem) => {
          const path = `/numbers/${elem}.jpg`
          const imgAltText = `the auslan sign of number ${elem}`
          return <img src={path} class="w-24" alt={imgAltText} />
        })}
      </div>
    </div>
  )
}

export function TheLetter(ch: string) {
  const ariaLabel = `what is the auslan sign of the letter ${ch}`
  return (
    <div class="flex flex-row justify-center m-0 p-0">
      <div class="flex flex-column flex-wrap justify-start ml-3">
        <h1 class ="text-6xl" aria-labelledby={ariaLabel}>{ch.toUpperCase()}</h1>
      </div>
    </div>
  )
}
