export type Value = number

export namespace Value {
	export function parse(data: string): Value | undefined {
		const length = data.length
		const sign = data.substring(length - 2)
		const value = Number.parseFloat(data.substring(0, length - 2))
		return (sign == "DR" || sign == "CR") && !Number.isNaN(value) ? value * (sign == "CR" ? -1 : 1) : undefined
	}
}
