import "jest"
import { parser } from "./index"

describe("library", () => {
	it("a", () => {
		expect(parser.mastercard.T140.parse("aaa")).toEqual(undefined)
	})
})
