import "jest"
import { Header } from "./Header"

describe("Header parse test", () => {
	const header1 = Header.parse([
		"1IP727010-AA                                           MASTERCARD WORLDWIDE                                       RUN DATE: 10/03/23 ",
		"                                                CLEARING CYCLE 002 - ACKNOWLEDGEMENT                              PAGE NO:         1 ",
		"                                                              2023-10-04                                                             ",
		" MEMBER ID: 00000033400                                                                                                              ",
		"                                                         NO DATA TO REPORT                                                           ",
	])
	const header2 = Header.parse([
		"                                           MASTERCARD WORLDWIDE                                       RUN DATE: 10/03/23 ",
		" ACCEPTANCE BRAND: MCC                          CLEARING CYCLE 002 - NOTIFICATION                                 PAGE NO:         1 ",
		" BUSINESS SERVICE LEVEL: MBR-TO-MBR AGREEMENT                 2023-10-04                                                             ",
		" BUSINESS SERVICE ID: 000900                                                                                                         ",
		" FILE ID: 001/231004/00000004882/02202                                                                                               ",
		" MEMBER ID: 00000033400                                                                                                              ",
	])
	it("header2", () =>
		expect(header2).toEqual({
			cycle: 2,
			date: "2023-10-04",
			file: "001/231004/00000004882/02202",
			level: "mbr-to-mbr agreement",
			brand: "MCC",
			member: 33400,
			number: 1,
			run: "2023-10-03",
			type: "notification",
		}))
})
