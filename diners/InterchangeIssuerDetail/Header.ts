import { isoly } from "isoly"
import { isly } from "isly"
import { BaseRecord } from "./BaseRecord"

export interface Header extends BaseRecord {
	recordType: "01"
	issuerDXSIIC: string
	issuerISOIIC: string
	version: "00221"
	handoffDate?: isoly.Date
	handoffFileNumber?: string
	timeStamp: isoly.DateTime
	emptyFile: boolean
}

export namespace Header {
	export function quickCheck(record: BaseRecord): record is Header {
		return record.recordType == "01"
	}
	export const type = isly.object<Header>({
		recordType: isly.string("01"),
		issuerDXSIIC: isly.string(),
		issuerISOIIC: isly.string(/^\d{11}$/),
		version: isly.string("00221"),
		handoffDate: isly.fromIs("Date", isoly.Date.is).optional(),
		handoffFileNumber: isly.string(/^\d{3}$/).optional(),
		timeStamp: isly.fromIs("DateTime", isoly.DateTime.is),
		emptyFile: isly.boolean(),
	})
	export function parse(data: string): Header | isly.Flaw {
		let result: Header | isly.Flaw
		if (data.length !== 1024)
			result = isly.string(/^.{1024}$/).flaw(data)
		else {
			const parsed = {
				recordType: data.slice(0, 2).trim(),
				issuerDXSIIC: data.slice(2, 5).trim(),
				issuerISOIIC: data.slice(5, 16).trim(),
				version: data.slice(16, 21).trim(),
				...(date => date && { handoffDate: `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6)}` })(
					data.slice(21, 29).trim() || undefined
				),
				...(handoffFileNumber => handoffFileNumber && { handoffFileNumber })(data.slice(29, 32).trim() || undefined),
				timeStamp: `${data.slice(32, 36)}-${data.slice(36, 38)}-${data.slice(38, 40)}T${data.slice(
					40,
					42
				)}:${data.slice(42, 44)}:${data.slice(44, 46)}.000Z`,
				emptyFile: data.slice(46, 47).trim() === "0",
			}
			result = type.get(parsed) ?? type.flaw(parsed)
		}
		return result
	}
}
