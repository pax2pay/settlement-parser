import { isoly } from "isoly"
import { isly } from "isly"
import { BaseRecord } from "../BaseRecord"

export interface Trailer extends BaseRecord {
	recordType: "10"
	acquirerDXSIIC: string
	acquirerISOIIC: string
	issuerDXSIIC: string
	issuerISOIIC: string
	recapNumber: string
	currency: isoly.Currency
	recapDate: isoly.Date
	settlementCurrency?: isoly.Currency
	recapBatchCount: number
	recapCreditBatchCount: number
	recapDebitBatchCount: number
	recapGrossAmountInTransactionCurrency: number
	recapGrossAmountInAlternateCurrency: number
	originalRecapDiscountRate: number
	blendedProgramTransactionRate: number
	interchangePTFInUSD: number
	interchangePTFInSettlementCurrency: number
	pricedRecapNetAmountInTransactionCurrency: number
	pricedRecapNetAmountInAlternateCurrency?: number
	recapInterchangeCommissionInTransactionCurrency: number
	interchangeCommissionInAlternateCurrency?: number
	grossSettlementAmount: number
	netSettlementAmount?: number
	recapInterchangeCommissionInSettlementCurrency: number
	grossSettlementAmountInUSD: number
	netSettlementAmountInUSD: number
	interchangeCommissionInUSD: number
	settlementDateOfRecap: isoly.Date
}

export namespace Trailer {
	export function quickCheck(record: BaseRecord): record is Trailer {
		return record.recordType == "10"
	}
	export const type = isly.object<Trailer>({
		recordType: isly.string("10"),
		acquirerDXSIIC: isly.string(),
		acquirerISOIIC: isly.string(/^\d{11}$/),
		issuerDXSIIC: isly.string(),
		issuerISOIIC: isly.string(/^\d{11}$/),
		recapNumber: isly.string(/^\d{3}$/),
		currency: isly.fromIs("currency", isoly.Currency.is),
		recapDate: isly.fromIs("Date", isoly.Date.is),
		settlementCurrency: isly.fromIs("currency", isoly.Currency.is).optional(),
		recapBatchCount: isly.number(),
		recapCreditBatchCount: isly.number(),
		recapDebitBatchCount: isly.number(),
		recapGrossAmountInTransactionCurrency: isly.number(),
		recapGrossAmountInAlternateCurrency: isly.number(),
		originalRecapDiscountRate: isly.number(),
		blendedProgramTransactionRate: isly.number(),
		interchangePTFInUSD: isly.number(),
		interchangePTFInSettlementCurrency: isly.number(),
		pricedRecapNetAmountInTransactionCurrency: isly.number(),
		pricedRecapNetAmountInAlternateCurrency: isly.number().optional(),
		recapInterchangeCommissionInTransactionCurrency: isly.number(),
		interchangeCommissionInAlternateCurrency: isly.number().optional(),
		grossSettlementAmount: isly.number(),
		netSettlementAmount: isly.number().optional(),
		recapInterchangeCommissionInSettlementCurrency: isly.number(),
		grossSettlementAmountInUSD: isly.number(),
		netSettlementAmountInUSD: isly.number(),
		interchangeCommissionInUSD: isly.number(),
		settlementDateOfRecap: isly.fromIs("Date", isoly.Date.is),
	})

	export function parse(data: string): Trailer | isly.Flaw {
		let result: Trailer | isly.Flaw
		if (data.length !== 1024)
			result = isly.string(/^.{1024}$/).flaw(data)
		else {
			const parsed = {
				recordType: data.slice(0, 2).trim(),
				acquirerDXSIIC: data.slice(2, 5).trim(),
				acquirerISOIIC: data.slice(5, 16).trim(),
				issuerDXSIIC: data.slice(16, 19).trim(),
				issuerISOIIC: data.slice(19, 30).trim(),
				recapNumber: data.slice(30, 33).trim(),
				currency: data.slice(33, 36).trim(),
				recapDate: `${data.slice(36, 40)}-${data.slice(40, 42)}-${data.slice(42, 44)}`,
				...(currency => currency && { settlementCurrency: currency })(data.slice(44, 47).trim() || undefined),
				recapBatchCount: Number.parseInt(data.slice(47, 50).trim()),
				recapCreditBatchCount: Number.parseInt(data.slice(50, 53).trim()),
				recapDebitBatchCount: Number.parseInt(data.slice(53, 56).trim()),
				recapGrossAmountInTransactionCurrency: Number.parseFloat(data.slice(56, 74).trim()),
				recapGrossAmountInAlternateCurrency: Number.parseFloat(data.slice(74, 92).trim()),
				originalRecapDiscountRate: Number.parseFloat(data.slice(92, 98).trim()),
				blendedProgramTransactionRate: Number.parseFloat(data.slice(98, 104).trim()),
				interchangePTFInUSD: Number.parseFloat(data.slice(104, 122).trim()),
				interchangePTFInSettlementCurrency: Number.parseFloat(data.slice(122, 140).trim()),
				pricedRecapNetAmountInTransactionCurrency: Number.parseFloat(data.slice(140, 158).trim()),
				...(amount => amount && { pricedRecapNetAmountInAlternateCurrency: amount })(
					Number.parseFloat(data.slice(158, 176).trim()) || undefined
				),
				recapInterchangeCommissionInTransactionCurrency: Number.parseFloat(data.slice(176, 194).trim()),
				...(amount => amount && { interchangeCommissionInAlternateCurrency: amount })(
					Number.parseFloat(data.slice(194, 212).trim()) || undefined
				),
				grossSettlementAmount: Number.parseFloat(data.slice(212, 230).trim()),
				...(amount => amount && { netSettlementAmount: amount })(
					Number.parseFloat(data.slice(230, 248).trim()) || undefined
				),
				recapInterchangeCommissionInSettlementCurrency: Number.parseFloat(data.slice(248, 266).trim()),
				grossSettlementAmountInUSD: Number.parseFloat(data.slice(266, 284).trim()),
				netSettlementAmountInUSD: Number.parseFloat(data.slice(284, 302).trim()),
				interchangeCommissionInUSD: Number.parseFloat(data.slice(302, 320).trim()),
				settlementDateOfRecap: `${data.slice(320, 324)}-${data.slice(324, 326)}-${data.slice(326, 328)}`,
			}
			result = type.get(parsed) ?? type.flaw(parsed)
		}
		return result
	}
}
