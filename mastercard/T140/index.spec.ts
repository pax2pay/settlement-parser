import "jest"
import { T140 } from "./"
import * as data from "./data"

describe("T140", () => {
	it("parse testA", () => {
		const outcome = T140.parse(data.testA)
		expect(outcome).toEqual({
			type: "1IP728010-AA",
			pages: [
				{
					brand: "DMC",
					content: {
						currency: "GBP",
					},
					cycle: 6,
					date: "2020-05-15",
					level: "sub regional",
					member: 12345,
					number: 1,
					run: "2020-05-15T08:07:55Z",
				},
				{
					brand: "DMC",
					content: {
						currency: "GBP",
					},
					cycle: 6,
					date: "2020-05-15",
					level: "intra country",
					member: 12345,
					number: 2,
					run: "2020-05-15T08:07:55Z",
				},
				{
					brand: "DMC",
					content: {
						currency: "GBP",
					},
					cycle: 6,
					date: "2020-05-15",
					level: "inter regional",
					member: 12345,
					number: 3,
					run: "2020-05-15T08:07:55Z",
				},
				{
					brand: "DMC",
					content: {
						currency: "EUR",
					},
					cycle: 6,
					date: "2020-05-15",
					level: "intra regional",
					member: 12345,
					number: 4,
					run: "2020-05-15T08:07:55Z",
				},
				{
					brand: "DMC",
					content: {
						currency: "GBP",
					},
					cycle: 6,
					date: "2020-05-15",
					level: "sub regional",
					member: 12345,
					number: 5,
					run: "2020-05-15T08:07:55Z",
				},
				{
					brand: "DMC",
					content: {
						currency: "GBP",
					},
					cycle: 6,
					date: "2020-05-15",
					level: "intra country",
					member: 12345,
					number: 6,
					run: "2020-05-15T08:07:55Z",
				},
			],
		})
	})
})
