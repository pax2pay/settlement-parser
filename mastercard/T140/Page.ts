import { isoly } from "isoly"
//import { Input } from "../../Input"
import { ClearingCycle } from "./ClearingCycle"
import { Summary } from "./Summary"
import { Total } from "./Total"

export interface Page {
	number: number
	run: isoly.DateTime
	date: isoly.Date
	brand?: string
	member: number
	content: Summary | ClearingCycle | Total
}

export namespace Page {
	// export function parse(data: Input): Page | undefined {
	// 	const rawDate =
	// 		data.readWhileWhitespace() &&
	// 		data.readIf("MASTERCARD WORLDWIDE") &&
	// 		data.readWhileWhitespace() &&
	// 		data.readIf("RUN DATE: ") &&
	// 		data
	// 			.readUntilWhitespace()
	// 			.split("/")
	// 			.map(i => i.toString())
	// 	const date = rawDate && `20${rawDate[2]}-${rawDate[0]}-${rawDate[1]}`
	// }
	// function parseHeaders(data: Input): Omit<Page, "content"> {}
}
/*
split page on "MASTERCARD WORLDWIDE"

page types (in header):
"CLEARING CYCLE [0-9]+ - ACKNOWLEDGEMENT"
"CLEARING CYCLE [0-9]+ - NOTIFICATION"
"CLEARING CYCLE [0-9]+ SUMMARY"
"CLEARING CYCLE [0-9]+"
"CLEARING DAY TOTAL"
*/
