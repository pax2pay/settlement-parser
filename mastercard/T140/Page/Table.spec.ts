import "jest"
import { Table } from "./Table"

describe("mastercard.T140.Table", () => {
	it("mastercard settled", () =>
		expect(
			Table.parse([
				" MASTERCARD SETTLED                                                     RECON                         FEE                            ",
				"                                                                         CURR                         CURR                           ",
				" TRANS. FUNC. PROC.CODE       IRD   COUNTS               RECON AMOUNT    CODE       TRANS FEE         CODE                           ",
				" ------------ --------------- --- -------- -------------------------- ------- ----------------------- -------                        ",
				" FIRST PRES.  PURCHASE   ORIG BB         2                    5.56 DR 826-GBP                 0.12 CR 826-GBP                        ",
				" ------------ --------------- --- -------- -------------------------- ------- ----------------------- -------                        ",
				" FIRST PRES.  TOTAL                      2                    5.56 DR 826-GBP                 0.12 CR 826-GBP                        ",
				"                                                                                                                                     ",
				" MBR-TO-MBR AGREEMENT                                                                                                                ",
				" MASTERCARD SETTLED                                                                                                                  ",
				" BUSINESS SERVICE ID SUBTOTAL            2                    5.56 DR 826-GBP                 0.12 CR 826-GBP                        ",
			])
		).toEqual({
			headers: [
				"MASTERCARD SE TRANS. FUNC.",
				"TTLED PROC.CODE",
				"IRD",
				"COUNTS",
				"RECON AMOUNT",
				"RECON CURR CODE",
				"TRANS FEE",
				"FEE CURR CODE",
			],
			content: [["FIRST PRES.", "PURCHASE   ORIG", "BB", "2", "5.56 DR", "826-GBP", "0.12 CR", "826-GBP"]],
			footers: ["FIRST PRES.", "TOTAL", "", "2", "5.56 DR", "826-GBP", "0.12 CR", "826-GBP"],
		}))
	it("mastercard settled", () =>
		expect(
			Table.parse([
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
			])
		).toEqual({
			headers: [
				"MASTERCARD SE TRANS. FUNC.",
				"TTLED PROC.CODE",
				"IRD",
				"COUNTS",
				"RECON AMOUNT",
				"RECON CURR CODE",
				"TRANS FEE",
				"FEE CURR CODE",
			],
			content: [["FIRST PRES.", "PURCHASE   ORIG", "BB", "1", "0.73 DR", "826-GBP", "0.02 CR", "826-GBP"]],
			footers: ["FIRST PRES.", "TOTAL", "", "1", "0.73 DR", "826-GBP", "0.02 CR", "826-GBP"],
		}))

	it("mastercard settled", () =>
		expect(
			Table.parse([
				" BUSINESS                                                                                                                            ",
				" SERVICE                               ORIG/                                                                                         ",
				"     ID            FILE ID             RVSL          RECON. AMOUNT                   TRANSACTION FEE                                 ",
				" -------- ---------------------------- ----        -------------------              -------------------                              ",
				" 000900   001/231221/00000004882/03402 ORIG                     0.73 DR                         0.02 CR                              ",
				"                                                                                                                                     ",
				"                             GRAND TOTAL                        0.73 DR                         0.02 CR                              ",
			])
		).toEqual({
			headers: ["BUSINESS SERVICE ID", "FILE ID", "ORIG/ RVSL", "RECON. AMOUNT", "TRANSACTION FEE"],
			content: [["000900", "001/231221/00000004882/03402", "ORIG", "0.73 DR", "0.02 CR"]],
			footers: undefined,
		}))
})
