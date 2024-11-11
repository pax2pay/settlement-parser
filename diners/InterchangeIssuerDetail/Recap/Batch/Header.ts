import { isly } from "isly"
import { BaseRecord } from "../../BaseRecord"

export interface Header extends BaseRecord {
	recordType: string
	recapNumber: string
	batchNumber: string
}

export namespace Header {
	export function quickCheck(record: BaseRecord): record is Header {
		return record.recordType == "04"
	}
	export const type = isly.object<Header>({
		recordType: isly.string("04"),
		recapNumber: isly.string(/^\d{3}$/),
		batchNumber: isly.string(/^\d{3}$/),
	})
	export function parse(data: string): Header | isly.Flaw {
		let result: Header | isly.Flaw
		if (data.length !== 1024)
			result = isly.string(/^.{1024}$/).flaw(data)
		else {
			const parsed = {
				recordType: data.slice(0, 2).trim(),
				recapNumber: data.slice(2, 5).trim(),
				batchNumber: data.slice(5, 8).trim(),
			}
			result = type.get(parsed) ?? type.flaw(parsed)
		}
		return result
	}
}
