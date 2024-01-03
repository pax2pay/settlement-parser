import { Acknowledgement as PageAcknowledgement } from "./Acknowledgement"
import { Failed } from "./Failed"
import { Header } from "./Header"
import { NotificationFile as PageNotificationFile } from "./NotificationFile"
import { NotificationSummary as PageNotificationSummary } from "./NotificationSummary"

export type Page = PageAcknowledgement | PageNotificationFile | PageNotificationSummary | Failed

export namespace Page {
	export function parse(input: string): Page | undefined {
		const lines = input.split("\n")
		const separator = lines.map(l => l.trim()).findIndex(l => !l || l == "NO DATA TO REPORT")
		const header = Header.parse(lines.slice(0, separator))
		const body = lines.slice(separator + 1, lines.length - 1)
		const raw = header && body && { header, body }
		return !raw
			? { class: "failed", data: input }
			: PageAcknowledgement.parse(raw) ||
					PageNotificationFile.parse(raw) ||
					PageNotificationSummary.parse(raw) || { class: "failed", data: input }
	}
	export type Acknowledgement = PageAcknowledgement
	export type NotificationFile = PageNotificationFile
	export type NotificationSummary = PageNotificationSummary
}
