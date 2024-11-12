import { isoly } from "isoly"
import { isly } from "isly"
import { BaseRecord } from "../../BaseRecord"

export interface Charge extends BaseRecord {
	recordType: "06"
	sequenceNumber: string // within the batch
	cardNumber: string
	chargeDate: isoly.Date
	chargeType: string
	typeOfCharge: string
	referenceNumber: string
	authorizationNumber: string
	programTransactionRate: number
	interchangePTFInUSD: number
	grossChargeAmount: number
	netChargeAmount: number
	alternateCurrencyGrossAmount?: number
	alternateCurrencyNetAmount?: number
	interchangeCommissionInTransactionCurrency: number
	interchangeCommissionInAlternateCurrency?: number
	grossSettlementAmount: number
	netSettlementAmount: number
	interchangeCommissionSettlementAmount: number
	grossSettlementAmountInUSD: number
	netSettlementAmountInUSD: number
	interchangeCommissionInUSD: number
	interchangePTFInSettlementCurrency: number
	pricingRuleName?: string
	pricingRuleCode?: string
	pricingRuleSerialNumber?: string
	settlementDate: isoly.Date
	eci?: string
	cavv?: string
	nrid?: string
	atmInterchangeFeeInUSD: number
	atmSwitchFeeInUSD: number
	atmNetworkAssessmentInUSD: number
	atmNetworkInternationalProcessingFeeInUSD: number
	posInternationalProcessingFeeInUSD: number
	posAuthorizationFeeInUSD: number
	posNetworkAssessmentInUSD: number
	atmInterchangeFeeInSettlementCurrency: number
	atmSwitchFeeInSettlementCurrency: number
	atmNetworkAssessmentInSettlementCurrency: number
	atmNetworkInternationalProcessingFeeInSettlementCurrency: number
	posInternationalProcessingFeeInSettlementCurrency: number
	posAuthorizationFeeInSettlementCurrency: number
	posNetworkAssessmentInSettlementCurrency: number
	surchargeFee: number
	acquirerGeoCode: string
	cardProductType: string
	mcc?: string
	intesCode?: string
	merchantID: string
	cardholderPresent?: string
	cardPresent?: string
	captureMethod?: string
	merchantGeoCode: string
	issuerGeoCode: string
	tokenType: string
	tokenNumber?: string
	tokenRequestorID?: string
	tokenAssuranceLevel?: string
	merchantPAN?: string
}

