import { Value } from "./Value"

describe("mastercard.T140.Value", () => {
	it("with comma", () => {
		expect(Value.parse("1,100.66 DR")).toEqual(1100.66)
	})
})
