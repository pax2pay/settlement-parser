import { isly } from "isly"
import { BaseRecord } from "./BaseRecord"

export interface Trailer extends BaseRecord {
	recordType: "99"
	issuerDXSIIC: string
	issuerISOIIC: string
	recapCount: number
	batchCount: number
	chargeCount: number
}

export namespace Trailer {
	export function quickCheck(record: BaseRecord): record is Trailer {
		return record.recordType == "99"
	}
	export const type = isly.object<Trailer>({
		recordType: isly.string("99"),
		issuerDXSIIC: isly.string(),
		issuerISOIIC: isly.string(/^\d{11}$/),
		recapCount: isly.number(),
		batchCount: isly.number(),
		chargeCount: isly.number(),
	})
	export function parse(data: string): Trailer | isly.Flaw {
		let result: Trailer | isly.Flaw
		if (data.length !== 1024)
			result = isly.string(/^.{1024}$/).flaw(data)
		else {
			const parsed = {
				recordType: data.slice(0, 2).trim(),
				issuerDXSIIC: data.slice(2, 5).trim(),
				issuerISOIIC: data.slice(5, 16).trim(),
				recapCount: Number.parseInt(data.slice(16, 24).trim()),
				batchCount: Number.parseInt(data.slice(24, 32).trim()),
				chargeCount: Number.parseInt(data.slice(32, 40).trim()),
			}
			result = type.get(parsed) ?? type.flaw(parsed)
		}
		return result
	}
}
