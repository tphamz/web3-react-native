import React from 'react';
import Wallet from './Wallet';
import {DeviceEventEmitter} from "react-native";

const AccountContext = React.createContext();
const DEFAULT_ETH_NETWORK = "mumbai";
let wallet = null;
const AccountProvider = ({children})=>{
	const [account, setAccount] = React.useState({email:"tanpham8933@gmail.com"});
	const [fetch,setFetch] = React.useState(false)

	const setupAccount = async ({email})=>{
		account.email = email;
		await setupWallet();
		setAccount({...account});
	}

	const setupWallet = async(network=DEFAULT_ETH_NETWORK)=>{
		wallet = new Wallet(network);
		
		await wallet.init()
	}

	const authenticated = ()=>{
		return account.email && wallet;
	}

	const refresh =()=>{
		setFetch(!fetch)
	}

	// React.useEffect(()=>{
	// 	DeviceEventEmitter.addListener("event.account.login", (evt)=>{
	// 		console.log(evt);
	// 	});
	// })

	React.useEffect(()=>{
		setupAccount(account);
	}, [fetch])

	return (
		<AccountContext.Provider value={{authenticated, account, wallet, setupAccount, setupWallet, refresh}}>
			{children}
		</AccountContext.Provider>
	);
}

const useAccount = ()=>React.useContext(AccountContext);

export{useAccount, AccountProvider};
