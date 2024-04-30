import React from 'react';
import {View, Text} from 'react-native';
import TransactionReview from '../TransactionReview';
import {useAccount} from './../../services/Account';

const GAS_UNIT = 21000;

export default function ReviewTransfer({navigation, route}){
	const {wallet} = useAccount();
	const transactionData =  [{name: "Transfer Balance", value: (route.params.value||0) + " " + wallet.env.unit}, {name: "To Address", value:route.params.to, type:"address"}]

	const onSubmit = ({gasUnit, gasPrice})=>{
		navigation.navigate("Submitting Transaction", {
			gasUnit: wallet.utils.hexlify(gasUnit), 
			gasPrice: wallet.utils.hexlify(parseInt(gasPrice)), 
			to: route.params.to, 
			value: wallet.parseEther(route.params.value)
		});
	}
	return (<TransactionReview transactionData={transactionData} gasUnit={GAS_UNIT} onSubmit={onSubmit} />);
}