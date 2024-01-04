import { T140 } from "../index"
export const parsed: T140 = {
	pages: [
		{
			class: "acknowledgement",
			cycle: 3,
			date: "2023-12-21",
			member: 33400,
			run: "2023-12-21",
		},
		{
			class: "notification file",
			cycle: 3,
			date: "2023-12-21",
			file: "001/231221/00000004882/03402",
			run: "2023-12-21",
		},
		{
			class: "notification summary",
			content: [
				{
					brand: "MCC",
					currency: "GBP",
					data: [
						{
							amount: 0.73,
							direction: "original",
							fee: -0.02,
							file: "001/231221/00000004882/03402",
							id: 900,
						},
					],
					level: "mbr-to-mbr agreement",
					member: 33400,
					total: {
						amount: 0.73,
						fee: -0.02,
					},
				},
			],
			cycle: 3,
			date: "2023-12-21",
			run: "2023-12-21",
		},
	],
}
