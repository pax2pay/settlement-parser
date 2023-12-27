import { isly } from "isly"

export interface Table {
	headers: string[]
	content: string[][]
	footers?: string[]
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
		let result: Table | undefined
		if (contentStart >= 0) {
			let footerEnd = lines.findIndex(line => line.trim().length == 0)
			let contentEnd =
				contentStart + 1 + lines.slice(contentStart + 1, footerEnd - 1).findIndex(line => line.startsWith(" ----"))
			if (contentEnd == contentStart) {
				contentEnd = footerEnd
				footerEnd = -1
			}
			const columns = lines[contentStart]
				.trimStart()
				.trimEnd()
				.split(" -")
				.map(c => c.length + 2)
			function splitIntoColumns(line: string): string[] {
				let start = 0
				return columns.map(c => line.substring(start, (start += c)).trim())
			}
			const headerCells = lines.slice(0, contentStart).map(splitIntoColumns)
			result = {
				headers: headerCells[0].map((_, index) =>
					headerCells
						.map(r => r[index].trim())
						.filter(c => c)
						.join(" ")
				),
				content: lines.slice(contentStart + 1, contentEnd).map(splitIntoColumns),
				footers: footerEnd > 0 ? splitIntoColumns(lines[footerEnd - 1]) : undefined,
			}
		}
		return result
	}
}
