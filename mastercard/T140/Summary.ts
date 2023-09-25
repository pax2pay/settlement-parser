import { isoly } from "isoly"

export interface Summary {
	type: "summary"
	clearingCycle: 1 | 2 | 3 | 4 | 5 | 6
	data: {
		currency: isoly.Currency
		businessServiceLevel: "intra country" | "inter regional" | "intra regional" | "sub regional" // + other?
		entries: {
			cycle: 1 | 2 | 3 | 4 | 5 | 6
			direction: "to" | "from"
			file: string
			amount: number
		}[]
		total: number
	}[]
}
