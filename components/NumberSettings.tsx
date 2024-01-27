import { Signal } from "@preact/signals";
import { JSX } from "preact/jsx-runtime";
import { getNumbers, getLettersSettings } from "../helpers/list.helper.ts";
import { useLayoutEffect } from "preact/hooks";

let min = -1, max = -1, interval = -1, total = -1

export default function NumberSettings(
  idx: Signal<number>, 
  list: Signal<number[]>, 
  shouldDisplayResult: Signal<boolean>,
  intvId: Signal<number | null>,
  secsForImgDisplaying: number,
  prevSettings: Signal<any>
): JSX.Element {

  useLayoutEffect(() => {
    const s = prevSettings.peek()
    if (s.min >= 0) min = parseInt(s.min)
    if (s.max >= 0) max = parseInt(s.max)
    if (s.interval >= 1) interval = parseInt(s.interval)
    if (s.total >= 1) total = parseInt(s.total)
  }, [prevSettings.value])
  
  const minMaxInputWidth = 'w-60 xl:w-56 lg:w-44 md:w-42 sm:w-40'

  const onSubmit = (e: JSX.TargetedMouseEvent<HTMLButtonElement>) => {
    if (!min || !max || !total || !interval || min < 0 || max < 0 || interval < 1 || total < 1) return
    play(e, idx, list, shouldDisplayResult, intvId, secsForImgDisplaying, () => getNumbers(min, max, total))
  }

  return (
    <div class="container mx-auto bg-[#F5F4FB] rounded-3xl border border-[#DAA1F5] min-w-fit h-2/3 w-1/3 my-20 py-16 xl:mx-6 lg:mx-4 md:mx-2 sm:mx-2">
      <form name="numSettingsForm">
      <h1 class="text-center text-5xl font-sans pb-6 text-[#202020] font-extralight">give numbers</h1>
      <div class="flex flex-row justify-between mb-4">
        <input autofocus required
          placeholder="min" 
          aria-label="set the range of the numbers: minimum value"
          type="number" 
          name="min" 
          value={min >= 0 ? min : prevSettings.peek().min}
          min="0"
          max="9999"
          class={inputClass({width: minMaxInputWidth, moreStyles: 'rounded-r'})} 
          onInput={evt => min = parseInt((evt.target as HTMLInputElement).value)}
        />
        <input required
          placeholder="max" 
          aria-label="set the range of the numbers: maximum value"
          type="number" 
          name="max" 
          value={max >= 0 ? max : prevSettings.peek().max}
          min="0"
          max="9999"
          class={inputClass({width: minMaxInputWidth, moreStyles: 'rounded-l'})} 
          onInput={evt => max = parseInt((evt.target as HTMLInputElement).value)}
        />
      </div>
      <input required
        placeholder="hold how many seconds b4 next" 
        aria-label="set a value: hold how many seconds before it should display the next number?" 
        type="number" name="interval" 
        min="1"
        value={interval >= 1 ? interval : prevSettings.peek().interval}
        class={inputClass({moreStyles: 'mb-4'})} 
        onInput={evt => interval = parseInt((evt.target as HTMLInputElement).value)}
      />
      <input required
        placeholder="how many numbers in total" 
        aria-label="set a value: how many numbers are there in total?" 
        type="nubmer" 
        min="1"
        value={total >= 1 ? total : prevSettings.peek().total}
        name="total" 
        class={inputClass({moreStyles: 'mb-10'})} 
        onInput={evt => total = parseInt((evt.target as HTMLInputElement).value)}
      />
      <div class="flex flex-row justify-center">
        <button 
          type="submit" 
          aria-label="generate numbers"
          action="javascript:" 
          class={btnClass()} 
          onClick={(e) => onSubmit(e)}>
            go
        </button>
      </div>
      </form>
    </div>
  )
}

function inputClass(styles: Partial<{width: string, height: string, moreStyles: string}>): string {
  const textFieldAppearance = "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
  const {width = 'w-full', height = 'h-20', moreStyles = ''} = styles
  const inputPlaceholderStyles = "placeholder-gray-500 placeholder-opacity-40 font-normal text-2xl text-center"
  const inputFocusedStyles = `focus:outline-none focus:border-[#DAA1F5] focus:ring-1 focus:ring-[#DAA1F5]`
  return `${textFieldAppearance} ${height} ${width} ${moreStyles} ${inputFocusedStyles} ${inputPlaceholderStyles}`
}

function btnClass(): string {
  const styles = "bg-white rounded border-2 border-[#6759FF] font-light text-3xl text-[#6759FF] pt-1 pb-4 px-20 mb-8"
  const onHoverStyles = "hover:border-1 hover:border-[#F5F4FB] hover:ring-1 hover:ring-[#DAA1F5] hover:text-[#DAA1F5]"
  return `${styles} ${onHoverStyles}`
}

function pause(intvId: Signal<number | null>): void {
  if (intvId.value && intvId.value !== -1) {
    clearInterval(intvId.value)
    intvId.value = -1
  }
}

export function play<T>(
  e: JSX.TargetedMouseEvent<HTMLButtonElement> | null, 
  idx: Signal<number>, 
  list: Signal<T[]>, 
  shouldDisplayResult: Signal<boolean>,
  intvId: Signal<number | null>,
  secsForImgDisplaying: number,
  getListFn: (min?: number, max?: number, total?: number) => T[]
): void {
  e?.preventDefault();
  window.setTimeoutIds = []

  const isListLetters = typeof list.peek()[0] === 'string'
  if (isListLetters) {
    ({ min, max, total, interval } = getLettersSettings())
  } else {
    localStorage.setItem('numberSettings', JSON.stringify({min, max, interval, total}))
  }
  
  if (list.peek().length === 0) {
    list.value = getListFn(min, max, total);
  }
  const len = list.peek().length

  intvId.value = setInterval(() => {
    if (idx.value < len) {
      shouldDisplayResult.value = true
      window.setTimeoutIds.push(setTimeout(() => {
        idx.value += 1
        if (idx.peek() < len) shouldDisplayResult.value = false
      }, secsForImgDisplaying * 1000))
    } else {
      pause(intvId)
    }
  }, (interval  + secsForImgDisplaying) * 1000)

  // first interval
  if (idx.peek() === 0) {
    window.setTimeoutIds.push(setTimeout(() => {
      shouldDisplayResult.value = true
    }, interval * 1000))
  }
}
