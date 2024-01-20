import { Signal } from "@preact/signals";
import { JSX } from "preact/jsx-runtime";

/**
 * todo
 * [] focus on the first input field on page load
 * [] load values from localStorage if there r any
 * [] add min max restricts to input field
 * [] accessibility
 * [x] split numbers
 * [x] find auslang numbers jpegs
 * [x] display numbers in auslan jpegs before jumping to next number
 * [] inputs error checking and add styles for errors
 * [] enter keypress == submit
 */

let min: number, max: number, interval = -1, total = -1

export default function NumberSettings(
  idx: Signal<number>, 
  list: Signal<number[]>, 
  shouldDisplayImg: Signal<boolean>,
  intvId: Signal<number | null>,
  secsForImgDisplaying: number) {
  const minMaxInputWidth = 'w-60 xl:w-56 lg:w-44 md:w-42 sm:w-40'
  return (
    <div class="container mx-auto bg-[#F5F4FB] rounded-3xl border border-[#DAA1F5] min-w-fit h-2/3 w-1/3 my-20 py-16 xl:mx-6 lg:mx-4 md:mx-2 sm:mx-2">
      <form>
      <h1 class="text-center text-5xl font-sans pb-6 text-[#202020] font-extralight">give numbers</h1>
      <div class="flex flex-row justify-between mb-4">
        <input 
          placeholder="min" 
          type="number" 
          name="min" 
          value={min}
          class={inputClass({width: minMaxInputWidth, moreStyles: 'rounded-r'})} 
          onInput={evt => min = parseInt((evt.target as HTMLInputElement).value)}
        />
        <input 
          placeholder="max" 
          type="number" 
          name="max" 
          class={inputClass({width: minMaxInputWidth, moreStyles: 'rounded-l'})} 
          onInput={evt => max = parseInt((evt.target as HTMLInputElement).value)}
        />
      </div>
      <input 
        placeholder="hold how many seconds b4 next" 
        type="number" name="interval" 
        class={inputClass({moreStyles: 'mb-4'})} 
        onInput={evt => interval = parseInt((evt.target as HTMLInputElement).value)}
      />
      <input 
        placeholder="how many numbers in total" 
        type="nubmer" 
        name="total" 
        class={inputClass({moreStyles: 'mb-10'})} 
        onInput={evt => total = parseInt((evt.target as HTMLInputElement).value)}
      />
      <div class="flex flex-row justify-center">
        <button 
          type="submit" 
          action="javascript:" 
          class={btnClass()} 
          onClick={(e) => play(e, idx, list, shouldDisplayImg, intvId, secsForImgDisplaying)}>
            go
        </button>
      </div>
      </form>
    </div>
  )
}

function inputClass(styles: Partial<{width: string, height: string, moreStyles: string}>) {
  const textFieldAppearance = "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
  const {width = 'w-full', height = 'h-20', moreStyles = ''} = styles
  const inputPlaceholderStyles = "placeholder-gray-500 placeholder-opacity-40 font-normal text-2xl text-center"
  const inputFocusedStyles = `focus:outline-none focus:border-[#DAA1F5] focus:ring-1 focus:ring-[#DAA1F5]`
  return `${textFieldAppearance} ${height} ${width} ${moreStyles} ${inputFocusedStyles} ${inputPlaceholderStyles}`
}

function btnClass() {
  const styles = "bg-white rounded border-2 border-[#6759FF] font-light text-3xl text-[#6759FF] pt-1 pb-4 px-20 mb-8"
  const onHoverStyles = "hover:border-1 hover:border-[#F5F4FB] hover:ring-1 hover:ring-[#DAA1F5] hover:text-[#DAA1F5]"
  return `${styles} ${onHoverStyles}`
}

export function getNumbers(min: number, max: number, total: number): number[] {
  const numSet = new Set<number>()
  if (total > max - min + 1) total = max - min + 1
  while (numSet.size < total) {
    numSet.add(Math.floor(Math.random() * (max - min + 1)) + min)
  }
  return Array.from<number>(numSet)
}

function pause(intvId: Signal<number | null>): void {
  if (intvId.value && intvId.value !== -1) {
    clearInterval(intvId.value)
    intvId.value = -1
  }
}

export function play(
  e: JSX.TargetedMouseEvent<HTMLButtonElement> | null, 
  idx: Signal<number>, 
  list: Signal<number[]>, 
  shouldDisplayImg: Signal<boolean>,
  intvId: Signal<number | null>,
  secsForImgDisplaying: number
) {
  e?.preventDefault();
  localStorage.setItem('currentSettings', JSON.stringify({min, max, interval, total}))
  list.value = getNumbers(min, max, total);
  const len = list.peek().length
  
  intvId.value = setInterval(() => {
    if (idx.value < len) {
      shouldDisplayImg.value = true
      setTimeout(() => {
        idx.value += 1
        if (idx.peek() < len) shouldDisplayImg.value = false
      }, secsForImgDisplaying * 1000)
    } else {
      pause(intvId)
    }
  }, (interval  + secsForImgDisplaying) * 1000)

  // first interval
  if (idx.peek() === 0) {
    setTimeout(() => {
      shouldDisplayImg.value = true
    }, interval * 1000)
  }
}
