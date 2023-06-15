import algosdk from 'algosdk'
import { TextEncoder, TextDecoder } from 'util'
import { sha512_256 } from 'js-sha512'
import {
	b64ToUint6,
	base64DecToArr,
	uint6ToB64,
	base64EncArr,
	UTF8ArrToStr,
	strToUTF8Arr,
} from './converters.js'

const token = ''
const server = 'https://testnet-api.algonode.cloud'
const idxServer = 'https://testnet-idx.algonode.cloud'
const port = 443
const algodClient = new algosdk.Algodv2(token, server, port)
const indexerClient = new algosdk.Indexer(token, idxServer, port)

// ;(async () => {
// 	console.log(await client.status().do())
// })().catch((e) => {
// 	console.log(e)
// })

const admin = algosdk.mnemonicToSecretKey(process.env.FIRST_MNEMONIC)
const user = algosdk.mnemonicToSecretKey(process.env.SECOND_MNEMONIC)
const enc = new TextEncoder()
const sContract = 218569998
const mContract = 218570587
const gAContract = 218571031
const gASAContract = 218571694
const mmContract = 218572062
const TT1 = 209996092,
	TT2 = 209996105,
	TT3 = 209996111,
	TT4 = 209996154,
	TT5 = 209996166
const TRUST = 210311761
const sConAddr = algosdk.getApplicationAddress(sContract)
const mConAddr = algosdk.getApplicationAddress(mContract)

const b64 = (byte) =>
	Buffer.from(new Uint8Array(Buffer.from(byte))).toString('base64')
const uint8_b64 = (byte) => new Uint8Array(b64(byte))

const toUint8Array = (string) =>
	base64DecToArr(base64EncArr(strToUTF8Arr(string)))

const ui8h = function (x) {
	return Buffer.from(x).toString('hex')
}
const base64ToUI8A = function (x) {
	return Uint8Array.from(Buffer.from(x, 'base64'))
}
const base64ify = function (x) {
	return Buffer.from(x).toString('base64')
}
const hex_to_buf = function (s) {
	return Buffer.from(s.slice(2), 'hex')
}
const buf_to_arr = function (b) {
	return new Uint8Array(b)
}
const __read =
	(this && this.__read) ||
	function (o, n) {
		var m = typeof Symbol === 'function' && o[Symbol.iterator]
		if (!m) return o
		var i = m.call(o),
			r,
			ar = [],
			e
		try {
			while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value)
		} catch (error) {
			e = { error: error }
		} finally {
			try {
				if (r && !r.done && (m = i['return'])) m.call(i)
			} finally {
				if (e) throw e.error
			}
		}
		return ar
	}
const isUint8Array = function (val) {
	var _a
	return (
		((_a = val === null || val === void 0 ? void 0 : val.constructor) ===
			null || _a === void 0
			? void 0
			: _a.name) === 'Uint8Array'
	)
}
const str_to_buf = function (s) {
	return Buffer.from(s)
}
const unk_to_buf = function (val) {
	if (typeof val === 'string') {
		return val.slice(0, 2) === '0x'
			? ['hex string', hex_to_buf(val)]
			: ['string', str_to_buf(val)]
	} else if (isUint8Array(val)) {
		return ['Uint8Array', arr_to_buf(val)]
	} else {
		return ['unknown', str_to_buf('')]
	}
}
const canonicalToBytes = function (bv) {
	const _a = __read(unk_to_buf(bv), 2),
		_ = _a[0],
		b = _a[1]
	return buf_to_arr(b)
}

const makeSignatureChecker = function (sig_) {
	const sigLen = 4
	// const sig = '_reachp_'.concat(sig_)
	const sig = sig_
	const hu = sha512_256(sig)
	const hp = hu.slice(0, sigLen * 2) // hu is hex nibbles
	const trunc = function (x) {
		return ui8h(base64ToUI8A(x).slice(0, sigLen))
	}
	const cmp = function (log) {
		return trunc(log) == hp
	}
	const buf = hex_to_buf('0x' + hp)

	return {
		hex: hp,
		ui8: buf_to_arr(buf),
		b64: base64ify(buf),
		cmp: cmp,
		sig: sig,
		hp: hp,
	}
}

// Asset info retrieval
// ;(async () => {
// 	const asset = parseInt(process.env.TRUST_ID)
// 	const assetInfo = await algodClient.getAssetByID(asset).do()
// 	console.log(assetInfo)
// })().catch((e) => {
// 	console.log(e)
// })

