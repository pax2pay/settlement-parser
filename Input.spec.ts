import "jest"
import { Input } from "./Input"

describe("Input", () => {
	it("readUntil \\n", () => {
		expect(Input.create("abc\ndef\n").readUntil("\n")).toEqual({ data: "abc\ndef\n", index: 0, range: [0, 3] })
	})
	it("toString", () => {
		expect(Input.create("abc\ndef\n").readUntil("\n").toString()).toEqual("abc")
	})
	it("readWhile !\\n", () => {
		expect(Input.create("abc\ndef\n").readWhile(c => c.current != "\n")).toEqual({
			data: "abc\ndef\n",
			index: 0,
			range: [0, 3],
		})
	})
})
