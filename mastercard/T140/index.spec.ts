import "jest"
import { T140 } from "./"
import * as data from "./data"

describe("T140", () => {
	it("parse single", () => expect(T140.parse(data.single)).toMatchSnapshot())
})
