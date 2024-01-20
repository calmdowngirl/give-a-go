import {
  describe,
  it,
} from "$std/testing/bdd.ts"
import { assertEquals } from "$std/assert/mod.ts"
import { getNumbers } from "../../components/NumberSettings.tsx"

describe("getNumbers function", () => {
  it("should give a list of distinct numbers of which values r >= min and <= max", () => {
    const min = 0, max = 9999, total = 1000
    const list = getNumbers(min, max, total)
    assertEquals(list.every(elem => elem >= min && elem <= max), true)
    assertEquals(list.length, total)
    assertEquals(hasDuplicatedElementsInList(list), false)
  })

  it("should give (max - min + 1) distinct numbers that r within range when total is greater then (max - min + 1)", () => {
    const min = 88, max = 99, total = 20
    const list = getNumbers(min, max, total)
    assertEquals(list.every(elem => elem >= min && elem <= max), true)
    assertEquals(list.length, max - min + 1)
    assertEquals(hasDuplicatedElementsInList(list), false)
  })
})

function hasDuplicatedElementsInList<T>(list: T[]) {
  const map = new Map<T, number>()
  list.forEach((elem, i) => {
    if (!map.get(elem)) {
      map.set(elem, i)
    } else {
      return true
    }
  })
  return false
}