## Interchange Issuer Detail File Records

The record length is set to 800 bytes with records of fixed length with no delimiter and must be provided in the
following order:

1. File Header Record—01
	
	The File Header record contains the issuing Institution Identification Code (IIC), the original file date and
	the original file number.

2. Settlement Recap Header Record—02
	
	The Settlement Recap Header record contains the Issuer IIC, Recap Number, Recap Currency
	Code and Recap Date. Not included on empty record file.

3. Batch Header Record—04
	
	The Batch Header record contains the Batch Number. Not included on empty record file.

4. Charge Record—06
	
	The Charge record contains the Record Sequence Number, Card Number, Charge Date, Charge Type,
	Type of Charge, Reference Number, Authorization Number, PTA, and Interchange PTF for regular
	interchange charges. Does not include Xchange data such as Chargebacks and Fees. Not included on
	empty record file.

5. Batch Trailer Record—08
	
	The Batch Trailer record contains the Batch Number, Number of Credit Items, Amount of Credit Items,
	Number of Debit Items and Amount of Debit Items. Not included on empty record file.

6. Settlement Recap Trailer Record—10
	
	The Settlement Recap Trailer record contains the Acquirer IIC, Issuer IIC, Recap Number, Reconciliation
	Counts, PTA, and Interchange PTF. Not included on empty record file.

7. Settlement Currency Summary Record - 90
	
	The Settlement Currency Summary record contains the Issuer interchange settlement amounts for each
	settlement currency.

8. File Trailer Record—99
	
	The File Trailer record signifies the end of the file and contains the Issuer IIC and reconciliation counts.

### File Header Record—01
|Field|Name|Length|Type|Contents|Position|Description|
|---|---|---|---|---|---|---|
| 1 | Record Type | 2 bytes | Alphanumeric | Mandatory | 1–2 | Constant value 01 |
| 2 | Issuer DXS IIC | 3 bytes | Alphanumeric | Mandatory | 3–5 | Issuing Institution Identification Code. DXS codes less than 3 digits in length will be followed by trailing space(s) |
| 3 | Issuer ISO IIC | 11 bytes | Numeric | Mandatory | 6-16 | Issuing Institution Identification Code (ISO IIC) |
| 4 | Version Indicator | 5 bytes | Alphanumeric | Mandatory | 17-21 | Constant value 00221 |
| 5 | Handoff Date | 8 bytes | Numeric | Conditional | 22-29 | YYYMMDD |
| 6 | Handoff File Number | 3 bytes | Numeric | Conditional | 30-32 | If no file number was provided in the original filename of the interchange submission file this field will be space filled. Right-justified and padded with leading zeros. |
| 7 | Time Stamp | 14 bytes | Numeric | Mandatory | 33-46 | YYYMMDDhhmmss (GMT) |
| 8 | Empty File Indicator | 1 byte | Alphanumeric | Conditional | 47 | Zero(0) in this field indicates an empty file for this date. If detail records exist, this field is space filled. |
| 9 | Filler | 977 bytes | Alphanumeric | Mandatory | 48-1024 | This field is space-filled |

### Settlement Recap Header Record—02
| Field | Name | Length | Type | Contents | Position | Description |
|---|---|---|---|---|---|---|
| 1 | Record Type | 2 bytes | Alphanumeric | Mandatory | 1–2 | Constant value 02 |
| 2 | Acquirer DXS IIC | 3 bytes | Alphanumeric | Mandatory | 3–5 | IIC of the interchange Participant that acquired the charge. DXS codes less than 3 digits in length will be followed by trailing space(s) |
| 3 | Acquiring ISO IIC | 11 bytes | Numeric | Mandatory | 6-16 | Acquiring Institution Identification Code (ISO IIC) |
| 4 | Issuer DXS IIC | 3 bytes | Alphanumeric | Mandatory | 17-19 | IIC of the card issuer. DXS codes less than 3 digits in length will be followed by trailing space(s) |
| 5 | Issuer ISO IIC | 11 bytes | Numeric | Mandatory | 20-30 | Receiving Institution Identification Code (ISO IIC) |
| 6 | Recap Number | 3 bytes | Numeric | Mandatory | 31-33 | A cyclic sequential identifier for each issuer allocated by the acquirer. Right justified and padded with leading zeros. Value 001–999 |
| 7 | Interchange Recap Number | 3 bytes | Numeric | Mandatory | 34-36 | A cyclic sequential identifier for each issuer allocated by Interchange. Value 001–999 |
| 8 | Currency Code | 3 bytes | Alpha | Mandatory | 37-39 | Fixed length 3 character alpha currency code conforming to the ISO 4217 Code for the Representation of Currencies and Funds |
| 9 | Recap Date | 8 bytes | Numeric | Mandatory | 40-47 | Recap creation date. A 2 digit century will be added to the date. Format: YYYYMMDD (YYYY Year (2011–9999), MM Month (01–12), DD Day (01–31)) |
| 10 | Settlement Currency Code | 3 bytes | Alpha | Conditional | 48-50 | The issuer’s settlement currency used to settle the recap with the acquirer. Fixed length 3 character alpha currency code conforming to the ISO 4217 Code for the Representation of Currencies and Funds |
| 11 | Alternate Currency | 3 bytes | Alpha | Conditional | 51-53 | Fixed length 3 character alpha currency code conforming to the ISO 4217 Code for the Representation of Currencies and Funds |
| 12 | Filler | 971 bytes | Alphanumeric | Mandatory | 54-1024 | This field is space-filled |

