import { parser } from "../../index"
import * as data from "./data"

describe("mastercard.T140.Summary", () => {
	it("from parsed", () => {
		expect(parser.mastercard.T140.Summary.from(data.parsed.pages)).toEqual({
			cycle: 3,
			date: "2023-12-21",
			file: "001/231221/00000004882/03402",
			run: "2023-12-21",
			total: { GBP: { expected: { net: 0.73, fee: { other: 0.02 } } } }, //{ amount: { GBP: 0.73 }, fee: { GBP: 0.02 } },
		})
	})
	it("parse single", () => {
		const parsed = parser.mastercard.T140.parse(data.empty)
		expect(parsed).toEqual({
			pages: [
				{ class: "acknowledgement", cycle: 6, date: "2024-01-04", member: 33400, run: "2024-01-04" },
				{ class: "acknowledgement", cycle: 6, date: "2024-01-04", member: 33400, run: "2024-01-04" },
			],
		})
		expect(parsed ? parser.mastercard.T140.Summary.from(parsed.pages) : parsed).toEqual({
			cycle: 6,
			date: "2024-01-04",
			run: "2024-01-04",
		})
	})
})
