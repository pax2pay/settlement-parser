import "jest"
import { T140 } from "./"
import * as data from "./data"

describe("T140", () => {
	it("parse testA", () => {
		const outcome = T140.parse(data.testA)
		expect(outcome).toEqual({
			pages: [
				{
					brand: "DMC",
					content: {
						currency: "GBP",
						tables: [
							{
								content: [["050012", "", "001/200515/00000020520/06601", "176.47 DR", "826-GBP"]],
								footers: ["TOTAL", "", "", "176.47 DR", "826-GBP"],
								headers: [
									"BUSINESS SERVICE ID",
									"FILE ID TO MASTERCARD",
									"FILE ID FROM MASTERCARD",
									"NET RECON CURRENCY AMOUNT",
									"RECON. CURR. CODE",
								],
							},
							{
								content: [["050012", "", "001/200515/00000020520/06601", "1,499.42 DR", "978-EUR"]],
								footers: ["TOTAL", "", "", "1,499.42 DR", "978-EUR"],
								headers: [
									"BUSINESS SERVICE ID",
									"FILE ID TO MASTERCARD",
									"FILE ID FROM MASTERCARD",
									"NET RECON CURRENCY AMOUNT",
									"RECON. CURR. CODE",
								],
							},
						],
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
						tables: [
							{
								content: [["826001", "", "001/200515/00000020520/06601", "2,411.69 DR", "826-GBP"]],
								footers: ["TOTAL", "", "", "2,411.69 DR", "826-GBP"],
								headers: [
									"BUSINESS SERVICE ID",
									"FILE ID TO MASTERCARD",
									"FILE ID FROM MASTERCARD",
									"NET RECON CURRENCY AMOUNT",
									"RECON. CURR. CODE",
								],
							},
							{
								content: [["616001", "", "001/200515/00000020520/06601", "1,794.67 DR", "978-EUR"]],
								footers: ["TOTAL", "", "", "1,794.67 DR", "978-EUR"],
								headers: [
									"BUSINESS SERVICE ID",
									"FILE ID TO MASTERCARD",
									"FILE ID FROM MASTERCARD",
									"NET RECON CURRENCY AMOUNT",
									"RECON. CURR. CODE",
								],
							},
						],
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
						tables: [
							{
								content: [
									["CYCLE 01", "", "001/200515/00000020520/01101", "332.47 DR", "826-GBP"],
									["CYCLE 02", "", "", "", ""],
									["CYCLE 03", "", "001/200515/00000020520/03401", "59.40 CR", "826-GBP"],
								],
								footers: ["TOTAL", "", "", "273.07 DR", "826-GBP"],
								headers: [
									"CYCLE ACTIVITY",
									"FILE ID TO MASTERCARD",
									"FILE ID FROM MASTERCARD",
									"NET RECON CURRENCY AMOUNT",
									"RECON. CURR. CODE",
								],
							},
							{
								content: [
									["CYCLE 01", "", "001/200515/00000020520/01101", "843.49 DR", "978-EUR"],
									["CYCLE 02", "", "001/200515/00000020520/02201", "239.43 DR", "978-EUR"],
									["CYCLE 03", "", "001/200515/00000020520/03401", "471.90 DR", "978-EUR"],
									["CYCLE 04", "", "001/200515/00000020520/04401", "175.72 DR", "978-EUR"],
									["CYCLE 05", "", "001/200515/00000020520/05601", "833.29 DR", "978-EUR"],
								],
								footers: ["TOTAL", "", "", "2,563.83 DR", "978-EUR"],
								headers: [
									"CYCLE ACTIVITY",
									"FILE ID TO MASTERCARD",
									"FILE ID FROM MASTERCARD",
									"NET RECON CURRENCY AMOUNT",
									"RECON. CURR. CODE",
								],
							},
						],
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
						tables: [
							{
								content: [
									["CYCLE 01", "", "001/200515/00000020520/01101", "479.23 DR", "978-EUR"],
									["CYCLE 02", "", "", "", ""],
									["CYCLE 03", "", "001/200515/00000020520/03401", "8.46 DR", "978-EUR"],
									["CYCLE 04", "", "001/200515/00000020520/04401", "429.69 DR", "978-EUR"],
								],
								footers: ["TOTAL", "", "", "917.38 DR", "978-EUR"],
								headers: [
									"CYCLE ACTIVITY",
									"FILE ID TO MASTERCARD",
									"FILE ID FROM MASTERCARD",
									"NET RECON CURRENCY AMOUNT",
									"RECON. CURR. CODE",
								],
							},
						],
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
						tables: [
							{
								content: [
									["CYCLE 01", "", "001/200515/00000020520/01101", "10,284.29 DR", "826-GBP"],
									["CYCLE 02", "", "001/200515/00000020520/02201", "10,893.07 DR", "826-GBP"],
									["CYCLE 03", "", "001/200515/00000020520/03401", "8,662.57 DR", "826-GBP"],
									["CYCLE 04", "", "001/200515/00000020520/04401", "1,778.72 DR", "826-GBP"],
									["CYCLE 05", "", "001/200515/00000020520/05601", "7,384.98 DR", "826-GBP"],
									["CYCLE 06", "", "001/200515/00000020520/06601", "176.47 DR", "826-GBP"],
								],
								footers: ["TOTAL", "", "", "39,180.10 DR", "826-GBP"],
								headers: [
									"CYCLE ACTIVITY",
									"FILE ID TO MASTERCARD",
									"FILE ID FROM MASTERCARD",
									"NET RECON CURRENCY AMOUNT",
									"RECON. CURR. CODE",
								],
							},
							{
								content: [
									["CYCLE 01", "", "001/200515/00000020520/01101", "9,814.64 DR", "978-EUR"],
									["CYCLE 02", "906/200514/00000019066/01936", "", "273.37 CR", "978-EUR"],
									["CYCLE 02", "", "001/200515/00000020520/02201", "21,024.25 DR", "978-EUR"],
									["CYCLE 03", "", "001/200515/00000020520/03401", "13,825.14 DR", "978-EUR"],
									["CYCLE 04", "", "001/200515/00000020520/04401", "7,555.58 DR", "978-EUR"],
									["CYCLE 05", "", "001/200515/00000020520/05601", "7,735.58 DR", "978-EUR"],
									["CYCLE 06", "", "001/200515/00000020520/06601", "1,499.42 DR", "978-EUR"],
								],
								footers: ["TOTAL", "", "", "61,181.24 DR", "978-EUR"],
								headers: [
									"CYCLE ACTIVITY",
									"FILE ID TO MASTERCARD",
									"FILE ID FROM MASTERCARD",
									"NET RECON CURRENCY AMOUNT",
									"RECON. CURR. CODE",
								],
							},
						],
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
						tables: [
							{
								content: [
									["CYCLE 01", "", "001/200515/00000020520/01101", "4,261.49 DR", "826-GBP"],
									["CYCLE 02", "", "001/200515/00000020520/02201", "112,991.85 DR", "826-GBP"],
									["CYCLE 03", "", "001/200515/00000020520/03401", "75,106.34 DR", "826-GBP"],
									["CYCLE 04", "", "001/200515/00000020520/04401", "19,513.24 DR", "826-GBP"],
									["CYCLE 05", "", "001/200515/00000020520/05601", "2,178.64 DR", "826-GBP"],
									["CYCLE 06", "", "001/200515/00000020520/06601", "2,411.69 DR", "826-GBP"],
								],
								footers: ["TOTAL", "", "", "216,463.25 DR", "826-GBP"],
								headers: [
									"CYCLE ACTIVITY",
									"FILE ID TO MASTERCARD",
									"FILE ID FROM MASTERCARD",
									"NET RECON CURRENCY AMOUNT",
									"RECON. CURR. CODE",
								],
							},
							{
								content: [
									["CYCLE 01", "", "001/200515/00000020520/01101", "4,338.43 DR", "978-EUR"],
									["CYCLE 02", "", "001/200515/00000020520/02201", "194,744.64 DR", "978-EUR"],
									["CYCLE 03", "", "001/200515/00000020520/03401", "127,070.84 DR", "978-EUR"],
									["CYCLE 04", "", "001/200515/00000020520/04401", "3,711.13 DR", "978-EUR"],
									["CYCLE 05", "", "001/200515/00000020520/05601", "91.12 DR", "978-EUR"],
									["CYCLE 06", "", "001/200515/00000020520/06601", "1,794.67 DR", "978-EUR"],
								],
								footers: ["TOTAL", "", "", "331,750.83 DR", "978-EUR"],
								headers: [
									"CYCLE ACTIVITY",
									"FILE ID TO MASTERCARD",
									"FILE ID FROM MASTERCARD",
									"NET RECON CURRENCY AMOUNT",
									"RECON. CURR. CODE",
								],
							},
						],
					},
					cycle: 6,
					date: "2020-05-15",
					level: "intra country",
					member: 12345,
					number: 6,
					run: "2020-05-15T08:07:55Z",
				},
			],
			type: "1IP728010-AA",
		})
	})
})
