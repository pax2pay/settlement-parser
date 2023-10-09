import "jest"
import { Table } from "./Table"

describe("mastercard.T140.Table", () => {
	it("parse a table", () =>
		expect(
			Table.parse(
				` MASTERCARD SETTLED                                                     RECON                         FEE                            
                                                                         CURR                         CURR                           
 TRANS. FUNC. PROC.CODE       IRD   COUNTS               RECON AMOUNT    CODE       TRANS FEE         CODE                           
 ------------ --------------- --- -------- -------------------------- ------- ----------------------- -------                        
 FIRST PRES.  PURCHASE   ORIG BB         2                    5.56 DR 826-GBP                 0.12 CR 826-GBP                        
 ------------ --------------- --- -------- -------------------------- ------- ----------------------- -------                        
 FIRST PRES.  TOTAL                      2                    5.56 DR 826-GBP                 0.12 CR 826-GBP                        
                                                                                                                                     
 MBR-TO-MBR AGREEMENT                                                                                                                
 MASTERCARD SETTLED                                                                                                                  
 BUSINESS SERVICE ID SUBTOTAL            2                    5.56 DR 826-GBP                 0.12 CR 826-GBP                        
`.split("\n")
			)
		).toEqual({
			content: [["FIRST PRES.", "PURCHASE   ORIG", "BB", "2", "5.56 DR", "826-GBP", "0.12 CR", "826-GBP"]],
			footers: ["FIRST PRES.", "TOTAL", "", "2", "5.56 DR", "826-GBP", "0.12 CR", "826-GBP"],
			headers: [
				"MASTERCARD S TRANS. FUNC.",
				"ETTLED PROC.CODE",
				"IRD",
				"COUNTS",
				"RECON AMOUNT",
				"RECON CURR CODE",
				"TRANS FEE",
				"FEE CURR CODE",
			],
		}))
})
