import React from 'react';
import {View, Dimensions} from 'react-native';
import {Button, TextInput, Text} from 'react-native-paper';
import InputScreen from '../InputScreen';
import {useAccount} from '../../services/Account';
import styles from './../../styles/main';


export default function TransferBalance({navigation, route}){
	const {wallet} = useAccount();
	const [toAddress, setToAddress] = React.useState("");
	const [error, setError] = React.useState("");

	const validateAddress = (value="")=>{
		if(!(/^[A-Za-z0-9_]*$/).test(value)) return setError("Invalid address");
		if(!wallet.utils.isAddress(value))
		 	setError("Invalid address");
		else
			setError("")
		setToAddress(value);	

	}

	const onEndEditing = async ()=>{
		if(error) return;

	}

	const validateAmount = (value)=>{
		if(parseFloat(value || 0) > wallet.balance) throw new Error(`Input exceed your ${wallet.env.unit} balance!`);
	}

	return (<View style={{...styles.container, ...styles.screenPadding, paddingBottom: 100}}>
			<View >
				<Text variant="labelLarge">To</Text>
				<TextInput value={toAddress} onChangeText={validateAddress} mode="outlined" placeholder="Wallet Address" onEndEditing={onEndEditing} style={{fontSize:12}}/>
			</View>
			<InputScreen onContinue={(val)=>navigation.navigate('Review Transaction', {to:toAddress, value:val})} unit={wallet.env.unit} validate={validateAmount} disableContinue={(!toAddress||error)?true:false}/>
		</View>);
}