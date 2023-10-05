import "jest"
import { Table } from "./Table"

describe("mastercard.T140.Table", () => {
	it("parse a table", () =>
		expect(
			Table.parse(
				` BUSINESS                                                                                           RECON.                           
 SERVICE               FILE ID                       FILE ID                      NET RECON          CURR.                           
    ID              TO MASTERCARD                FROM MASTERCARD                CURRENCY AMOUNT      CODE                            
 ________   ____________________________   ____________________________   _______________________   _______                          
  826001                                   001/200515/00000020520/06601               2,411.69 DR   826-GBP                          
                                                                                                                                     
  TOTAL                                                                               2,411.69 DR   826-GBP                          
                                                                                                                                     `.split(
					"\n"
				)
			)
		).toEqual({
			headers: [
				"BUSINESS SERVICE ID",
				"FILE ID TO MASTERCARD",
				"FILE ID FROM MASTERCARD",
				"NET RECON CURRENCY AMOUNT",
				"RECON. CURR. CODE",
			],
			content: [["826001", "", "001/200515/00000020520/06601", "2,411.69 DR", "826-GBP"]],
			footers: ["TOTAL", "", "", "2,411.69 DR", "826-GBP"],
		}))
	it("parse big table", () =>
		expect(
			Table.parse(
				`                                                                                                    RECON.                           
  CYCLE                FILE ID                       FILE ID                      NET RECON          CURR.                           
 ACTIVITY           TO MASTERCARD                FROM MASTERCARD                CURRENCY AMOUNT      CODE                            
 ________   ____________________________   ____________________________   _______________________   _______                          
  CYCLE 01                                 001/200515/00000020520/01101               4,338.43 DR   978-EUR                          
  CYCLE 02                                 001/200515/00000020520/02201             194,744.64 DR   978-EUR                          
  CYCLE 03                                 001/200515/00000020520/03401             127,070.84 DR   978-EUR                          
  CYCLE 04                                 001/200515/00000020520/04401               3,711.13 DR   978-EUR                          
  CYCLE 05                                 001/200515/00000020520/05601                  91.12 DR   978-EUR                          
  CYCLE 06                                 001/200515/00000020520/06601               1,794.67 DR   978-EUR                          
                                                                                                                                     
  TOTAL                                                                             331,750.83 DR   978-EUR                          `.split(
					"\n"
				)
			)
		).toEqual({
			headers: [
				"CYCLE ACTIVITY",
				"FILE ID TO MASTERCARD",
				"FILE ID FROM MASTERCARD",
				"NET RECON CURRENCY AMOUNT",
				"RECON. CURR. CODE",
			],
			content: [
				["CYCLE 01", "", "001/200515/00000020520/01101", "4,338.43 DR", "978-EUR"],
				["CYCLE 02", "", "001/200515/00000020520/02201", "194,744.64 DR", "978-EUR"],
				["CYCLE 03", "", "001/200515/00000020520/03401", "127,070.84 DR", "978-EUR"],
				["CYCLE 04", "", "001/200515/00000020520/04401", "3,711.13 DR", "978-EUR"],
				["CYCLE 05", "", "001/200515/00000020520/05601", "91.12 DR", "978-EUR"],
				["CYCLE 06", "", "001/200515/00000020520/06601", "1,794.67 DR", "978-EUR"],
			],
			footers: ["TOTAL", "", "", "331,750.83 DR", "978-EUR"],
		}))
})
