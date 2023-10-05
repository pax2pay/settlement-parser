import { isly } from "isly"

export type Level = typeof Level.values[number]

export namespace Level {
	export const values = [
		"intra country",
		"inter regional",
		"intra regional",
		"sub regional",
		"mbr-to-mbr agreement",
	] as const
	export const type = isly.string<Level>([...values])
	export const is = type.is
	export function parse(data: string): Level | undefined {
		let result: Level | undefined
		switch (data) {
			case "INTRACOUNTRY":
				result = "intra country"
				break
			case "INTERREGIONAL":
				result = "inter regional"
				break
			case "INTRAREGIONAL":
				result = "intra regional"
				break
			case "SUBREGIONAL":
				result = "sub regional"
				break
			case "MBR-TO-MBR AGREEMENT":
			case "MBR-TO-MBR AGREE":
				result = "mbr-to-mbr agreement"
				break
		}
		return result
	}
}
