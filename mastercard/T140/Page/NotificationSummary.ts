import { isoly } from "isoly"
import { isly } from "isly"
import { Cycle } from "../Cycle"
import { Level } from "../Level"
import { Failed } from "./Failed"
import { Header } from "./Header"

export interface NotificationSummary {
	type: "notification"
	subtype: "summary"
	date: isoly.Date
	cycle: Cycle
	number: number
	brand: "MCC"
	member: string
	content: Record<
		isoly.Currency,
		{
			level: Level
			services: { id: number; file: string; amount: number; fee: number }[]
			total: { amount: number; fee: number }
		}[]
	>
}
export namespace NotificationSummary {
	export const type = isly.object<NotificationSummary>({
		type: isly.string("notification"),
		subtype: isly.string("summary"),
		date: isly.fromIs("isly.Date", isoly.Date.is),
		cycle: isly.fromIs("Cycle", Cycle.is),
		number: isly.number(),
		brand: isly.string("MCC"),
		member: isly.string(),
		content: isly.record(
			isly.fromIs("isoly.Currency", isoly.Currency.is),
			isly.array(
				isly.object({
					level: isly.fromIs("Level", Level.is),
					services: isly.array(
						isly.object<NotificationSummary["content"]["AED"][0]["services"][0]>({
							id: isly.number(),
							file: isly.string(),
							amount: isly.number(),
							fee: isly.number(),
						})
					),
					total: isly.object<{ amount: number; fee: number }>({ amount: isly.number(), fee: isly.number() }),
				})
			)
		),
	})
	export const is = type.is

	export function parse(header: Header, body: string[]): NotificationSummary | Failed | undefined {
		let result: NotificationSummary | Failed | undefined
		if (header.type == "notification" && !header.file) {
			//
		}
		return result
	}
}
