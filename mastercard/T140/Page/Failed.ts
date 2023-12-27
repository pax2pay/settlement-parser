import { isly } from "isly"

export interface Failed {
	class: "failed"
	data: string
}

export namespace Failed {
	export const type = isly.object<Failed>({
		class: isly.string("failed"),
		data: isly.string(),
	})
	export const is = type.is
}
