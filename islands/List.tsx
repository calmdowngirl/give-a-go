import { computed, Signal, useSignal } from "@preact/signals";
import NumberSettings, { play } from "../components/NumberSettings.tsx";
import PauseControls from "../components/PauseControls.tsx";
import CurrentNumber from "../components/CurrentNumber.tsx";
import CurrentLetterSign from "../components/CurrentLetterSign.tsx";
import { NumbersSign, TheLetter } from "../components/NumbersSignImg.tsx";
import { JSX } from "preact/jsx-runtime";
import {
  getLetters,
  getLettersSettings,
  getNumbers,
} from "../helpers/list.helper.ts";
import { useEffect } from "preact/hooks";

declare global {
  interface Window {
    setTimeoutIds: number[];
  }
}

export function Numbers() {
  return Playlist<number>((min?: number, max?: number, total?: number) =>
    getNumbers(min!, max!, total!)
  );
}

export function Letters() {
  return Playlist<string>(getLetters, true);
}

function Playlist<T>(
  getListFn: (min?: number, max?: number, total?: number) => T[],
  isListLetters?: boolean,
): JSX.Element {
  let prevSettings = useSignal<any>({});
  const list = useSignal<T[]>([]);
  const currentElemIdx = useSignal(0);
  // pause the list will set the intvId to -1
  const intvId = useSignal<number | null>(null);
  const shouldShowSettings = computed<boolean>(() =>
    !isListLetters && list.value.length === 0
  );
  const currentElement = computed<T>(() =>
    list.value[currentElemIdx.value] ?? list.value[list.value.length - 1]
  );
  const isPaused = computed<boolean>(() =>
    list.value.length > 0 && intvId.value === -1
  );
  const shouldDisplayResult = useSignal<boolean>(false);
  const shouldShowResumeBtn = computed(() =>
    isPaused.value && currentElemIdx.value < list.value.length - 1
  );

  const secsForImgDisplaying = isListLetters
    ? getLettersSettings().secsForImgDisplaying
    : 2;

  const resetFn = (
    e?: JSX.TargetedMouseEvent<HTMLDivElement>,
    newList: T[] = [],
  ) => {
    list.value = newList;
    currentElemIdx.value = 0;
    if (intvId.value) {
      clearInterval(intvId.value);
      intvId.value = null;
    }
    shouldDisplayResult.value = false;
  };

  const replayFn = (e?: JSX.TargetedMouseEvent<HTMLDivElement>) => {
    const { min, max, total } = isListLetters
      ? getLettersSettings()
      : (JSON.parse(localStorage.getItem("numberSettings") ?? "{}"));
    resetFn(e, getListFn(min, max, total));
    play(
      null,
      currentElemIdx,
      list,
      shouldDisplayResult,
      intvId,
      secsForImgDisplaying,
      getListFn,
    );
  };

  const resumeFn = () => {
    if (currentElemIdx.peek() === list.peek().length - 1) return;
    play(
      null,
      currentElemIdx,
      list,
      shouldDisplayResult,
      intvId,
      secsForImgDisplaying,
      getListFn,
    );
  };

  useEffect(() => {
    if (isListLetters) replayFn();
    addEventListener("keyup", (e) => {
      if (e.code !== "Space") return;
      if (intvId.peek() && intvId.peek()! > 0) {
        clearInterval(intvId.peek()!);
        intvId.value = -1;
        globalThis.window.setTimeoutIds.forEach((id) => clearTimeout(id));
      } else {
        resumeFn();
      }
    });
    prevSettings.value = JSON.parse(
      localStorage.getItem("numberSettings") ?? "{}",
    );
  }, []);

  return (
    <main>
      {shouldShowSettings.value
        ? NumberSettings(
          currentElemIdx,
          list as Signal<number[]>,
          shouldDisplayResult,
          intvId,
          secsForImgDisplaying,
          prevSettings,
        )
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
              () => resumeFn(),
              isListLetters,
            )}
          </>
        )}
    </main>
  );
}
