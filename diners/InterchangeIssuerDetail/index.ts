import { isly } from "isly"
import { Header as DetailHeader } from "./Header"
import { Recap as DetailRecap } from "./Recap"
import { Trailer as DetailTrailer } from "./Trailer"

export interface InterchangeIssuerDetail {
	fileHeader: DetailHeader
	recaps: DetailRecap[]
	fileTrailer: DetailTrailer
	errors: InterchangeIssuerDetail.Block[]
}

export namespace InterchangeIssuerDetail {
	export import Recap = DetailRecap
	export import Header = DetailHeader
	export import Trailer = DetailTrailer
	export type Part = Partial<Pick<InterchangeIssuerDetail, "fileHeader" | "fileTrailer">> &
		Pick<InterchangeIssuerDetail, "errors"> & { recaps: DetailRecap.Part[] }
	export type Records = DetailRecap.Records | DetailHeader | DetailTrailer
	export namespace Records {
		export function parse(data: string): Records | isly.Flaw {
			let result: Records | isly.Flaw
			const recordType = data.slice(0, 2)
			switch (recordType) {
				case "01":
					result = DetailHeader.parse(data)
					break
				case "02":
					result = Recap.Header.parse(data)
					break
				case "04":
					result = Recap.Batch.Header.parse(data)
					break
				case "06":
					result = Recap.Batch.Charge.parse(data)
					break
				case "08":
					result = Recap.Batch.Trailer.parse(data)
					break
				case "10":
					result = Recap.Trailer.parse(data)
					break
				case "90":
					result = Recap.Summary.parse(data)
					break
				case "99":
					result = DetailTrailer.parse(data)
					break
				default:
					result = isly.string(["01", "02", "04", "06", "08", "10", "90", "99"]).flaw(recordType)
			}
			return result
		}
	}
	export interface Block {
		data: string
		position: number
		record: Records | isly.Flaw
	}
	export namespace Block {
		export function* parse(raw: string): Generator<Block> {
			let position = 0
			while (position < raw.length) {
				const blockEnd = (index => (index < 0 ? raw.length : index))(raw.indexOf("\n", position))
				const data = raw.substring(position, blockEnd)
				yield { data, position, record: Records.parse(data) }
				position = blockEnd + 1
			}
		}
	}
	export function parse(data: string): InterchangeIssuerDetail.Part {
		const result: Part = { recaps: [], errors: [] }
		for (const block of Block.parse(data)) {
			if (isly.Flaw.is(block.record))
				result.errors.push(block)
			else if (Header.quickCheck(block.record))
				result.fileHeader ? result.errors.push(block) : (result.fileHeader = block.record)
			else if (Trailer.quickCheck(block.record))
				result.fileTrailer ? result.errors.push(block) : (result.fileTrailer = block.record)
			else {
				const previous = result.recaps.length > 0 && result.recaps[result.recaps.length - 1]
				if (!previous || Recap.validate(previous)) {
					const { errors, ...recap } = Recap.append(block.record)
					errors?.forEach(error => result.errors.push({ data: block.data, position: block.position, record: error }))
					result.recaps.push(recap)
				} else {
					const { errors, ...recap } = Recap.append(block.record, previous)
					errors?.forEach(error => result.errors.push({ data: block.data, position: block.position, record: error }))
					result.recaps[result.recaps.length - 1] = recap
				}
			}
		}
		return result
	}
	export function validate(file: InterchangeIssuerDetail.Part): file is InterchangeIssuerDetail {
		return file.fileHeader !== undefined && file.fileTrailer !== undefined && file.recaps.every(Recap.validate)
	}
}
