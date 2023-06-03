import algosdk from 'algosdk'
import { TextEncoder, TextDecoder } from 'util'

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
const sConAddr = 'ZWIHHJE6L7XJNRQW6UY4LS4QTK2TJOGPEQNELY5AFSRPBMZKICXSAEXBLM'
const mConAddr = 'EUGG65MUYEB54V25ALHEJMLWNUALNHCRHDPQMATSPLY5VIUYXJRXEWA5WI'

const b64 = (byte) =>
	Buffer.from(new Uint8Array(Buffer.from(byte))).toString('base64')
const uint8_b64 = (byte) =>
	new Uint8Array(
		b64(byte)
	)
// ;(async () => {
// 	const asset = parseInt(process.env.TRUST_ID)
// 	const assetInfo = await algodClient.getAssetByID(asset).do()
// 	console.log(assetInfo)
// })().catch((e) => {
// 	console.log(e)
// })
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
// ;(async () => {
// 	console.log(`[+] Retrieving suggested transaction params`)
// 	const suggestedParams = await algodClient.getTransactionParams().do()

// 	console.log(`[+] Creating User Opt-in transaction to the Staking contract`)
// 	const user_OptInTxn = algosdk.makeApplicationOptInTxnFromObject({
// 		appIndex: sContract,
// 		from: user.addr,
// 		note: enc.encode('Staking contract Opt-in call'),
// 		suggestedParams,
// 	})
// 	console.log(`[+] Signing transaction`)
// 	const signedTxn = user_OptInTxn.signTxn(user.sk)
// 	console.log(`[+] Publishing signed transactions`)
// 	await algodClient.sendRawTransaction(signedTxn).do()
// 	await algosdk.waitForConfirmation(
// 		algodClient,
// 		user_OptInTxn.txID().toString(),
// 		3
// 	)
// 	console.log(`[+] The transaction should be signed by now`)
// })().catch((e) => {
// 	console.log(e)
// })
// ;(async () => {
// 	const accountInfo = await algodClient.accountInformation(user.addr).do()
// 	console.log(accountInfo)
// })().catch((e) => {
// 	console.log(e)
// })
// ;;(async () => {
// 	// Note ABIs for the staking contract can be found in './ABIs/stakingContract.json'
// 	// The desired functionality to be called in this block is the User_stake API function
// 	// It takes in payment of 0 Algo and 5 different ASAs and performs and some internal tasks
// 	console.log(`[+] Retrieving suggested transaction params`)
// 	const suggestedParams = await algodClient.getTransactionParams().do()

// 	console.log(`[+] Creating User asset transfer transaction`)
// 	const user_aXferTxn =
// 		algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
// 			amount: 1,
// 			assetIndex: TT1,
// 			from: user.addr,
// 			note: enc.encode('Transfer of 0.000001 TT1FT'),
// 			to: sConAddr,
// 			suggestedParams,
// 		})

// 	const user_aXferTxn2 =
// 		algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
// 			amount: 0,
// 			assetIndex: TT2,
// 			from: user.addr,
// 			note: enc.encode('Transfer of 0 TT2FT'),
// 			to: sConAddr,
// 			suggestedParams,
// 		})

// 	const user_aXferTxn3 =
// 		algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
// 			amount: 0,
// 			assetIndex: TT3,
// 			from: user.addr,
// 			note: enc.encode('Transfer of 0 TT3FT'),
// 			to: sConAddr,
// 			suggestedParams,
// 		})

// 	const user_aXferTxn4 =
// 		algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
// 			amount: 0,
// 			assetIndex: TT4,
// 			from: user.addr,
// 			note: enc.encode('Transfer of 0 TT4FT'),
// 			to: sConAddr,
// 			suggestedParams,
// 		})

// 	const user_aXferTxn5 =
// 		algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
// 			amount: 0,
// 			assetIndex: TT5,
// 			from: user.addr,
// 			note: enc.encode('Transfer of 0 TT5FT'),
// 			to: sConAddr,
// 			suggestedParams,
// 		})

// 	const user_aXferTxn6 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
// 		amount: 0,
// 		from: user.addr,
// 		note: enc.encode('Transfer of 0 ALGO'),
// 		to: sConAddr,
// 		suggestedParams,
// 	})

