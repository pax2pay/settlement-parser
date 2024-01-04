import { isoly } from "isoly"
import { Cycle } from "./Cycle"
import { Page } from "./Page"

export interface Summary {
	file: string
	date: isoly.Date
	run: isoly.Date
	cycle: Cycle
	total: { amount: Partial<Record<isoly.Currency, number>>; fee: Partial<Record<isoly.Currency, number>> }
}

export namespace Summary {
	export function from(pages: Page[]): Summary | undefined {
		let result: Omit<Summary, "file"> | undefined
		let file: string | undefined
		for (const page of pages) {
			if (!Page.Failed.type.is(page)) {
				!result &&
					(result = (({ date, run, cycle }) => ({
						date,
						run,
						cycle,
						total: { amount: {}, fee: {} },
					}))(page))
				!file && "file" in page && (file = page.file)
				page.class == "notification summary" && (result.total = add(result.total, page.content))
			}
		}
		return file && result ? { ...result, file } : undefined
	}
	function add(total: Summary["total"], content: Page.NotificationSummary["content"]): Summary["total"] {
		return content.reduce(
			(r, e) => ({
				...r,
				amount: {
					...r.amount,
					[e.currency]: isoly.Currency.add(e.currency, r.amount?.[e.currency] ?? 0, e.total.amount),
				},
				fee: {
					...r.fee,
					[e.currency]: isoly.Currency.add(e.currency, r.fee[e.currency] ?? 0, -e.total.fee),
				},
			}),
			total
		)
	}
}