### Batch Header Record—04
|Field|Name|Length|Type|Contents|Position|Description|
|---|---|---|---|---|---|---|
| 1 | Record Type | 2 bytes | Alphanumeric | Mandatory | 1–2 | Constant value 04 |
| 2 | Recap Number | 3 bytes | Numeric | Mandatory | 3–5 | Identical to the Recap Number contained in the Recap Header Record enclosing this record. Right justified and padded with leading zeros. |
| 3 | Batch Number | 3 bytes | Numeric | Mandatory | 6–8 | A sequential number identifying the batch within a Regular Charge Interchange Recap. From the original Acquirer Interchange File (Field: UH.BATCH). Right justified and padded with leading zeros. Value 001–998 |
| 4 | Filler | 1016 bytes | Alphanumeric | Mandatory | 9-1024 | This field is space-filled |

### Charge Record—06
| Field | Name | Length | Type | Contents | Position | Description |
|---|---|---|---|---|---|---|
| 1 | Record Type | 2 bytes | Alphanumeric | Mandatory | 1–2 | Constant value 06 |
| 2 | Sequence Number | 3 bytes | Numeric | Mandatory | 3–5 | The sequence of the charge within the batch. From the original Acquirer Interchange File (Field: XD.SEQNO). Right justified and padded with leading zeros. |
| 3 | Card Number | 19 bytes | Numeric | Mandatory | 6–24 | Card number left justified and padded with trailing spaces. This is the same value from the issuer interchange file (Field: XD.ACCT). |
| 4 | Charge Date | 8 bytes | Numeric | Mandatory | 25–32 | The date the charge was captured by the acquirer. From the original Acquirer Interchange File (Field XD.CHGDT). Format: YYYYMMDD YYYY Year (2011–9999), MM Month (01–12), DD Day (01–31) |
| 5 | Charge Type | 3 bytes | Numeric | Mandatory | 33–35 | The type of spend associated with this charge. From the original Acquirer Interchange File (Field: XD.CHTYP). |
| 6 | Type of Charge | 2 bytes | Alpha | Mandatory | 36–37 | Indicates direction of fund movement (debit or credit) and the method of acquisition. From the original Acquirer Interchange File (Field: XD.TYPCH). |
| 7 | Reference Number | 8 bytes | Alphanumeric | Mandatory | 38–45 | A unique reference number assigned by the acquirer. Right justified and padded with leading spaces. From the original Acquirer Interchange File (Field: XD.REFNO). |
| 8 | Authorization Number | 6 bytes | Alphanumeric | Mandatory | 46–51 | A random number assigned by the authorizing processor. From the original Acquirer Interchange File (Field: XD.ANBR). |
| 9 | Program Transaction rate | 6 bytes | Financial | Mandatory | 52–57 | The PTA rate used to price the transaction. Format: Precision 5, Scale 3. |
| 10 | Interchange PTF in US$ | 6 bytes | Financial | Mandatory | 58–63 | The interchange transaction fee applied to the charge. This will be denominated in US$. Format: Precision 5, Scale 3. If a PTF is not applicable for this charge the field will contain: 00.000 |
| 11 | Gross Charge Amount | 16 bytes | Financial | Mandatory | 64–79 | Charge amount in the transaction currency of the charge. Format: Precision 15, Scale 2. From the original Acquirer Interchange File (Field: XD.CAMTR). |
| 12 | Net Charge Amount | 20 bytes | Financial | Mandatory | 80–99 | The priced net amount in the transaction currency of the charge. Format: Precision 19, Scale 6 |
| 13 | Alternate Currency Gross Amount | 20 bytes | Financial | Conditional | 100–119 | The alternate gross amount. Format: Precision 19, Scale 6. If no alternate currency has been specified in the recap this field will be space filled. |
| 14 | Alternate Currency Net Amount | 20 bytes | Financial | Conditional | 120–139 | The priced alternate net amount. Format: Precision 19, Scale 6. If no alternate currency has been specified in the recap this field will be space filled. |
| 15 | Interchange Commission in Transaction Currency | 20 bytes | Financial | Mandatory | 140–159 | The interchange commission in the transaction currency of the charge. Format: Precision 19, Scale 6 |
| 16 | Interchange Commission in Alternate Currency | 20 bytes | Financial | Conditional | 160–179 | The interchange commission in the alternate currency of the recap. Format: Precision 19, Scale 6. If no alternate currency has been specified in the recap this field will be space filled. |
| 17 | Gross Settlement Amount | 20 bytes | Financial | Mandatory | 180–199 | The gross settlement amount denominated in the settlement currency of the recap. Format: Precision 19, Scale 6 |
| 18 | Net Settlement Amount | 20 bytes | Financial | Mandatory | 200–219 | The net settlement amount denominated in the settlement currency of the recap. Format: Precision 19, Scale 6 |
| 19 | Interchange Commission Settlement Amount | 20 bytes | Financial | Mandatory | 220–239 | The commission settlement amount denominated in the settlement currency of the recap. Format: Precision 19, Scale 6 |
| 20 | Gross Settlement Amount in US$ | 20 bytes | Financial | Mandatory | 240–259 | The US$ equivalent of the Gross Settlement Amount. Format: Precision 19, Scale 6 |
| 21 | Net Settlement Amount in US$ | 20 bytes | Financial | Mandatory | 260–279 | The US$ equivalent of the Net Settlement Amount. Format: Precision 19, Scale 6 |
| 22 | Interchange Commission in US$ | 20 bytes | Financial | Mandatory | 280–299 | The US$ equivalent of the Interchange Commission in Settlement Currency. Format: Precision 19, Scale 6 |
| 23 | Interchange PTF in Settlement Currency | 20 bytes | Financial | Mandatory | 300–319 | The PTF amount denominated in the settlement currency of the recap. This will be either; the recap currency (UX.CURKY) if no alternate currency settlement is specified in the recap or the alternate currency (UY.ACRKY). Format: Precision 19, Scale 6 |
| 24 | Pricing Rule Name | 36 bytes | Alphanumeric | Conditional | 320–355 | The name of the pricing rule assigned by DCI. Pricing Rules, if any, will have been agreed with participants as part of contractual arrangements with DCI. Format: Right aligned with leading spaces |
| 25 | Pricing Rule Code | 6 bytes | Numeric | Conditional | 356–361 | The code of the pricing rule assigned by DCI. |
| 26 | Pricing Rule Serial Number | 36 bytes | Alphanumeric | Conditional | 362–397 | The unique rule serial number assigned by the Interchange Pricing system |
| 27 | Settlement Date | 8 bytes | Numeric | Mandatory | 398–405 | Date Settlement Occurred. Format: YYYYMMDD YYYY Year (2011–9999), MM Month (01–12), DD Day (01–31) |
| 28 | Electronic Commerce and Payments Indicator (ECI) | 1 byte | Alphanumeric | Conditional | 406 | Used to indicate the security characteristics of an eCommerce transaction (as submitted in Electronic Interchange field ECI). Space Filled if Protect Buy value not present. |
| 29 | CAVV | 4 bytes | Numeric | Conditional | 407–410 | Holds CAVV data. Should be space filled if ProtectBuy value not present. |
| 30 | Network Reference ID (NRID) | 15 bytes | Numeric | Conditional | 411–425 | Unique value representing specific transactions. Space filled if not provided. |
| 31 | ATM Interchange Fee in US$ | 20 bytes | Financial | Mandatory | 426–445 | Format: Precision 19, Scale 6 |
| 32 | ATM Switch Fee in US$ | 20 bytes | Financial | Mandatory | 446–465 | Format: Precision 19, Scale 6 |
| 33 | ATM Network Assessment in US$ | 20 bytes | Financial | Mandatory | 466–485 | Format: Precision 19, Scale 6 |
| 34 | ATM Network International Processing Fee in US$ | 20 bytes | Financial | Mandatory | 486–505 | Format: Precision 19, Scale 6 |
| 35 | POS International Processing Fee in US$ | 20 bytes | Financial | Mandatory | 506–525 | Format: Precision 19, Scale 6 |
| 36 | POS Authorization Fee in US$ | 20 bytes | Financial | Mandatory | 526–545 | Format: Precision 19, Scale 6 |
| 37 | POS Network Assessment in US$ | 20 bytes | Financial | Mandatory | 546–565 | Format: Precision 19, Scale 6 |
| 38 | ATM Interchange Fee in the Settlement Currency | 20 bytes | Financial | Mandatory | 566–585 | Format: Precision 19, Scale 6 |
| 39 | ATM Switch Fee in the Settlement Currency | 20 bytes | Financial | Mandatory | 586–605 | Format: Precision 19, Scale 6 |
| 40 | ATM Network Assessment in Settlement Currency | 20 bytes | Financial | Mandatory | 606–625 | Format: Precision 19, Scale 6 |
| 41 | ATM Network International Processing Fee in Settlement Currency | 20 bytes | Financial | Mandatory | 626–645 | Format: Precision 19, Scale 6 |
| 42 | POS International Processing Fee in Settlement Currency | 20 bytes | Financial | Mandatory | 646–665 | Format: Precision 19, Scale 6 |
| 43 | POS Authorization Fee in Settlement Currency | 20 bytes | Financial | Mandatory | 666–685 | Format: Precision 19, Scale 6 |
| 44 | POS Network Assessment in Settlement Currency | 20 bytes | Financial | Mandatory | 686–705 | Format: Precision 19, Scale 6 |
| 45 | Surcharge Fee | 10 bytes | Financial | Mandatory | 706–715 | Format: Precision 9, Scale 2 |
| 46 | Acquirer Geo Code | 3 bytes | Alphanumeric | Mandatory | 716–718 | Acquirer Geographic Area Code (as submitted in Electronic Interchange field AQGEO). Refer to the DCI InfoNet Data Tables. |
| 47 | Card Product Type | 1 byte | Alphanumeric | Mandatory | 719–719 | See Card Product Codes Table on DCI InfoNet Data Tables. |
| 48 | MCC Code | 4 bytes | Numeric | Conditional | 720–723 | Merchant Classification Code (as submitted in Electronic Interchange field MCCCD). Refer to the DCI InfoNet Data Tables. |
| 49 | INTES Code | 4 bytes | Numeric | Conditional | 724–727 | International Establishment Code (as submitted in Electronic Interchange field INTES). Refer to the DCI InfoNet Data Tables. |
| 50 | Merchant ID | 15 bytes | Alphanumeric | Mandatory | 728–742 | Member Establishment Number (as submitted in Electronic Interchange field SENUM). |
| 51 | Cardholder Present | 1 byte | Alphanumeric | Conditional | 743–743 | Card Holder Present Indicator (as submitted in Electronic Interchange field CHOLDP). |
| 52 | Card Present | 1 byte | Numeric | Conditional | 744–744 | Card Present Indicator obtained in Xpress Authorization (as submitted in Electronic Interchange field CARDP). |
| 53 | Capture Method | 1 byte | Alphanumeric | Conditional | 745–745 | Card Input Data Method used in Xpress Authorization (as submitted in Electronic Interchange field CPTRM). |
| 54 | Merchant Geo Code | 3 bytes | Numeric | Mandatory | 746–748 | Geographic Area Code (As submitted on Electronic Interchange field GEOCD). Refer to the DCI InfoNet Data Tables for valid Geo Codes. |
| 55 | Issuer Geo Code | 3 bytes | Numeric | Mandatory | 749–751 | Country of Issuance as recorded on DCI Cycle Range Register. Refer to DCI InfoNet Data Tables for Valid Geo Codes |
| 56 | Token Type | 1 byte | Alphanumeric | Mandatory | 752–752 | This is the same value from the Issuer Interchange File (Field: XD.VCRDD). |
| 57 | Token Number | 19 bytes | Numeric | Conditional | 753–771 | Token number/VCN left justified and padded with trailing spaces. This is the same value from the Issuer Interchange File (Field: XD.TKNID). |
| 58 | Token Requestor ID | 11 bytes | Alphanumeric | Conditional | 772–782 | For Digital Token transactions: This field identifies a value that uniquely identifies the pairing of the Payment Token Requestor with the Payment Token domain. It is assigned by the Payment Token service provider and is unique within the Token Vault. For Virtual Card Number transactions: This field contains the IIC of the VCN service provider. This is the same value from the Issuer Interchange File (Field: XD.TKRQID). |
| 59 | Token Assurance Level | 2 bytes | Alphanumeric | Conditional | 783–784 | For Digital Token transactions: This field identifies a value that allows the Payment Token Service Provider to indicate the confidence level of the Payment Token to PAN/Cardholder binding. For Virtual Card Number transactions: This field is defined by DCI. This is the same value from the Issuer Interchange File (Field: XD.TKLVL). |
| 60 | Merchant PAN | 19 bytes | Alphanumeric | Conditional | 785–803 | Merchant PAN/QR Code |
| 61 | Filler | 221 bytes | Alphanumeric | Mandatory | 804–1024 | This field is space-filled. |

