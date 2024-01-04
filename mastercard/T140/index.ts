import { Page as T140Page } from "./Page"
import { Specifier } from "./Page/Specifier"
import { Summary as T140Summary } from "./Summary"

export interface T140 {
	pages: T140.Page[]
}
export namespace T140 {
	export type Summary = T140Summary
	export const Summary = T140Summary
	export type Page = T140Page
	export const Page = T140Page
	export namespace Page {
		export type Acknowledgement = T140Page.Acknowledgement
		export type NotificationFile = T140Page.NotificationFile
		export type NotificationSummary = T140Page.NotificationSummary
		export type Failed = T140Page.Failed
	}
	export function parse(data: string): T140 | undefined {
		const type = data.substring(0, 20).trim()
		const pages = data
			.split(/\n[^ ]/gm)
			.map(p => T140.Page.parse(p))
			.filter((p): p is Page => !!p)
		return Specifier.is(type) ? { pages } : undefined
	}
}
