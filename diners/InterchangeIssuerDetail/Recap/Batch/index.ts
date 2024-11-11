import { Charge as BatchCharge } from "./Charge"
import { Header as BatchHeader } from "./Header"
import { Trailer as BatchTrailer } from "./Trailer"

export interface Batch {
	header: BatchHeader
	charges: BatchCharge[]
	trailer: BatchTrailer
}

export namespace Batch {
	export import Charge = BatchCharge
	export import Header = BatchHeader
	export import Trailer = BatchTrailer
	export type Records = BatchHeader | BatchCharge | BatchTrailer
	export function append(
		record: Records,
		batch: Partial<Batch> & { errors?: Records[] } = {}
	): Partial<Batch> & { errors?: Records[] } {
		if (Header.quickCheck(record))
			batch.header ? (batch.errors ??= []).push(record) : (batch.header = record)
		else if (Charge.quickCheck(record))
			(batch.charges ??= []).push(record)
		else if (Trailer.quickCheck(record))
			batch.trailer ? (batch.errors ??= []).push(record) : (batch.trailer = record)
		return batch
	}
	export function validate(batch: Partial<Batch>): batch is Batch {
		return (
			batch.header != undefined && batch.trailer != undefined && batch.charges != undefined && batch.charges.length > 0
		)
	}
}
