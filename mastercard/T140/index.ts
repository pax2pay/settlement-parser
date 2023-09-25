// import { Input } from "../../Input"
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
	export type Summary = T140Summary
	export type Total = T140Total
	// export function parse(data: string | Input): T140 | undefined {
	// 	if (typeof data == "string")
	// 		data = Input.create(data)
	// 	data.readWhileWhitespace()
	// 	const type = data.readUntilWhitespace().toString()
	// 	const pages = data.split(type).map(Page.parse)
	// 	return Type.is(type) && pages.every(p => p) ? { type, pages } : undefined
	// }
}
