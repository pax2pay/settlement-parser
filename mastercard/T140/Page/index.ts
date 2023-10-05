import { Table } from "../Table"
import { NotificationSummary } from "./NotificationSummary"
// import { Summary } from "./Summary"

export type Page = NotificationSummary

export namespace Page {
	export function parse(input: string): Page | undefined {
		const lines = input.split("\n")
		const separator = lines.findIndex(l => !l.trim())
		const values = lines
			.slice(0, separator)
			.flatMap(row => row.split(" ".repeat(10)))
			.map(h => h.toString().trim())
			.filter(h => !!h)
			.map(h => Header.parse(h))

		const header =
			values.every((h): h is NonNullable<typeof values[number]> => !!h) &&
			(Object.assign({}, ...values) as NonNullable<typeof values[number]>)
		const body = lines.slice(separator)
		return NotificationSummary.parse(header, body) // ?? Acknowledgement.parse(header, body)
	}
}
