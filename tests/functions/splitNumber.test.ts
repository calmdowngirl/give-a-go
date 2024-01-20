import {
  describe,
  it,
} from "$std/testing/bdd.ts"
import { assertEquals } from "$std/assert/mod.ts"
import { splitNumber } from "../../components/NumbersSignImg.tsx"

describe("splitNumber function", () => {
  it("should split the number correctly", () => {
    const testData = [0, 10, 12, 19, 1234, 5489, 100, 1000, 110, 1010, 2030, 1020, 6800]
    const expected = [
      [0], [10], [12], [19],
      [1, 1000, 2, 100, 3, 4],
      [5, 1000, 4, 100, 8, 9],
      [1, 100],
      [1, 1000],
      [1, 100, 10],
      [1, 1000, 10],
      [2, 1000, 3, 0],
      [1, 1000, 2, 0],
      [6, 1000, 8, 100]
    ]
    testData.forEach((n, i) => assertEquals(splitNumber(n), expected[i], `incorrect result for ${n}`))
  })
})