### Batch Trailer Record—08
| Field | Name | Length | Type | Contents | Position | Description |
|---|---|---|---|---|---|---|
| 1 | Record Type | 2 bytes | Alphanumeric | Mandatory | 1–2 | Constant value 08 |
| 2 | Recap Number | 3 bytes | Numeric | Mandatory | 3–5 | Identical to field 2 in the Batch Header Record |
| 3 | Batch Number | 3 bytes | Numeric | Mandatory | 6–8 | Identical to field 3 in the Batch Header Record |
| 4 | Number of Charges in the Batch | 2 bytes | Numeric | Mandatory | 9–10 | A count of all Charge Records in the batch. Right justified and padded with leading zeros (0). |
| 5 | Number of Credit Charges in the Batch | 2 bytes | Numeric | Mandatory | 11–12 | A count of all credit Charge Records in the batch. Right justified and padded with leading zeros (0). From the original Acquirer Interchange File (Field: UT.BTNCR). |
| 6 | Number of Debit Charges in the Batch | 2 bytes | Numeric | Mandatory | 13–14 | A count of all debit Charge Records in the batch. Right justified and padded with leading zeros (0). From the original Acquirer Interchange File (Field: UT.BTNDR). |
| 7 | Amount of Credit Charges in the Batch | 16 bytes | Financial | Mandatory | 15–30 | The summation of all credit charge amounts (Gross Charge Amount XD.CAMTR) in the batch. Format: Precision 15, Scale 2. From the original Acquirer Interchange File (Field: UT.BTACR). |
| 8 | Amount of Debit Charges in the Batch | 16 bytes | Financial | Mandatory | 31–46 | The summation of all debit charge amounts (Gross Charge Amount XD.CAMTR) in the batch. Format: Precision 15, Scale 2. From the original Acquirer Interchange File (Field: UT.BTADR). |
| 9 | Filler | 978 bytes | Alphanumeric | Mandatory | 47-1024 | This field is space-filled. |

