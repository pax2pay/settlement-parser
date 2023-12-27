/* eslint-disable @typescript-eslint/no-non-null-assertion */ // TODO: add type checks
import { isoly } from "isoly"
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
	export function parse(data: Raw): NotificationSummary | undefined {
		{
			const separator = data.body.findIndex(l => !l.trim())
			const header = Header.parse(data.body.slice(0, separator))
			const table = Table.parse(data.body.slice(separator + 1))
			const total = table && {
				// TODO: parse grand total
				amount: Value.parse(table.content[0][3])!,
				fee: Value.parse(table.content[0][4])!,
			}
			return (
				header &&
				table &&
				total && {
					class: "notification summary",
					date: data.header.date!,
					run: data.header.run!,
					cycle: data.header.cycle!,
					content: [
						{
							brand: header.brand!,
							level: header.level!,
							member: header.member!,
							currency: header.currency!,
							data: table.content.map(row => ({
								id: Number.parseInt(row[0]),
								file: row[1],
								direction: row[2] == "ORIG" ? "original" : "reversal",
								amount: Value.parse(row[3])!,
								fee: Value.parse(row[4])!,
							})),
							total,
						},
					],
				}
			)
		}
	}
}
