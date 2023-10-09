import { Failed } from "./Failed"
import { Header } from "./Header"
import { NotificationSummary } from "./NotificationSummary"
import { Table } from "./Table"
// import { Summary } from "./Summary"

export type Page = NotificationSummary | { header: Header; body: undefined; table: Table | undefined }

export namespace Page {
	export function parse(input: string): Page | undefined | Failed {
		const lines = input.split("\n")
		const separator = lines.findIndex(l => !l.trim())
		const values = lines
			.slice(0, separator)
			.flatMap(row => row.split(" ".repeat(10)))
			.map(h => h.toString().trim())
			.filter(h => !!h)
			.map(h => Header.parse(h))
			.filter(v => v && Object.keys(v).length > 0)
		const header = Object.assign({}, ...values)
		const table = Table.parse(lines.slice(separator + 1, lines.length - 1))
		// const header =
		// 	values.every((h): h is NonNullable<typeof values[number]> => !!h) &&
		// 	(Object.assign({}, ...values) as NonNullable<typeof values[number]>)
		// const body = lines.slice(separator)
		return { header: header, body: undefined, table: table }
		// return Header.is(header) ? NotificationSummary.parse(header, body) : undefined // ?? Acknowledgement.parse(header, body)
	}
}
