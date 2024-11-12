import { isoly } from "isoly"
import { Batch as RecapBatch } from "./Batch"
import { Header as RecapHeader } from "./Header"
import { Summary as RecapSummary } from "./Summary"
import { Trailer as RecapTrailer } from "./Trailer"

export interface Recap {
	header: RecapHeader
	batches: RecapBatch[]
	trailer: RecapTrailer
	summary?: Partial<Record<isoly.Currency, RecapSummary>>
}

export namespace Recap {
	export import Summary = RecapSummary
	export import Header = RecapHeader
	export import Trailer = RecapTrailer
	export import Batch = RecapBatch
	export type Records = RecapHeader | RecapBatch.Records | RecapTrailer | RecapSummary
	export type Part = Partial<Omit<Recap, "batches"> & { batches: Partial<RecapBatch>[] }> & { errors?: Records[] }
	export function append(record: Records, recap: Part = {}): Part {
		if (Header.quickCheck(record))
			recap.header ? (recap.errors ??= []).push(record) : (recap.header = record)
		else if (Trailer.quickCheck(record))
			recap.trailer ? (recap.errors ??= []).push(record) : (recap.trailer = record)
		else if (Summary.quickCheck(record))
			recap.summary && record.currency in recap.summary
				? (recap.errors ??= []).push(record)
				: (recap.summary = {
						...recap.summary,
						[record.currency]: record,
				  })
		else {
			recap.batches ??= []
			const previous = recap.batches.length > 0 && recap.batches[recap.batches.length - 1]
			if (!previous || Batch.validate(previous)) {
				const { errors, ...batch } = Batch.append(record)
				errors?.forEach(error => (recap.errors ??= []).push(error))
				recap.batches.push(batch)
			} else {
				const { errors, ...batch } = Batch.append(record, previous)
				errors?.forEach(error => (recap.errors ??= []).push(error))
				recap.batches[recap.batches.length - 1] = batch
			}
		}
		return recap
	}
	export function validate(recap: Part): recap is Recap {
		return (
			recap.header != undefined &&
			recap.trailer != undefined &&
			(recap.summary == undefined || Object.keys(recap.summary).length > 0) &&
			recap.batches != undefined &&
			recap.batches.length > 0 &&
			recap.batches.every(Batch.validate)
		)
	}
}
