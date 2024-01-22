import { Signal, computed, useSignal } from "@preact/signals"
import NumberSettings, { play } from "../components/NumberSettings.tsx"
import PauseControls from "../components/PauseControls.tsx"
import CurrentNumber from "../components/CurrentNumber.tsx"
import CurrentLetterSign from "../components/CurrentLetterSign.tsx"
import { TheLetter, NumbersSign } from "../components/NumbersSignImg.tsx"
import { JSX } from "preact/jsx-runtime"
import { getLetters, getNumbers, getLettersSettings } from "../helpers/list.helper.ts"
import { useEffect } from "preact/hooks";

/**
 * todo
 * [x] show restart and settings button overlay layer
 * [] listen to space keypress event for pauseing and resuming
 * [] allow user feedbacks
 */

export function Numbers() {
  return List<number>((min?: number, max?: number, total?: number) => getNumbers(min!, max!, total!))
}

export function Letters() {
  return List<string>(getLetters, true)
}

function List<T>(getListFn: (min?: number, max?: number, total?: number) => T[], isListLetters?: boolean) {
  const list = useSignal<T[]>([])
  const currentElemIdx = useSignal(0)
  const intvId = useSignal<number | null>(null)
  const shouldShowSettings = computed<boolean>(() => !isListLetters && list.value.length === 0)
  const currentElement = computed<T>(() => list.value[currentElemIdx.value] ?? list.value[list.value.length - 1])
  const isPaused = computed<boolean>(() => list.value.length > 0 && intvId.value === -1)
  const shouldDisplayResult = useSignal<boolean>(false)
  const shouldShowResumeBtn = computed(() => isPaused.value && currentElemIdx.value < list.value.length - 1)

  const secsForImgDisplaying = isListLetters ? getLettersSettings().secsForImgDisplaying : 2

  useEffect(() => { if (isListLetters) replayFn() }, [])

  const resetFn = (e?: JSX.TargetedMouseEvent<HTMLDivElement>, newList: T[] = []) => {
    list.value = newList
    currentElemIdx.value = 0
    if (intvId.value) {
      clearInterval(intvId.value)
      intvId.value = null
    }
    shouldDisplayResult.value = false
  }

  const replayFn = (e?: JSX.TargetedMouseEvent<HTMLDivElement>) => {
    const { min, max, total } = 
      isListLetters ? getLettersSettings() : (JSON.parse(localStorage.getItem('currentSettings') ?? '{}'))
    resetFn(e, getListFn(min, max, total))
    play(null, currentElemIdx, list, shouldDisplayResult, intvId, secsForImgDisplaying, getListFn)
  }

  return (
    <main>
      {shouldShowSettings.value 
        ? NumberSettings(currentElemIdx, list as Signal<number[]>, shouldDisplayResult, intvId, secsForImgDisplaying)
        : (
          <>
            {isListLetters 
              ? CurrentLetterSign(currentElement.value as string)
              : CurrentNumber(currentElement.value as number)}
            {shouldDisplayResult.value && 
              (isListLetters 
                ? TheLetter(currentElement.value as string) 
                : NumbersSign(currentElement.peek() as number))}
            {isPaused.value && PauseControls(
              shouldShowResumeBtn, 
              (e: JSX.TargetedMouseEvent<HTMLDivElement>) => resetFn(e), 
              (e: JSX.TargetedMouseEvent<HTMLDivElement>) => replayFn(e),
              isListLetters,
            )}
          </>
      )}
    </main>
  )
}
