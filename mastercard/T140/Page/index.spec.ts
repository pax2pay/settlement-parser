import "jest"
import { Page } from "."

describe("mastercard.T140.Page", () => {
	const pages = [
		[
			"1IP727010-AA                                           MASTERCARD WORLDWIDE                                       RUN DATE: 12/21/23 ",
			"                                                CLEARING CYCLE 003 - ACKNOWLEDGEMENT                              PAGE NO:         1 ",
			"                                                              2023-12-21                                                             ",
			" MEMBER ID: 00000033400                                                                                                              ",
			"                                                         NO DATA TO REPORT                                                           ",
		].join("\n"),
		[
			"1IP727020-AA                                           MASTERCARD WORLDWIDE                                       RUN DATE: 12/21/23 ",
			" ACCEPTANCE BRAND: MCC                          CLEARING CYCLE 003 - NOTIFICATION                                 PAGE NO:         1 ",
			" BUSINESS SERVICE LEVEL: MBR-TO-MBR AGREEMENT                 2023-12-21                                                             ",
			" BUSINESS SERVICE ID: 000900                                                                                                         ",
			" FILE ID: 001/231221/00000004882/03402                                                                                               ",
			" MEMBER ID: 00000033400                                                                                                              ",
			"                                                                                                                                     ",
			" MASTERCARD SETTLED                                                     RECON                         FEE                            ",
			"                                                                         CURR                         CURR                           ",
			" TRANS. FUNC. PROC.CODE       IRD   COUNTS               RECON AMOUNT    CODE       TRANS FEE         CODE                           ",
			" ------------ --------------- --- -------- -------------------------- ------- ----------------------- -------                        ",
			" FIRST PRES.  PURCHASE   ORIG BB         1                    0.73 DR 826-GBP                 0.02 CR 826-GBP                        ",
			" ------------ --------------- --- -------- -------------------------- ------- ----------------------- -------                        ",
			" FIRST PRES.  TOTAL                      1                    0.73 DR 826-GBP                 0.02 CR 826-GBP                        ",
			"                                                                                                                                     ",
			" MBR-TO-MBR AGREEMENT                                                                                                                ",
			" MASTERCARD SETTLED                                                                                                                  ",
			" BUSINESS SERVICE ID SUBTOTAL            1                    0.73 DR 826-GBP                 0.02 CR 826-GBP                        ",
		].join("\n"),
		[
			"1IP727020-AA                                           MASTERCARD WORLDWIDE                                       RUN DATE: 12/21/23 ",
			"                                                CLEARING CYCLE 003 - NOTIFICATION                                 PAGE NO:         1 ",
			"                                                              2023-12-21                                                             ",
			"                                                                                                                                     ",
			" ACCEPTANCE BRAND : MCC                                                                                                              ",
			" BUSINESS SERVICE LEVEL :MBR-TO-MBR AGREE                                                                                            ",
			" MEMBER ID: 00000033400                                                                                                              ",
			" CURRENCY CODE : 826-GBP                                                                                                             ",
			"                                                                                                                                     ",
			" BUSINESS                                                                                                                            ",
			" SERVICE                               ORIG/                                                                                         ",
			"     ID            FILE ID             RVSL          RECON. AMOUNT                   TRANSACTION FEE                                 ",
			" -------- ---------------------------- ----        -------------------              -------------------                              ",
			" 000900   001/231221/00000004882/03402 ORIG                     0.73 DR                         0.02 CR                              ",
			"                                                                                                                                     ",
			"                             GRAND TOTAL                        0.73 DR                         0.02 CR                              ",
			"                                                                                                                                     ",
		].join("\n"),
	]

	it("parse acknowledgement", () => expect(Page.parse(pages[0])).toMatchSnapshot())
	it("parse notification", () => expect(Page.parse(pages[1])).toMatchSnapshot())
	it("parse notification", () => expect(Page.parse(pages[2])).toMatchSnapshot())
})
