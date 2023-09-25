import { isly } from "isly"

export type Type = typeof Type.values[number]

export namespace Type {
	export const values = ["1IP727010-AA", "1IP727020-AA", "1IP728010-AA", "1IP142110-AA"] as const
	export const type = isly.string(values)
	export const is = type.is
}
