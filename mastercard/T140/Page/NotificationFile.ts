import { isoly } from "isoly"
import { isly } from "isly"
import { Cycle } from "../Cycle"
import { Raw } from "./Raw"
import { Table } from "./Table"

export interface NotificationFile {
	class: "notification file"
	date: isoly.Date
	run: isoly.Date
	cycle: Cycle
	file: string
}
export namespace NotificationFile {
	const required = isly.object<Omit<NotificationFile, "class">>({
		date: isly.fromIs("Date", isoly.Date.is),
		run: isly.fromIs("isoly.DateTime", isoly.Date.is),
		cycle: Cycle.type,
		file: isly.string(),
	})
	export function parse(data: Raw): NotificationFile | undefined {
		const table =
			data.body.length > 0 && data.body[0].startsWith(" MASTERCARD SETTLED")
				? Table.parse([" ".repeat(20) + data.body[0].substring(20), ...data.body.slice(1)])
				: undefined
		const headers = required.get(data.header)
		return (
			table &&
			headers && {
				class: "notification file",
				...headers,
			}
		)
	}
}
