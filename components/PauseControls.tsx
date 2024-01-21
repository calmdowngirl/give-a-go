import { Signal } from "@preact/signals";
import { JSX } from "preact/jsx-runtime";
import { CiSettings, CiPlay1, CiRedo } from "react-icons/ci"

/**
 * 
 * todo 
 * [] add home btn
 * 
 */

export default function PauseControls(
  shouldShowResumeBtn: Signal<boolean>, 
  resetFn: (e: JSX.TargetedMouseEvent<HTMLDivElement>) => void, 
  replayFn: (e: JSX.TargetedMouseEvent<HTMLDivElement>) => void,
  isListLetters: boolean = false,
) {
  return (
    <div class="flex flex-row justify-center m-0 p-0">
      <div class="flex flex-column flex-wrap justify-around mt-4 text-7xl text-purple-400">
        <div class="m-4 cursor-pointer" onClick={(e) => {
          if (shouldShowResumeBtn.value) return
          replayFn(e)
        }}>
          {shouldShowResumeBtn.value ? <CiPlay1 /> : <CiRedo />}
        </div>
        {!isListLetters && <div class="m-4 cursor-pointer" onClick={(e) => resetFn(e)}><CiSettings /></div>}
      </div>
    </div>
  )
}
