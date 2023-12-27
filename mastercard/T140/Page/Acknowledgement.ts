/* eslint-disable @typescript-eslint/no-non-null-assertion */ // TODO: add type checks
import { isoly } from "isoly"
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
	export function parse(data: Raw): Acknowledgement | undefined {
		{
			return !data.body.length
				? {
						class: "acknowledgement",
						date: data.header.date!,
						run: data.header.run!,
						cycle: data.header.cycle!,
						member: data.header.member!,
				  }
				: undefined
		}
	}
}
