import { isly } from "isly"

const values = [1, 2, 3, 4, 5, 6] as const
export type Cycle = typeof values[number]
export namespace Cycle {
	export const type = isly.number<Cycle>([...values])
	export function parse(data: string | number): Cycle | undefined {
		const result = typeof data == "string" ? Number.parseInt(data) : data
		return type.is(result) ? result : undefined
	}
}
