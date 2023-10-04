import { isoly } from "isoly"
import { Input } from "../../Input"
import { ClearingCycle } from "./ClearingCycle"
import { Cycle } from "./Cycle"
import { Level } from "./Level"
import { Summary } from "./Summary"
import { Total } from "./Total"

export interface Page {
	number: number
	run: isoly.DateTime
	cycle: Cycle
	level: Level
	date: isoly.Date
	brand?: string
	member: number
	content: Summary | ClearingCycle | Total
}

export namespace Page {
	export function is(value: any): value is Page {
		return true // TODO
	}
	export function parse(input: Input): Page | undefined {
		const lines = input.readUntil("\n" + " ".repeat(133) + "\n").split("\n")
		console.log(
			"lines",
			lines.map(l => l.toString())
		)
		const values = lines
			.flatMap(row => row.split(" ".repeat(10)))
			.map(h => h.toString().trim())
			.filter(h => !!h)
			.map(h => Header.parse(h))

		const header =
			values.every((h): h is NonNullable<typeof values[number]> => !!h) &&
			(Object.assign({}, ...values) as NonNullable<typeof values[number]>)
		const result = header
			? {
					number: header.number,
					run: `${header.runDate}T${header.runTime}Z`,
					cycle: header.cycle,
					level: header.level,
					date: header.date,
					brand: header.brand,
					member: header.member,
					content: { currency: header.currency } as any as Total,
			  }
			: undefined
		return Page.is(result) ? result : undefined
	}
	export namespace Header {
		type Header = Partial<
			Omit<Page, "run"> & {
				runDate: string
				runTime: string
				currency: isoly.Currency
				type: "summary"
			}
		>

		export function parse(input: string): Header | undefined {
			let result: Header | undefined
			if (input == "" || input == "MASTERCARD WORLDWIDE")
				result = {}
			else if (input.startsWith("CLEARING CYCLE"))
				result = {
					cycle: Cycle.parse(input.substring(15, 18)),
					type: input.endsWith("SUMMARY") ? "summary" : undefined,
				}
			else if (isoly.Date.is(input as any))
				result = { date: input }
			else {
				const [key, value] = input.split(":").map(e => e.trim())
				switch (key) {
					case "RUN DATE":
						const runDate = value.split("/")
						result = { runDate: `20${runDate[2]}-${runDate[0]}-${runDate[1]}` }
						break
					case "ACCEPTANCE BRAND":
						result = { brand: value }
						break
					case "RUN TIME":
						const runTime = value.split(".")
						result = { runTime: `${runTime[0]}:${runTime[1]}:${runTime[2]}` }
						break
					case "BUSINESS SERVICE LEVEL":
						result = { level: Level.parse(value) }
						break
					case "PAGE NO":
						result = { number: Number.parseInt(value) }
						break
					case "MEMBER ID":
						result = { member: Number.parseInt(value) }
						break
					case "CURRENCY CODE":
						const currency = value.split("-")[1].trim()
						result = { currency: isoly.Currency.is(currency) ? currency : undefined }
						break
					default:
						console.log("unable to parse page header:", input)
						break
				}
			}
			return result
		}
	}
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
