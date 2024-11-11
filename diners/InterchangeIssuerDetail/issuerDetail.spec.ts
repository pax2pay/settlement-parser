import { InterchangeIssuerDetail } from "."
import { parsed } from "./parseResult"
import { file } from "./sampleFile"

describe("InterchangeIssuerDetail", () => {
	it("parse", () => {
		const result = InterchangeIssuerDetail.parse(file)
		expect(result.errors.length).toBe(0)
		expect(InterchangeIssuerDetail.validate(result)).toBeTruthy()
		expect(result).toEqual(parsed)
	})
})
