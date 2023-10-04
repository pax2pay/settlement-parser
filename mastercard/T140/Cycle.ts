import { isly } from "isly"

export type Cycle = typeof Cycle.values[number]

export namespace Cycle {
	export const values = [1, 2, 3, 4, 5, 6] as const
	export const type = isly.union(
		isly.number<Cycle>(1),
		isly.number<Cycle>(2),
		isly.number<Cycle>(3),
		isly.number<Cycle>(4),
		isly.number<Cycle>(5),
		isly.number<Cycle>(6)
	)
	export const is = type.is

	export function parse(data: string | number): Cycle | undefined {
		const result = typeof data == "string" ? Number.parseInt(data) : data
		return is(result) ? result : undefined
	}
}
