import { Signal } from "@preact/signals";
import { JSX } from "preact/jsx-runtime";
import { CiSettings, CiPlay1, CiRedo, CiHome } from "react-icons/ci"

export default function PauseControls(
  shouldShowResumeBtn: Signal<boolean>, 
  resetFn: (e: JSX.TargetedMouseEvent<HTMLDivElement>) => void, 
  replayFn: (e: JSX.TargetedMouseEvent<HTMLDivElement>) => void,
  resumeFn: () => void,
  isListLetters: boolean = false,
) {
  return (
    <div class="flex flex-row justify-center m-0 p-0">
      <div class="flex flex-column flex-wrap justify-around mt-4 text-7xl text-purple-400">
        {!isListLetters && 
        <div class="m-4 cursor-pointer" onClick={(e) => resetFn(e)}>
          <CiSettings aria-label="go to numbers settings page" />
        </div>}
        <div class="m-4 cursor-pointer" onClick={(e) => {
          if (shouldShowResumeBtn.value) {
            resumeFn() 
          } else {
            replayFn(e)
          }
        }}>
          {shouldShowResumeBtn.value ? <CiPlay1 aria-label="resume" /> : <CiRedo  aria-label="restart" />}
        </div>
        <div class="m-4"><a href="/"><CiHome aria-label="go to home page" /></a></div>
      </div>
    </div>
  )
}
