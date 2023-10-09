import { isly } from "isly"

export interface Table {
	headers: string[]
	content: string[][]
	footers: string[]
}

export namespace Table {
	export const type = isly.object<Table>({
		headers: isly.array(isly.string()),
		content: isly.array(isly.array(isly.string())),
		footers: isly.array(isly.string()),
	})
	export const is = type.is
	export function parse(lines: string[]): Table | undefined {
		const contentStart = lines.findIndex(line => line.startsWith(" ----"))
		if (contentStart < 0)
			return undefined
		else {
			const contentEnd = lines.findIndex(line => line.trim().length == 0)
			const columns = lines[contentStart]
				.trimStart()
				.trimEnd()
				.split(" ")
				.map(c => c.length + 1)
			function splitIntoColumns(line: string): string[] {
				let start = 0
				return columns.map(c => line.substring(start, (start += c)).trim())
			}
			const headerCells = lines.slice(0, contentStart).map(splitIntoColumns)
			return {
				headers: headerCells[0].map((_, index) =>
					headerCells
						.map(r => r[index].trim())
						.filter(c => c)
						.join(" ")
				),
				content: lines.slice(contentStart + 1, contentEnd - 2).map(splitIntoColumns),
				footers: splitIntoColumns(lines[contentEnd - 1]),
			}
		}
	}
}
