import "jest"
import { Table } from "./Table"

describe("mastercard.T140.Table", () => {
	it("parse", () =>
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
})
