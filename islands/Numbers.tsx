import { computed, useSignal } from "@preact/signals"
import NumberSettings, { getNumbers, play } from "../components/NumberSettings.tsx"
import PauseControls from "../components/PauseControls.tsx"
import NumbersSignImg from "../components/NumbersSignImg.tsx"
import { JSX } from "preact/jsx-runtime";

/**
 * todo
 * [x] show restart and settings button overlay layer
 * [] listen to space keypress event for pauseing and resuming
 * [] allow user feedbacks
 */

export default function Numbers() {
  const numbers = useSignal<number[]>([])
  const currentNumberIdx = useSignal(0)
  const intvId = useSignal<number | null>(null)
  const shouldShowSettings = computed<boolean>(() => numbers.value.length === 0)
  const currentNumber = computed<number>(() => numbers.value[currentNumberIdx.value] ?? numbers.value[numbers.value.length - 1])
  const isPaused = computed<boolean>(() => numbers.value.length > 0 && intvId.value === -1)
  const shouldDisplayImg = useSignal<boolean>(false)
  const shouldShowResumeBtn = computed(() => isPaused.value && currentNumberIdx.value < numbers.value.length - 1)

  const secsForImgDisplaying = 2

  const resetFn = (e: JSX.TargetedMouseEvent<HTMLDivElement>, newList: number[] = []) => {
    numbers.value = newList
    currentNumberIdx.value = 0
    if (intvId.value) {
      clearInterval(intvId.value)
      intvId.value = null
    }
    shouldDisplayImg.value = false
  }

  const replayFn = (e: JSX.TargetedMouseEvent<HTMLDivElement>) => {
    const { min, max, total } = JSON.parse(localStorage.getItem('currentSettings') ?? '{}')
    resetFn(e, getNumbers(min, max, total))
    play(null, currentNumberIdx, numbers, shouldDisplayImg, intvId, secsForImgDisplaying)
  }

  return (
    <main>
      {shouldShowSettings.value 
        ? NumberSettings(currentNumberIdx, numbers, shouldDisplayImg, intvId, secsForImgDisplaying)
        : (
          <>
            <div class="flex flex-row justify-center w-screen my-4">
              <h1 class="text-9xl">{currentNumber}</h1>
            </div>
            {shouldDisplayImg.value && NumbersSignImg(currentNumber.peek())}
            {isPaused.value && PauseControls(
              shouldShowResumeBtn, 
              (e: JSX.TargetedMouseEvent<HTMLDivElement>) => resetFn(e), 
              (e: JSX.TargetedMouseEvent<HTMLDivElement>) => replayFn(e)
            )}
          </>
      )}
    </main>
  )
}