// Payment and Asset transfer transactions (atomic set)
// ;(async () => {
// 	console.log(`[+] Retrieving suggested transaction params`)
// 	const suggestedParams = await algodClient.getTransactionParams().do()

// 	console.log(`[+] Creating User payment transaction`)
// 	const user_PayTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
// 		from: user.addr,
// 		to: admin.addr,
// 		amount: 5e6,
// 		note: enc.encode('Payment of 5 Algo for 50 Trust Tokens'),
// 		suggestedParams,
// 	})
// 	console.log(`[+] Creating Admin asset transfer transaction`)
// 	const admin_aXferTxn =
// 		algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
// 			amount: 50 * 10 ** parseInt(process.env.TRUST_DECIMALS),
// 			assetIndex: parseInt(process.env.TRUST_ID),
// 			closeRemainderTo: undefined,
// 			from: admin.addr,
// 			note: enc.encode('Transfer of 50 Trust Tokens for 5 Algo'),
// 			rekeyTo: undefined,
// 			revocationTarget: undefined,
// 			to: user.addr,
// 			suggestedParams,
// 		})

// 	console.log(`[+] Grouping the transactions`)
// 	const txnArray = [user_PayTxn, admin_aXferTxn]
// 	const txnGroup = algosdk.assignGroupID(txnArray)

// 	console.log(`[+] Signing transactions`)
// 	const userSignedTxn = txnGroup[0].signTxn(user.sk)
// 	const adminSignedTxn = txnGroup[1].signTxn(admin.sk)

// 	console.log(`[+] Grouping signed transactions`)
// 	const signedTxns = [userSignedTxn, adminSignedTxn]

// 	console.log(`[+] Publishing signed transactions`)
// 	await algodClient.sendRawTransaction(signedTxns).do()
// 	await algosdk.waitForConfirmation(
// 		algodClient,
// 		user_PayTxn.txID().toString(),
// 		3
// 	)
// 	console.log(`[+] The transactions should be signed by now`)
// })().catch((e) => {
// 	console.log(e)
// })

// Account info retrieval
// ;(async () => {
// 	const accountInfo = await algodClient.accountInformation(user.addr).do()
// 	console.log(accountInfo)
// })().catch((e) => {
// 	console.log(e)
// })

// Staking
// ;(async () => {
// 	// Note ABIs for the staking contract can be found in './ABIs/stakingContract.json'
// 	// The desired functionality to be called in this block is the User_stake API function
// 	// It takes in payment of 0 Algo and 5 different ASAs and performs and some internal tasks
// 	console.log(`[+] Retrieving suggested transaction params`)
// 	const suggestedParams = await algodClient.getTransactionParams().do()

// 	const argName = makeSignatureChecker('User_stake(uint64)uint64').ui8

// 	console.log(`[+] Creating User asset transfer transaction`)
// 	const user_aXferTxn =
// 		algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
// 			amount: 1,
// 			assetIndex: TT1,
// 			from: admin.addr,
// 			note: enc.encode('Transfer of 0.000001 TT1FT'),
// 			to: sConAddr,
// 			suggestedParams,
// 		})

// 	const user_aXferTxn2 =
// 		algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
// 			amount: 0,
// 			assetIndex: TT2,
// 			from: admin.addr,
// 			note: enc.encode('Transfer of 0 TT2FT'),
// 			to: sConAddr,
// 			suggestedParams: {
// 				...suggestedParams,
// 				fee: 4000,
// 			},
// 		})

// 	const user_aXferTxn3 =
// 		algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
// 			amount: 0,
// 			assetIndex: TT3,
// 			from: admin.addr,
// 			note: enc.encode('Transfer of 0 TT3FT'),
// 			to: sConAddr,
// 			suggestedParams,
// 		})

// 	const user_aXferTxn4 =
// 		algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
// 			amount: 0,
// 			assetIndex: TT4,
// 			from: admin.addr,
// 			note: enc.encode('Transfer of 0 TT4FT'),
// 			to: sConAddr,
// 			suggestedParams,
// 		})

// 	const user_aXferTxn5 =
// 		algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
// 			amount: 0,
// 			assetIndex: TT5,
// 			from: admin.addr,
// 			note: enc.encode('Transfer of 0 TT5FT'),
// 			to: sConAddr,
// 			suggestedParams,
// 		})

// 	const user_aXferTxn6 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
// 		amount: 0,
// 		from: admin.addr,
// 		note: enc.encode('Transfer of 0 ALGO'),
// 		to: sConAddr,
// 		suggestedParams,
// 	})

// 	console.log(`[+] Creating User Stake transaction to the Staking contract`)

