import { isly } from "isly"

export interface Failed {
	data: string
}

export namespace Failed {
	export const type = isly.object<Failed>({
		data: isly.string(),
	})
	export const is = type.is
}
