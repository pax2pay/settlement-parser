import { isoly } from "isoly"
import { isly } from "isly"
import { BaseRecord } from "../BaseRecord"

export interface Summary extends BaseRecord {
	recordType: "90"
	issuerDXSIIC: string
	issuerISOIIC: string
	recapCount: number
	chargeCount: number
	currency: isoly.Currency
	netAmount: number
	grossAmount: number
	debitCredit?: "P" | "R"
}

export namespace Summary {
	export function quickCheck(record: BaseRecord): record is Summary {
		return record.recordType == "90"
	}
	export const type = isly.object<Summary>({
		recordType: isly.string("90"),
		issuerDXSIIC: isly.string(),
		issuerISOIIC: isly.string(/^\d{11}$/),
		recapCount: isly.number(),
		chargeCount: isly.number(),
		currency: isly.fromIs("currency", isoly.Currency.is),
		netAmount: isly.number(),
		grossAmount: isly.number(),
		debitCredit: isly.string<"P" | "R">(/^[PR]$/).optional(),
	})
	export function parse(data: string): Summary | isly.Flaw {
		let result: Summary | isly.Flaw
		if (data.length !== 1024)
			result = isly.string(/^.{1024}$/).flaw(data)
		else {
			const parsed = {
				recordType: data.slice(0, 2).trim(),
				issuerDXSIIC: data.slice(2, 5).trim(),
				issuerISOIIC: data.slice(5, 16).trim(),
				recapCount: Number.parseInt(data.slice(16, 24).trim()),
				chargeCount: Number.parseInt(data.slice(24, 32).trim()),
				currency: data.slice(32, 35).trim(),
				netAmount: Number.parseFloat(data.slice(35, 53)),
				grossAmount: Number.parseFloat(data.slice(53, 71)),
				...(debitCredit => debitCredit && { debitCredit })(data.slice(71, 72).trim() || undefined),
			}
			result = type.get(parsed) ?? type.flaw(parsed)
		}
		return result
	}
}