// 	const user_NoOptTxn = algosdk.makeApplicationNoOpTxnFromObject({
// 		appIndex: sContract,
// 		accounts: [admin.addr],
// 		appArgs: [argName, algosdk.encodeUint64(1)],
// 		boxes: [
// 			{
// 				appIndex: sContract,
// 				name: buf_to_arr(
// 					hex_to_buf(
// 						'0x00'.concat(
// 							Buffer.from(algosdk.decodeAddress(admin.addr).publicKey).toString(
// 								'hex'
// 							)
// 						)
// 					)
// 				),
// 			},
// 		],
// 		from: admin.addr,
// 		foreignAssets: [TT1, TT2, TT3, TT4, TT5],
// 		foreignApps: [218570200],
// 		note: enc.encode('Staking contract stake call of 1 TT1 token'),
// 		suggestedParams,
// 		fee: 5000,
// 	})

// 	console.log(`[+] Grouping the transactions`)
// 	const txnArray = [
// 		user_aXferTxn,
// 		user_aXferTxn2,
// 		user_aXferTxn3,
// 		user_aXferTxn4,
// 		user_aXferTxn5,
// 		user_aXferTxn6,
// 		user_NoOptTxn,
// 	]
// 	const txnGroup = algosdk.assignGroupID(txnArray)

// 	console.log(`[+] Signing transactions`)
// 	const userSignedTxn1 = txnGroup[0].signTxn(admin.sk)
// 	const userSignedTxn2 = txnGroup[1].signTxn(admin.sk)
// 	const userSignedTxn3 = txnGroup[2].signTxn(admin.sk)
// 	const userSignedTxn4 = txnGroup[3].signTxn(admin.sk)
// 	const userSignedTxn5 = txnGroup[4].signTxn(admin.sk)
// 	const userSignedTxn6 = txnGroup[5].signTxn(admin.sk)
// 	const userSignedTxn7 = txnGroup[6].signTxn(admin.sk)

// 	const signedTxns = [
// 		userSignedTxn1,
// 		userSignedTxn2,
// 		userSignedTxn3,
// 		userSignedTxn4,
// 		userSignedTxn5,
// 		userSignedTxn6,
// 		userSignedTxn7,
// 	]

// 	console.log(`[+] Publishing signed transactions`)
// 	await algodClient.sendRawTransaction(signedTxns).do()
// 	await algosdk.waitForConfirmation(
// 		algodClient,
// 		user_aXferTxn.txID().toString(),
// 		3
// 	)
// 	console.log(`[+] The transaction should be signed by now`)
// })().catch((e) => {
// 	console.log(e)
// })

// Pledging
// ;(async () => {
// 	// Note ABIs for the main contract can be found in './ABIs/mainContract.json'
// 	// The desired functionality to be called in this block is the User_pledge API function
// 	// It takes in payment of 20 Trust and 0 Algo and performs and some internal tasks
// 	console.log(`[+] Retrieving suggested transaction params`)
// 	const suggestedParams = await algodClient.getTransactionParams().do()

// 	const amount = 20 * 10 ** 3
// 	console.log(amount)
// 	console.log(`[+] Creating User asset transfer transaction`)
// 	const user_aXferTxn =
// 		algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
// 			amount,
// 			assetIndex: TRUST,
// 			from: user.addr,
// 			note: enc.encode('Transfer of 20 TRUST'),
// 			to: mConAddr,
// 			suggestedParams,
// 		})

// 	const user_aXferTxn6 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
// 		amount: 0,
// 		from: user.addr,
// 		note: enc.encode('Transfer of 0 ALGO'),
// 		to: mConAddr,
// 		suggestedParams,
// 	})

// 	const argName = makeSignatureChecker('User_pledge(uint64)uint64').ui8
// 	// const argName_ = makeSignatureChecker(
// 	// 	'_reachp_0((uint64,uint64,uint64,uint64,address))void'
// 	// ).ui8

// 	console.log(`[+] Creating User Pledge transaction to the Main contract`)
// 	console.log(`[-] Constructed arg:`, argName)

