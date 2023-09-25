import { isoly } from "isoly"

export interface Total {
	type: "total"
	clearingCycle: 1 | 2 | 3 | 4 | 5 | 6
	data: {
		entries: {
			currency: isoly.Currency
			amount: number
		}[]
	}[]
}
