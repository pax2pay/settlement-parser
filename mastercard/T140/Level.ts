export type Level = typeof Level.values[number]

export namespace Level {
	export const values = ["intra country", "inter regional", "intra regional", "sub regional"] as const
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
		}
		return result
	}
}