// 	const user_NoOptTxn = algosdk.makeApplicationNoOpTxnFromObject({
// 		appIndex: mContract,
// 		accounts: [user.addr],
// 		appArgs: [argName, algosdk.encodeUint64(amount)],
// 		boxes: [
// 			{
// 				appIndex: mContract,
// 				name: buf_to_arr(
// 					hex_to_buf(
// 						'0x00'.concat(
// 							Buffer.from(algosdk.decodeAddress(user.addr).publicKey).toString(
// 								'hex'
// 							)
// 						)
// 					)
// 				),
// 			},
// 			{
// 				appIndex: mContract,
// 				name: buf_to_arr(
// 					hex_to_buf(
// 						'0x00'.concat(
// 							Buffer.from(algosdk.decodeAddress(user.addr).publicKey).toString(
// 								'hex'
// 							)
// 						)
// 					)
// 				),
// 			},
// 		],
// 		from: user.addr,
// 		foreignAssets: [TRUST],
// 		foreignApps: [sContract],
// 		note: enc.encode('Main contract pledge call of 20 TRUST'),
// 		suggestedParams,
// 	})

// 	console.log(`[+] Grouping the transactions`)
// 	const txnArray = [user_aXferTxn, user_aXferTxn6, user_NoOptTxn]
// 	const txnGroup = algosdk.assignGroupID(txnArray)

// 	console.log(`[+] Signing transactions`)
// 	const userSignedTxn1 = txnGroup[0].signTxn(user.sk)
// 	const userSignedTxn2 = txnGroup[1].signTxn(user.sk)
// 	const userSignedTxn3 = txnGroup[2].signTxn(user.sk)

// 	const signedTxns = [userSignedTxn1, userSignedTxn2, userSignedTxn3]

// 	console.log(`[+] Publishing signed transactions`)
// 	await algodClient.sendRawTransaction(signedTxns).do()
// 	await algosdk.waitForConfirmation(
// 		algodClient,
// 		user_aXferTxn.txID().toString(),
// 		4
// 	)
// 	console.log(`[+] The transaction should be signed by now`)
// })().catch((e) => {
// 	console.log(e)
// })

// Attempt at OptIn
// ;(async () => {
// 	const suggestedParams = await algodClient.getTransactionParams().do()
// 	const argName = makeSignatureChecker('_reachp_1((uint64))void').ui8

// 	console.log(`[+] Creating Main contract OptIn call`)
// 	const user_OptInTxn = algosdk.makeApplicationOptInTxnFromObject({
// 		appIndex: mContract,
// 		appArgs: [argName, algosdk.encodeUint64(mContract)],
// 		foreignApps: [sContract],
// 		foreignAssets: [TRUST],
// 		boxes: [
// 			{
// 				appIndex: mContract,
// 				name: buf_to_arr(
// 					hex_to_buf(
// 						'0x00'.concat(
// 							Buffer.from(algosdk.decodeAddress(user.addr).publicKey).toString(
// 								'hex'
// 							)
// 						)
// 					)
// 				),
// 			},
// 		],
// 		from: user.addr,
// 		note: enc.encode('Main contract OptIn call'),
// 		suggestedParams,
// 	})

// 	const signedTxn = user_OptInTxn.signTxn(user.sk)

// 	console.log(`[+] Publishing signed transaction`)
// 	await algodClient.sendRawTransaction(signedTxn).do()
// 	await algosdk.waitForConfirmation(algodClient, signedTxn.txID().toString(), 4)
// 	console.log(`[+] The transaction should be signed by now`)
// })()

// Box name retrieval
// ;(async () => {
// 	const accountInfo = await algodClient.accountInformation(user.addr).do()
// 	const appInfo = await algodClient.getApplicationByID(sContract).do()
// 	// const appAddr = await algosdk.logic.getApplicationAddress(
// 	// 	sContract
// 	// )
// 	// console.log(appInfo,appAddr)
// })().catch((e) => {
// 	console.log(e)
// })

// ;(async () => {
// 	const res = await algodClient.getApplicationBoxes(sContract).do()
// 	const textDecoder = new TextDecoder()
// 	const boxes = res.boxes.map((box) => textDecoder.decode(box.name))
// 	const names = boxes.map((box) => UTF8ArrToStr(base64DecToArr(box)))
// 	console.log(boxes)
// 	console.log(names)
// })()

// console.log(user.addr)

// console.log(
// 	Buffer.from(
// 		'0x00833f65b8afc5ba1facaabd6ebef05b360242d9596fe6b146c77dafd58d357ff0'
// 	).toString('base64')
// )

// console.log(
// 	Buffer.from([0, algosdk.decodeAddress(user.addr).publicKey]).toString('hex')
// )

// console.log(
// 	Buffer.from(algosdk.decodeAddress(user.addr).publicKey).toString('hex')
// )

// console.log(
// 	Buffer.from(
// 		(algosdk.decodeAddress(user.addr)).publicKey
// 	).toString('base64')
// )

// console.log(Buffer.from('10db3288', 'hex').toString('base64'))
