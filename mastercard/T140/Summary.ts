import { isoly } from "isoly"
import { Cycle } from "./Cycle"
import { Page } from "./Page"

export interface Summary {
	file?: string
	date?: isoly.Date
	run?: isoly.Date
	cycle?: Cycle
	total?: Partial<Record<isoly.Currency, { expected: { net: number; fee: { other: number } } }>>
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
	function add(total: Summary["total"], contents: Page.NotificationSummary["content"]): Summary["total"] {
		const result: Summary["total"] = {}
		for (const content of contents) {
			result[content.currency] = {
				expected: {
					net: isoly.Currency.add(content.currency, total?.[content.currency]?.expected.net ?? 0, content.total.amount),
					fee: {
						other: isoly.Currency.subtract(
							content.currency,
							total?.[content.currency]?.expected.fee.other ?? 0,
							content.total.fee
						),
					},
				},
			}
		}
		return result
	}
}
