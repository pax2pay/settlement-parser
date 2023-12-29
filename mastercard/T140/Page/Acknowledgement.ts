import { isoly } from "isoly"
import { isly } from "isly"
import { Cycle } from "../Cycle"
import { Raw } from "./Raw"

export interface Acknowledgement {
	class: "acknowledgement"
	date: isoly.Date
	run: isoly.Date
	cycle: Cycle
	member: number
}
export namespace Acknowledgement {
	const required = isly.object<Omit<Acknowledgement, "class">>({
		date: isly.fromIs("Date", isoly.Date.is),
		run: isly.fromIs("isoly.DateTime", isoly.Date.is),
		cycle: Cycle.type,
		member: isly.number(),
	})
	export function parse(data: Raw): Acknowledgement | undefined {
		let headers: Omit<Acknowledgement, "class"> | undefined
		return data.body.length
			? undefined
			: (headers = required.get(data.header)) && { class: "acknowledgement", ...headers }
	}
}
