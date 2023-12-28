import { isoly } from "isoly"
import { isly } from "isly"
import { Cycle } from "../Cycle"
import { Level } from "../Level"
import { Value } from "../Value"
import { Header } from "./Header"
import { Raw } from "./Raw"
import { Table } from "./Table"

export interface NotificationSummary {
	class: "notification summary"
	date: isoly.Date
	run: isoly.Date
	cycle: Cycle
	content: {
		brand: string
		level: Level
		member: number
		currency: isoly.Currency
		data: { id: number; file: string; direction: "original" | "reversal"; amount: Value; fee: Value }[]
		total: { amount: Value; fee: Value }
	}[]
}
export namespace NotificationSummary {
	const summaryHeaders = isly.object<Required<Pick<Header, "date" | "run" | "cycle">>>({
		date: isly.string(),
		run: isly.string(),
		cycle: Cycle.type,
	})
	const contentHeaders = isly.object<Required<Pick<Header, "brand" | "level" | "member" | "currency">>>({
		brand: isly.string(),
		level: Level.type,
		member: isly.number(),
		currency: isly.string(isoly.Currency.types),
	})
	export function parse(data: Raw): NotificationSummary | undefined {
		const summaryHeader = summaryHeaders.get(data.header)
		const separator = data.body.findIndex(l => !l.trim())
		const contentHeader = contentHeaders.get(Header.parse(data.body.slice(0, separator)))
		const table = Table.parse(data.body.slice(separator + 1))
		const total = table && {
			// TODO: parse grand total
			amount: Value.parse(table.content[0][3]) ?? 0,
			fee: Value.parse(table.content[0][4]) ?? 0,
		}
		return (
			summaryHeader &&
			contentHeader &&
			table &&
			total && {
				class: "notification summary",
				...summaryHeader,
				content: [
					{
						...contentHeader,
						data: table.content.map(row => ({
							id: Number.parseInt(row[0]),
							file: row[1],
							direction: row[2] == "ORIG" ? "original" : "reversal",
							amount: Value.parse(row[3]) ?? 0,
							fee: Value.parse(row[4]) ?? 0,
						})),
						total,
					},
				],
			}
		)
	}
}
