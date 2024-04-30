import {DeviceEventEmitter} from "react-native";
import '@ethersproject/shims/dist/index.js';
import {ethers} from "ethers";
import {envs} from "./wallet.config";
import TOKEN from "../contracts/ERCToken.json";
import {WalletSchema, DB} from "./db/db.config";

export default class Wallet{
	constructor(env){
		if(!envs[env]) DeviceEventEmitter.emit("event.wallet.error", "Network is not supported");
		else
			this.provider = new ethers.providers.JsonRpcProvider(envs[env].rpc_endpoint);
		this.env = envs[env] || {};
		this.utils = ethers.utils;
	}

	async init(){
		if(!this.provider) return this.signer = {}; 
		this.db = new DB(WalletSchema);
		await this.db.init();
		let data = await this.db.get();
		if(!data || !data.length){
			const account = ethers.Wallet.createRandom();
			await this.db.create({address: account.address, mnemonic: account.mnemonic.phrase, privateKey: account.privateKey});
			data = account;
		}else
			data = data[0];
		this.signer = new ethers.Wallet(data.privateKey, this.provider);
		this.address = this.signer.address;
		console.log(this.address);
		await this.setBalance();
	}

	async setBalance(){
		this.balance = this.formatEther(await this.provider.getBalance(this.address).catch(err=>{
		    console.log(err);
		    return 0;
		}));
		this.balance = Number.parseFloat(this.balance).toFixed(4);
	}

	tokenTransaction(address){
		return new ethers.Contract(
			address,
			TOKEN.abi,
			this.provider
		);
	}

	parseEther(val){
		return ethers.utils.parseEther((val||0).toString()).toString();
	}

	formatEther(val){
		return ethers.utils.formatEther(val);
	}

}