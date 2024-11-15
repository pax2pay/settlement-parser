import { Page as T140Page } from "./Page"
import { Specifier } from "./Page/Specifier"
import { Summary as T140Summary } from "./Summary"

export interface T140 {
	pages: T140.Page[]
}
export namespace T140 {
	export import Summary = T140Summary
	export import Page = T140Page
	export function parse(data: string): T140 | undefined {
		const type = data.substring(0, 20).trim()
		const pages = data
			.split(/\n[^ ]/gm)
			.map(p => T140.Page.parse(p))
			.filter((p): p is Page => !!p)
		return Specifier.is(type) ? { pages } : undefined
	}
}