### Settlement Recap Trailer Record—10
| Field | Name | Length | Type | Contents | Position | Description |
|---|---|---|---|---|---|---|
| 1 | Record Type | 2 bytes | Alphanumeric | Mandatory | 1–2 | Constant value 10 |
| 2 | Acquirer DXS IIC | 3 bytes | Alphanumeric | Mandatory | 3–5 | Identical to field 2 in the Recap Header Record. DXS codes less than 3 digits in length will be followed by trailing space(s) |
| 3 | Acquirer ISO IIC | 11 bytes | Numeric | Mandatory | 6-16 | Identical to field 3 in the Recap Header Record |
| 4 | Issuer DXS IIC | 3 bytes | Alphanumeric | Mandatory | 17-19 | Identical to field 4 in the Recap Header Record. DXS codes less than 3 digits in length will be followed by trailing space(s) |
| 5 | Issuer ISO IIC | 11 bytes | Numeric | Mandatory | 20-30 | Identical to field 5 in the Recap Header Record |
| 6 | Recap Number | 3 bytes | Numeric | Mandatory | 31-33 | Identical to field 6 in the Recap Header Record |
| 7 | Currency Code | 3 bytes | Alpha | Mandatory | 34-36 | Identical to field 8 in the Recap Header Record |
| 8 | Recap Date | 8 bytes | Numeric | Mandatory | 37-44 | Identical to field 9 in the Recap Header Record |
| 9 | Settlement Currency Code | 3 bytes | Alpha | Conditional | 45-47 | Identical to field 10 in the Recap Header Record |
| 10 | Number of Batches in the Recap | 3 bytes | Numeric | Mandatory | 48-50 | A count of all Batch Header Records in the recap. Right justified and padded with leading zeros (0) |
| 11 | Number of Credit Batches in the Recap | 3 bytes | Numeric | Mandatory | 51-53 | A count of all the credit batches in the recap. Right justified and padded with leading zeros (0) |
| 12 | Number of Debit Batches in the Recap | 3 bytes | Numeric | Mandatory | 54-56 | A count of all the debit batches in the recap. Right justified and padded with leading zeros (0) |
| 13 | Recap Gross Amount in the Currency of the Transaction | 18 bytes | Financial | Mandatory | 57-74 | From the original Acquirer Interchange File (Field: UY.RCADR—UY.RCACR). This amount will match the summation of all batch Amount of Debit Charges in the Batch minus Amount of Credit Charges in the Batch in the recap. Format: Precision 17, Scale 2 |
| 14 | Recap Gross Alternate Amount denominated in the Alternate Currency | 18 bytes | Financial | Mandatory | 75-92 | From the original Acquirer Interchange File (Field: UY.AGAMT). This amount will match the summation of all charge Alternate Currency Gross Amount fields in the recap. Format: Precision 17, Scale 2 |
| 15 | Original Recap Discount Rate | 6 bytes | Financial | Mandatory | 93-98 | From the original Acquirer Interchange File (Field: UY.DRATE). Format: Precision 5, Scale 3 |
| 16 | Blended Program Transaction Rate (PTA) | 6 bytes | Financial | Mandatory | 99-104 | The PTA rate applied to the recap for settlement purposes. This is a blend of all charge PTA rates within the recap. Format: Precision 5, Scale 3 |
| 17 | Interchange PTF in US$ | 18 bytes | Financial | Mandatory | 105-122 | The sum of all charge transaction fees. This will be denominated in US$. Format: Precision 17, Scale 2 |
| 18 | Interchange PTF in Settlement Currency | 18 bytes | Financial | Mandatory | 123-140 | The PTF amount denominated in the settlement currency of the recap. This will be either; the recap currency (UX.CURKY) if no alternate currency settlement is specified in the recap or the alternate currency (UY.ACRKY). Format: Precision 17, Scale 2. If a PTF is not applicable, this field will contain 0 (zeros) |
| 19 | Priced Recap Net Amount denominated in the Currency of the Transaction | 18 bytes | Financial | Mandatory | 141-158 | Original Recap Gross amount discounted by the recap PTA. Format: Precision 17, Scale 2 |
| 20 | Priced Recap Net Alternate Amount denominated in the Alternate Currency | 18 bytes | Financial | Conditional | 159-176 | Original Recap Alternate Gross amount discounted by the recap PTA. Format: Precision 17, Scale 2. If no alternate currency then field will be space filled |
| 21 | Recap Interchange Commission in Transaction Currency | 18 bytes | Financial | Mandatory | 177-194 | The interchange commission in the transaction currency of the recap. Format: Precision 17, Scale 2 |
| 22 | Interchange Commission in Alternate Currency | 18 bytes | Financial | Conditional | 195-212 | The interchange commission in the alternate currency of the recap. Format: Precision 17, Scale 2. If no alternate currency has been specified in the recap this field will be space filled |
| 23 | Gross Settlement Amount | 18 bytes | Financial | Mandatory | 213-230 | The gross settlement amount denominated in the settlement currency of the issuer. Format: Precision 17, Scale 2 |
| 24 | Net Settlement Amount | 18 bytes | Financial | Conditional | 231-248 | The net settlement amount denominated in the settlement currency of the issuer. Format: Precision 17, Scale 2 |
| 25 | Recap Interchange Commission in Settlement Currency | 18 bytes | Financial | Mandatory | 249-266 | The commission settlement amount denominated in the settlement currency of the issuer. Format: Precision 17, Scale 2 |
| 26 | Gross Settlement Amount in US$ | 18 bytes | Financial | Mandatory | 267-284 | The US$ equivalent of the Gross Settlement Amount. Format: Precision 17, Scale 2 |
| 27 | Net Settlement Amount in US$ | 18 bytes | Financial | Mandatory | 285-302 | The US$ equivalent of the Net Settlement Amount. Format: Precision 17, Scale 2 |
| 28 | Interchange Commission in US$ | 18 bytes | Financial | Mandatory | 303-320 | The US$ equivalent of the Interchange Commission in Settlement Currency. Format: Precision 17, Scale 2 |
| 29 | Settlement Date of Recap | 8 bytes | Numeric | Mandatory | 321-328 | Date settlement was received for recap |
| 30 | Filler | 696 bytes | Alphanumeric | Mandatory | 329-1024 | This field is space-filled |

