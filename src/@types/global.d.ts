declare module "react-toastify";
declare module "@reduxjs/toolkit";
declare module "react-use-websocket";
declare module "react-redux";

declare interface Window {
	connector: 			IConnector
	ethereum: 			any
	ethers: 			any
	soljsonReleases: 	any
	PR: 				any
}

declare interface RpcRequestType {
	jsonrpc: 		"2.0"
	method: 		string
	params: 		Array<any>
	id: 			string|number
}

declare interface RpcResponseType {
	jsonrpc: 		"2.0"
	id: 			string|number
	result?: 		any
	error?: 		number
}

declare interface ServerResponse {
	result?:    		any
	error?:     		number
}

declare interface AuthObject {
	email:				string
	name:				string
}

declare interface StoreObject {
	lang:				string
	cookie?:			string
	account:			AuthObject | null
	loading:			boolean
	activeSidebar:		number
}