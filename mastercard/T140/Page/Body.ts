import { Header } from "./Header"
import { Table } from "./Table"

export type Body = [] | (Table | undefined)[] | { header: Header; table: Table }[]

export namespace Body {
	export function parse(lines: string[]): Body | undefined {
		let result: Body | undefined
		if (lines.length == 0)
			// no data to report
			result = []
		else if (lines[0].startsWith(" MASTERCARD SETTLED"))
			result = [Table.parse([" ".repeat(20) + lines[0].substring(20), ...lines.slice(1)])]
		else {
			const separator = lines.findIndex(l => !l.trim())
			const header = Header.parse(lines.slice(0, separator))
			const table = Table.parse(lines.slice(separator + 1))
			result = header && table && [{ header, table }]
		}
		return result
	}
}
