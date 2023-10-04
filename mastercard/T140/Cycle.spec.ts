import "jest"
import { Cycle } from "./Cycle"

describe("mastercard.T140.Cycle", () => {
	it("is 6", () => expect(Cycle.is(6)).toBe(true))
	it("is 0", () => expect(Cycle.is(0)).toBe(false))
	it("is 1.3", () => expect(Cycle.is(1.3)).toBe(false))
	it("is 3", () => expect(Cycle.is(3)).toBe(true))
	it("is 1", () => expect(Cycle.is(1)).toBe(true))
})