### Settlement Currency Summary Record-90
| Field | Name | Length | Type | Contents | Position | Description |
|---|---|---|---|---|---|---|
| 1 | Record Type | 2 bytes | Alphanumeric | Mandatory | 1-2 | Constant value 90 |
| 2 | Issuer DXS IIC | 3 bytes | Alphanumeric | Mandatory | 3-5 | Identical to field 2 in the File Header Record. DXS codes less than 3 digits in length will be followed by trailing space(s) |
| 3 | Issuer ISO IIC | 11 bytes | Numeric | Mandatory | 6-16 | Identical to field 3 in the Rejected Recap Header Record |
| 4 | Number of Settlement Recaps | 8 bytes | Numeric | Mandatory | 17-24 | A count of the number of settlement Recap Header records for the settlement currency. Right-justified and padded with leading zeros (0). |
| 5 | Number of Charges | 8 bytes | Numeric | Mandatory | 25-32 | A count of the number of Charge records for the settlement currency. Right-justified and padded with leading zeros (0). |
| 6 | Settlement Currency Code | 3 bytes | Alpha | Mandatory | 33-35 | Settlement currency code for the settlement amount in record 90 |
| 7 | Net Settlement Amount | 18 bytes | Numeric | Mandatory | 36-53 | Amount to be settled to the Issuer in the settlement currency. Format: Precision 17, Scale 2 |
| 8 | Gross Settlement Amount | 18 bytes | Numeric | Mandatory | 54-71 | Sum of the charge details in the settlement currency. Format: Precision 17, Scale 2 |
| 9 | Debit/Credit Indicator | 1 byte | Alpha | Conditional | 72-72 | P or R indicates whether the participant is in Payable (P) or Receivable (R) position. Space-filled when Net settlement amount is zero |
| 10 | Filler | 952 bytes | Alphanumeric | Mandatory | 73-1024 | This field is space-filled |

### File Trailer Record—99
| Field | Name | Length | Type | Contents | Position | Description |
|---|---|---|---|---|---|---|
| 1 | Record Type | 2 bytes | Alphanumeric | Mandatory | 1–2 | Constant value 99 |
| 2 | Issuer DXS IIC | 3 bytes | Alphanumeric | Mandatory | 3–5 | Identical to field 2 in the File Header Record. DXS codes less than 3 digits in length will be followed by trailing space(s) |
| 3 | Issuer ISO IIC | 11 bytes | Numeric | Mandatory | 6-16 | Identical to field 3 in the File Header Record |
| 4 | Number of Settlement Recaps | 8 bytes | Numeric | Mandatory | 17-24 | A count of the number of Settlement Recap Header records in the file. Right justified and padded with leading zeros (0). |
| 5 | Number of Batches | 8 bytes | Numeric | Mandatory | 25-32 | A count of the number of Batch Header records in the file. Right justified and padded with leading zeros (0). |
| 6 | Number of Charges | 8 bytes | Numeric | Mandatory | 33-40 | A count of the number of Charge records in the file. Right justified and padded with leading zeros (0). |
| 7 | Filler | 984 bytes | Alphanumeric | Mandatory | 41-1024 | This field is space-filled. |