// 	console.log(`[+] Creating User Stake transaction to the Staking contract`)
// 	const user_NoOptTxn = algosdk.makeApplicationNoOpTxnFromObject({
// 		appIndex: sContract,
// 		accounts: [user.addr],
// 		appArgs: [new Uint8Array(Buffer.from('User_stake')), algosdk.encodeUint64(1)],
// 		boxes: [{ appIndex: sContract, name: enc.encode([0, user.addr]) }],
// 		from: user.addr,
// 		foreignAssets: [TT1, TT2, TT3, TT4, TT5],
// 		note: enc.encode('Staking contract stake call of 1 TT1 token'),
// 		suggestedParams,
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
// 	const userSignedTxn1 = txnGroup[0].signTxn(user.sk)
// 	const userSignedTxn2 = txnGroup[1].signTxn(user.sk)
// 	const userSignedTxn3 = txnGroup[2].signTxn(user.sk)
// 	const userSignedTxn4 = txnGroup[3].signTxn(user.sk)
// 	const userSignedTxn5 = txnGroup[4].signTxn(user.sk)
// 	const userSignedTxn6 = txnGroup[5].signTxn(user.sk)
// 	const userSignedTxn7 = txnGroup[6].signTxn(user.sk)

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
;(async () => {
	// Note ABIs for the staking contract can be found in './ABIs/stakingContract.json'
	// The desired functionality to be called in this block is the User_stake API function
	// It takes in payment of 0 Algo and 5 different ASAs and performs and some internal tasks
	console.log(`[+] Retrieving suggested transaction params`)
	const suggestedParams = await algodClient.getTransactionParams().do()

	const amount = 20 * 10 ** 3
	console.log(`[+] Creating User asset transfer transaction`)
	const user_aXferTxn =
		algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
			amount,
			assetIndex: TRUST,
			from: user.addr,
			note: enc.encode('Transfer of 20 TRUST'),
			to: mConAddr,
			suggestedParams,
		})

	const user_aXferTxn6 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
		amount: 0,
		from: user.addr,
		note: enc.encode('Transfer of 0 ALGO'),
		to: mConAddr,
		suggestedParams,
	})

	console.log(`[+] Creating User Pledge transaction to the Main contract`)
	const user_NoOptTxn = algosdk.makeApplicationNoOpTxnFromObject({
		appIndex: mContract,
		accounts: [user.addr],
		appArgs: [enc.encode('User_pledge'), algosdk.encodeUint64(amount)],
		boxes: [
			{ appIndex: mContract, name: enc.encode([0, user.addr]) },
			{ appIndex: mContract, name: enc.encode([1, user.addr]) },
		],
		from: user.addr,
		foreignAssets: [TRUST],
		note: enc.encode('Main contract pledge call of 20 TRUST'),
		suggestedParams,
	})

	console.log(`[+] Grouping the transactions`)
	const txnArray = [user_aXferTxn, user_aXferTxn6, user_NoOptTxn]
	const txnGroup = algosdk.assignGroupID(txnArray)

	console.log(`[+] Signing transactions`)
	const userSignedTxn1 = txnGroup[0].signTxn(user.sk)
	const userSignedTxn2 = txnGroup[1].signTxn(user.sk)
	const userSignedTxn3 = txnGroup[2].signTxn(user.sk)

	const signedTxns = [userSignedTxn1, userSignedTxn2, userSignedTxn3]

	console.log(`[+] Publishing signed transactions`)
	await algodClient.sendRawTransaction(signedTxns).do()
	await algosdk.waitForConfirmation(
		algodClient,
		user_aXferTxn.txID().toString(),
		3
	)
	console.log(`[+] The transaction should be signed by now`)
})().catch((e) => {
	console.log(e)
})
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

// const uint8Array = new TextEncoder().encode('someString')
// const string = new TextDecoder().decode(uint8Array)
// console.log(uint8Array, string)

// const x = new Uint8Array(33)
// ;;[
// 	0, 64, 85, 71, 245, 56, 40, 200, 13, 5, 73, 1, 182, 97, 137, 91, 248, 176,
// 	178, 214, 110, 236, 219, 144, 81, 83, 227, 211, 141, 233, 243, 9, 61,
// ].forEach((element, i) => {
// 	x[i] = element
// })

// const y = new TextDecoder('utf-8').decode(x)
// console.log(y)
