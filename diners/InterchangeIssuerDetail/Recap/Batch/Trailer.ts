import { isly } from "isly"
import { BaseRecord } from "../../BaseRecord"

export interface Trailer extends BaseRecord {
	recordType: "08"
	recapNumber: string
	batchNumber: string
	chargeCount: number
	creditChargeCount: number
	debitChargeCount: number
	creditChargesSum: number
	debitChargesSum: number
}

export namespace Trailer {
	export function quickCheck(record: BaseRecord): record is Trailer {
		return record.recordType == "08"
	}
	export const type = isly.object<Trailer>({
		recordType: isly.string("08"),
		recapNumber: isly.string(),
		batchNumber: isly.string(),
		chargeCount: isly.number(),
		creditChargeCount: isly.number(),
		debitChargeCount: isly.number(),
		creditChargesSum: isly.number(),
		debitChargesSum: isly.number(),
	})
	export function parse(data: string): Trailer | isly.Flaw {
		let result: Trailer | isly.Flaw
		if (data.length !== 1024)
			result = isly.string(/^.{1024}$/).flaw(data)
		else {
			const parsed = {
				recordType: data.slice(0, 2).trim(),
				recapNumber: data.slice(2, 5).trim(),
				batchNumber: data.slice(5, 8).trim(),
				chargeCount: Number.parseInt(data.slice(8, 10).trim()),
				creditChargeCount: Number.parseInt(data.slice(10, 12).trim()),
				debitChargeCount: Number.parseInt(data.slice(12, 14).trim()),
				creditChargesSum: Number.parseFloat(data.slice(14, 30)),
				debitChargesSum: Number.parseFloat(data.slice(30, 46)),
			}
			result = type.get(parsed) ?? type.flaw(parsed)
		}
		return result
	}
}
