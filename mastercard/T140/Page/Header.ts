import { isoly } from "isoly"
import { isly } from "isly"
import { Cycle } from "../Cycle"
import { Level } from "../Level"
import { Specifier } from "./Specifier"

export interface Header {
	specifier?: Specifier
	number?: number
	run?: isoly.Date
	cycle?: Cycle
	level?: Level
	date?: isoly.Date
	brand?: string
	member?: number
	file?: string
	currency?: isoly.Currency
	type?: "acknowledgement" | "notification"
}
export namespace Header {
	export const type = isly.object<Header>({
		specifier: Specifier.type.optional(),
		number: isly.number().optional(),
		run: isly.fromIs("isoly.DateTime", isoly.Date.is).optional(),
		cycle: Cycle.type.optional(),
		level: Level.type.optional(),
		date: isly.fromIs("Date", isoly.Date.is).optional(),
		brand: isly.string().optional(),
		member: isly.number().optional(),
		file: isly.string().optional(),
		currency: isly.string(isoly.Currency.types).optional(),
		type: isly.string(["acknowledgement", "notification"]).optional(),
	})
	export function parse(lines: string[]): Header {
		const values = lines.flatMap(row => row.split(" ".repeat(10)).map(h => parseLine(h.trim())))
		return Object.assign({}, ...values)
	}
	function parseLine(input: string): Header {
		let result: Header
		if (input == "" || input == "MASTERCARD WORLDWIDE")
			result = {}
		else if (input.startsWith("CLEARING CYCLE"))
			result = {
				cycle: Cycle.parse(input.substring(15, 18)),
				type: input.endsWith("ACKNOWLEDGEMENT")
					? "acknowledgement"
					: input.endsWith("NOTIFICATION")
					? "notification"
					: undefined,
			}
		else if (isoly.Date.is(input as any))
			result = { date: input }
		else {
			const [key, value] = input.split(":").map(e => e.trim())
			switch (key) {
				case "RUN DATE":
					const runDate = value.split("/")
					result = { run: `20${runDate[2]}-${runDate[0]}-${runDate[1]}` }
					break
				case "ACCEPTANCE BRAND":
					result = { brand: value }
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
				case "FILE ID":
					result = { file: value }
					break
				case "CURRENCY CODE":
					const currency = value.split("-")[1].trim()
					result = { currency: isoly.Currency.is(currency) ? currency : undefined }
					break
				default:
					console.log("unable to parse page header:", input)
					result = {}
					break
			}
		}
		return result
	}
}
