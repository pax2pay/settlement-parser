import { Page as T140Page } from "./Page"
import { Type } from "./Type"

export interface T140 {
	type: Type
	pages: T140.Page[]
}

export namespace T140 {
	export type Page = T140Page
	export const Page = T140Page
	export function parse(data: string): T140 | undefined {
		const type = data.substring(0, 20).trim()
		const pages = data
			.split(type)
			.map(T140.Page.parse)
			.filter((p): p is Page => !!p)
		return Type.is(type) ? { type, pages } : undefined
	}
}
