import { parser } from "../../index"
import * as data from "./data"

describe("mastercard.T140.Summary", () => {
	it("from", () => {
		expect(parser.mastercard.T140.Summary.from(data.parsed.pages)).toEqual({
			cycle: 3,
			date: "2023-12-21",
			file: "001/231221/00000004882/03402",
			run: "2023-12-21",
			total: { amount: { GBP: 0.73 }, fee: { GBP: 0.02 } },
		})
	})
})
