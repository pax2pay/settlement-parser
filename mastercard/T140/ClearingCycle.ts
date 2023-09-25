import { isoly } from "isoly"

export interface ClearingCycle {
	type: "clearing cycle"
	clearingCycle: 1 | 2 | 3 | 4 | 5 | 6
	data: {
		currency: isoly.Currency
		businessServiceLevel: "intra country" | "inter regional" | "intra regional" | "sub regional" // + other?
		entries: {
			id: string
			direction: "to" | "from"
			file: string
			amount: number
		}[]
		total: number
	}[]
}
