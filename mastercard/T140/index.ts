import { ClearingCycle as T140ClearingCycle } from "./ClearingCycle"
import { Page as T140Page } from "./Page"
import { Summary as T140Summary } from "./Summary"
import { Total as T140Total } from "./Total"
import { Type } from "./Type"

export interface T140 {
	type: Type
	pages: T140.Page[]
}

export namespace T140 {
	export type ClearingCycle = T140ClearingCycle
	export type Page = T140Page
	export const Page = T140Page
	export type Summary = T140Summary
	export type Total = T140Total
	export function parse(data: string): T140 | undefined {
		const type = data.substring(0, 20).trim()
		const pages = data
			.split(type)
			.map(T140.Page.parse)
			.filter((p): p is Page => !!p)
		return Type.is(type) ? { type, pages } : undefined
	}
}
