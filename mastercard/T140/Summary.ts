import { isoly } from "isoly"
import { Cycle } from "./Cycle"
import { Page } from "./Page"

export interface Summary {
	file?: string
	date?: isoly.Date
	run?: isoly.Date
	cycle?: Cycle
	total?: { amount: Partial<Record<isoly.Currency, number>>; fee: Partial<Record<isoly.Currency, number>> }
}

export namespace Summary {
	export function from(pages: Page[]): Summary {
		const result: Omit<Summary, "file"> = {}
		let file: string | undefined
		for (const page of pages) {
			if (!Page.Failed.type.is(page)) {
				result.date ??= page.date
				result.run ??= page.run
				result.cycle ??= page.cycle
				!file && "file" in page && (file = page.file)
				page.class == "notification summary" && (result.total = add(result.total, page.content))
			}
		}
		return file ? { ...result, file } : result
	}
	function add(total: Summary["total"], content: Page.NotificationSummary["content"]): Summary["total"] {
		return content.reduce(
			(r, e) => ({
				...r,
				amount: {
					...r?.amount,
					[e.currency]: isoly.Currency.add(e.currency, r?.amount?.[e.currency] ?? 0, e.total.amount),
				},
				fee: {
					...r?.fee,
					[e.currency]: isoly.Currency.add(e.currency, r?.fee[e.currency] ?? 0, -e.total.fee),
				},
			}),
			total
		)
	}
}
