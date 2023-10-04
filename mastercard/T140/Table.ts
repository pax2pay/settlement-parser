export interface Table {
	headers: string[]
	content: string[][]
	footers: string[]
}

export namespace Table {
	export function parse(lines: string[]): Table | undefined {
		const contentStart = lines.findIndex(line => line.startsWith(" ___"))
		const contentEnd = lines.findIndex(line => line.trim().length == 0)
		const columns = lines[contentStart]
			.trimEnd()
			.split("   ")
			.map(c => c.length + 3)
		function splitIntoColumns(line: string): string[] {
			let start = 0
			return columns.map(c => line.substring(start, (start += c)).trim())
		}
		return {
			headers: splitIntoColumns(lines[contentStart - 1]).map((value, index) =>
				`${splitIntoColumns(lines[contentStart - 3])[index] ?? ""} ${
					splitIntoColumns(lines[contentStart - 2])[index]
				} ${value}`.trim()
			),
			content: lines.slice(contentStart + 1, contentEnd).map(splitIntoColumns),
			footers: splitIntoColumns(lines[contentEnd + 1]),
		}
	}
}
