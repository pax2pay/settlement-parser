/* eslint-disable @typescript-eslint/no-non-null-assertion */ // TODO: add type checks
import { isoly } from "isoly"
import { Cycle } from "../Cycle"
import { Raw } from "./Raw"
import { Table } from "./Table"

export interface NotificationFile {
	class: "notification file"
	date: isoly.Date
	run: isoly.Date
	cycle: Cycle
	file: string
}

export namespace NotificationFile {
	export function parse(data: Raw): NotificationFile | undefined {
		{
			const table =
				data.body.length > 0 && data.body[0].startsWith(" MASTERCARD SETTLED")
					? Table.parse([" ".repeat(20) + data.body[0].substring(20), ...data.body.slice(1)])
					: undefined
			return (
				table && {
					class: "notification file",
					date: data.header.date!,
					run: data.header.run!,
					cycle: data.header.cycle!,
					file: data.header.file!,
				}
			)
		}
	}
}
