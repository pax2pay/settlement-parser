import { isoly } from "isoly"
import { isly } from "isly"
import { BaseRecord } from "../BaseRecord"

export interface Header extends BaseRecord {
	recordType: "02"
	acquirerDXSIIC: string
	acquiringISOIIC: string
	issuerDXSIIC: string
	issuerISOIIC: string
	recapNumber: string
	interchangeRecapNumber: string
	currency: isoly.Currency
	recapDate: isoly.Date
	settlementCurrency?: isoly.Currency
	alternateCurrency?: isoly.Currency
}

export namespace Header {
	export function quickCheck(record: BaseRecord): record is Header {
		return record.recordType == "02"
	}
	export const type = isly.object<Header>({
		recordType: isly.string("02"),
		acquirerDXSIIC: isly.string(),
		acquiringISOIIC: isly.string(/^\d{11}$/),
		issuerDXSIIC: isly.string(),
		issuerISOIIC: isly.string(/^\d{11}$/),
		recapNumber: isly.string(/^\d{3}$/),
		interchangeRecapNumber: isly.string(/^\d{3}$/),
		currency: isly.fromIs("currency", isoly.Currency.is),
		recapDate: isly.fromIs("recapDate", isoly.Date.is),
		settlementCurrency: isly.fromIs("currency", isoly.Currency.is).optional(),
		alternateCurrency: isly.fromIs("currency", isoly.Currency.is).optional(),
	})
	export function parse(data: string): Header | isly.Flaw {
		let result: Header | isly.Flaw
		if (data.length !== 1024)
			result = isly.string(/^.{1024}$/).flaw(data)
		else {
			const parsed = {
				recordType: data.slice(0, 2).trim(),
				acquirerDXSIIC: data.slice(2, 5).trim(),
				acquiringISOIIC: data.slice(5, 16).trim(),
				issuerDXSIIC: data.slice(16, 19).trim(),
				issuerISOIIC: data.slice(19, 30).trim(),
				recapNumber: data.slice(30, 33).trim(),
				interchangeRecapNumber: data.slice(33, 36).trim(),
				currency: data.slice(36, 39).trim(),
				recapDate: `${data.slice(39, 43)}-${data.slice(43, 45)}-${data.slice(45, 47)}`,
				...(currency => currency && { settlementCurrency: currency })(data.slice(47, 50).trim() || undefined),
				...(currency => currency && { alternateCurrency: currency })(data.slice(50, 53).trim() || undefined),
			}
			result = type.get(parsed) ?? type.flaw(parsed)
		}
		return result
	}
}
