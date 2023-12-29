import { Acknowledgement } from "./Acknowledgement"
import { Failed } from "./Failed"
import { Header } from "./Header"
import { NotificationFile } from "./NotificationFile"
import { NotificationSummary } from "./NotificationSummary"

export type Page = Acknowledgement | NotificationFile | NotificationSummary | Failed

export namespace Page {
	export function parse(input: string): Page | undefined {
		const lines = input.split("\n")
		const separator = lines.map(l => l.trim()).findIndex(l => !l || l == "NO DATA TO REPORT")
		const header = Header.parse(lines.slice(0, separator))
		const body = lines.slice(separator + 1, lines.length - 1)
		const raw = header && body && { header, body }
		return !raw
			? { class: "failed", data: input }
			: Acknowledgement.parse(raw) ||
					NotificationFile.parse(raw) ||
					NotificationSummary.parse(raw) || { class: "failed", data: input }
	}
}
