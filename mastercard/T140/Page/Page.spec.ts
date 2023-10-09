import "jest"
import { Page } from "."

describe("mastercard.T140.Table", () => {
	const pagetest = `1IP727010-AA                                           MASTERCARD WORLDWIDE                                       RUN DATE: 10/03/23 
                                                CLEARING CYCLE 002 - ACKNOWLEDGEMENT                              PAGE NO:         1 
                                                              2023-10-04                                                             
 MEMBER ID: 00000033400                                                                                                              
                                                         NO DATA TO REPORT                                                           
1IP727020-AA                                           MASTERCARD WORLDWIDE                                       RUN DATE: 10/03/23 
 ACCEPTANCE BRAND: MCC                          CLEARING CYCLE 002 - NOTIFICATION                                 PAGE NO:         1 
 BUSINESS SERVICE LEVEL: MBR-TO-MBR AGREEMENT                 2023-10-04                                                             
 BUSINESS SERVICE ID: 000900                                                                                                         
 FILE ID: 001/231004/00000004882/02202                                                                                               
 MEMBER ID: 00000033400                                                                                                              
                                                                                                                                     
 MASTERCARD SETTLED                                                     RECON                         FEE                            
                                                                         CURR                         CURR                           
 TRANS. FUNC. PROC.CODE       IRD   COUNTS               RECON AMOUNT    CODE       TRANS FEE         CODE                           
 ------------ --------------- --- -------- -------------------------- ------- ----------------------- -------                        
 FIRST PRES.  PURCHASE   ORIG BB         2                    5.56 DR 826-GBP                 0.12 CR 826-GBP                        
 ------------ --------------- --- -------- -------------------------- ------- ----------------------- -------                        
 FIRST PRES.  TOTAL                      2                    5.56 DR 826-GBP                 0.12 CR 826-GBP                        
                                                                                                                                     
 `
	it("Parse Page", () =>
		expect(Page.parse(pagetest)).toEqual({
			body: undefined,
			header: {
				brand: "MCC",
				cycle: 2,
				date: "2023-10-04",
				file: "001/231004/00000004882/02202",
				level: "mbr-to-mbr agreement",
				member: 33400,
				number: 1,
				runDate: "2023-10-03",
				type: "notification",
			},
			table: {
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
			},
		}))
})