export namespace Charge {
	export function quickCheck(record: BaseRecord): record is Charge {
		return record.recordType == "06"
	}
	export const type = isly.object<Charge>({
		recordType: isly.string("06"),
		sequenceNumber: isly.string(/^\d{3}$/),
		cardNumber: isly.string(),
		chargeDate: isly.fromIs("Date", isoly.Date.is),
		chargeType: isly.string(),
		typeOfCharge: isly.string(),
		referenceNumber: isly.string(),
		authorizationNumber: isly.string(),
		programTransactionRate: isly.number(),
		interchangePTFInUSD: isly.number(),
		grossChargeAmount: isly.number(),
		netChargeAmount: isly.number(),
		alternateCurrencyGrossAmount: isly.number().optional(),
		alternateCurrencyNetAmount: isly.number().optional(),
		interchangeCommissionInTransactionCurrency: isly.number(),
		interchangeCommissionInAlternateCurrency: isly.number().optional(),
		grossSettlementAmount: isly.number(),
		netSettlementAmount: isly.number(),
		interchangeCommissionSettlementAmount: isly.number(),
		grossSettlementAmountInUSD: isly.number(),
		netSettlementAmountInUSD: isly.number(),
		interchangeCommissionInUSD: isly.number(),
		interchangePTFInSettlementCurrency: isly.number(),
		pricingRuleName: isly.string().optional(),
		pricingRuleCode: isly.string().optional(),
		pricingRuleSerialNumber: isly.string().optional(),
		settlementDate: isly.fromIs("Date", isoly.Date.is),
		eci: isly.string().optional(),
		cavv: isly.string().optional(),
		nrid: isly.string().optional(),
		atmInterchangeFeeInUSD: isly.number(),
		atmSwitchFeeInUSD: isly.number(),
		atmNetworkAssessmentInUSD: isly.number(),
		atmNetworkInternationalProcessingFeeInUSD: isly.number(),
		posInternationalProcessingFeeInUSD: isly.number(),
		posAuthorizationFeeInUSD: isly.number(),
		posNetworkAssessmentInUSD: isly.number(),
		atmInterchangeFeeInSettlementCurrency: isly.number(),
		atmSwitchFeeInSettlementCurrency: isly.number(),
		atmNetworkAssessmentInSettlementCurrency: isly.number(),
		atmNetworkInternationalProcessingFeeInSettlementCurrency: isly.number(),
		posInternationalProcessingFeeInSettlementCurrency: isly.number(),
		posAuthorizationFeeInSettlementCurrency: isly.number(),
		posNetworkAssessmentInSettlementCurrency: isly.number(),
		surchargeFee: isly.number(),
		acquirerGeoCode: isly.string(),
		cardProductType: isly.string(),
		mcc: isly.string(/^\d{4}$/).optional(),
		intesCode: isly.string(/^\d{4}$/).optional(),
		merchantID: isly.string(),
		cardholderPresent: isly.string().optional(),
		cardPresent: isly.string().optional(),
		captureMethod: isly.string().optional(),
		merchantGeoCode: isly.string(),
		issuerGeoCode: isly.string(),
		tokenType: isly.string(),
		tokenNumber: isly.string().optional(),
		tokenRequestorID: isly.string().optional(),
		tokenAssuranceLevel: isly.string().optional(),
		merchantPAN: isly.string().optional(),
	})
	export function parse(data: string): Charge | isly.Flaw {
		let result: Charge | isly.Flaw
		if (data.length !== 1024)
			result = isly.string(/^.{1024}$/).flaw(data)
		else {
			const parsed = {
				recordType: data.slice(0, 2).trim(),
				sequenceNumber: data.slice(2, 5).trim(),
				cardNumber: data.slice(5, 24).trim(),
				chargeDate: `${data.slice(24, 28)}-${data.slice(28, 30)}-${data.slice(30, 32)}`,
				chargeType: data.slice(32, 35).trim(),
				typeOfCharge: data.slice(35, 37).trim(),
				referenceNumber: data.slice(37, 45).trim(),
				authorizationNumber: data.slice(45, 51).trim(),
				programTransactionRate: Number.parseFloat(data.slice(51, 57)),
				interchangePTFInUSD: Number.parseFloat(data.slice(57, 63)),
				grossChargeAmount: Number.parseFloat(data.slice(63, 79)),
				netChargeAmount: Number.parseFloat(data.slice(79, 99)),
				...(amount => amount && { alternateCurrencyGrossAmount: amount })(
					Number.parseFloat(data.slice(99, 119)) || undefined
				),
				...(amount => amount && { alternateCurrencyNetAmount: amount })(
					Number.parseFloat(data.slice(119, 139)) || undefined
				),
				interchangeCommissionInTransactionCurrency: Number.parseFloat(data.slice(139, 159)),
				...(amount => amount && { interchangeCommissionInAlternateCurrency: amount })(
					Number.parseFloat(data.slice(159, 179)) || undefined
				),
				grossSettlementAmount: Number.parseFloat(data.slice(179, 199)),
				netSettlementAmount: Number.parseFloat(data.slice(199, 219)),
				interchangeCommissionSettlementAmount: Number.parseFloat(data.slice(219, 239)),
				grossSettlementAmountInUSD: Number.parseFloat(data.slice(239, 259)),
				netSettlementAmountInUSD: Number.parseFloat(data.slice(259, 279)),
				interchangeCommissionInUSD: Number.parseFloat(data.slice(279, 299)),
				interchangePTFInSettlementCurrency: Number.parseFloat(data.slice(299, 319)),
				...(name => name && { pricingRuleName: name })(data.slice(319, 355).trim() || undefined),
				...(code => code && { pricingRuleCode: code })(data.slice(355, 361).trim() || undefined),
				...(serial => serial && { pricingRuleSerialNumber: serial })(data.slice(361, 397).trim() || undefined),
				settlementDate: `${data.slice(397, 401)}-${data.slice(401, 403)}-${data.slice(403, 405)}`,
				...(eci => eci && { eci })(data.slice(405, 406).trim() || undefined),
				...(cavv => cavv && { cavv })(data.slice(406, 410).trim() || undefined),
				...(nrid => nrid && { nrid })(data.slice(410, 425).trim() || undefined),
				atmInterchangeFeeInUSD: Number.parseFloat(data.slice(425, 445)),
				atmSwitchFeeInUSD: Number.parseFloat(data.slice(445, 465)),
				atmNetworkAssessmentInUSD: Number.parseFloat(data.slice(465, 485)),
				atmNetworkInternationalProcessingFeeInUSD: Number.parseFloat(data.slice(485, 505)),
				posInternationalProcessingFeeInUSD: Number.parseFloat(data.slice(505, 525)),
				posAuthorizationFeeInUSD: Number.parseFloat(data.slice(525, 545)),
				posNetworkAssessmentInUSD: Number.parseFloat(data.slice(545, 565)),
				atmInterchangeFeeInSettlementCurrency: Number.parseFloat(data.slice(565, 585)),
				atmSwitchFeeInSettlementCurrency: Number.parseFloat(data.slice(585, 605)),
				atmNetworkAssessmentInSettlementCurrency: Number.parseFloat(data.slice(605, 625)),
				atmNetworkInternationalProcessingFeeInSettlementCurrency: Number.parseFloat(data.slice(625, 645)),
				posInternationalProcessingFeeInSettlementCurrency: Number.parseFloat(data.slice(645, 665)),
				posAuthorizationFeeInSettlementCurrency: Number.parseFloat(data.slice(665, 685)),
				posNetworkAssessmentInSettlementCurrency: Number.parseFloat(data.slice(685, 705)),
				surchargeFee: Number.parseFloat(data.slice(705, 715)),
				acquirerGeoCode: data.slice(715, 718).trim(),
				cardProductType: data.slice(718, 719).trim(),
				...(mcc => mcc && { mcc })(data.slice(719, 723).trim() || undefined),
				...(intesCode => intesCode && { intesCode })(data.slice(723, 727).trim() || undefined),
				merchantID: data.slice(727, 742).trim(),
				...(holder => holder && { cardholderPresent: holder })(data.slice(742, 743).trim() || undefined),
				...(cardPresent => cardPresent && { cardPresent })(data.slice(743, 744).trim() || undefined),
				...(captureMethod => captureMethod && { captureMethod })(data.slice(744, 745).trim() || undefined),
				merchantGeoCode: data.slice(745, 748).trim(),
				issuerGeoCode: data.slice(748, 751).trim(),
				tokenType: data.slice(751, 752).trim(),
				...(tokenNumber => tokenNumber && { tokenNumber })(data.slice(752, 771).trim() || undefined),
				...(id => id && { tokenRequestorID: id })(data.slice(771, 782).trim() || undefined),
				...(level => level && { tokenAssuranceLevel: level })(data.slice(782, 784).trim() || undefined),
				...(pan => pan && { merchantPAN: pan })(data.slice(784, 803).trim() || undefined),
			}
			result = type.get(parsed) ?? type.flaw(parsed)
		}
		return result
	}
}
