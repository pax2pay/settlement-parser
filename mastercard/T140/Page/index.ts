import { Body } from "./Body"
import { Failed } from "./Failed"
import { Header } from "./Header"

export type Page = { header: Header; body: Body }

export namespace Page {
	export function parse(input: string): Page | undefined | Failed {
		const lines = input.split("\n")
		const separator = lines.map(l => l.trim()).findIndex(l => !l || l == "NO DATA TO REPORT")
		const header = Header.parse(lines.slice(0, separator))
		const body = Body.parse(lines.slice(separator + 1, lines.length - 1))
		return header && body && { header, body }
	}
}
