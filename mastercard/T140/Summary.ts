import { isoly } from "isoly"
import { Level } from "./Level"

export interface Summary {
	type: "summary"
	clearingCycle: 1 | 2 | 3 | 4 | 5 | 6
	data: {
		currency: isoly.Currency
		businessServiceLevel: Level
		entries: {
			cycle: 1 | 2 | 3 | 4 | 5 | 6
			direction: "to" | "from"
			file: string
			amount: number
		}[]
		total: number
	}[]
}
