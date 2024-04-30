import React from 'react';
import {View, Dimensions} from 'react-native';
import { ActivityIndicator, Text, Button, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createAnimatableComponent} from 'react-native-animatable';
import {useAccount} from '../../services/Account';

import styles from './../../styles/main';
const screenWidth = Dimensions.get("window").width;

const AnimateIcon = createAnimatableComponent(Icon);

const state = {
	onProcess: (navigation)=>{
		console.log(navigation)
		return (
		<React.Fragment>
			<ActivityIndicator animating={true} size="large"/>
			<Text variant="titleLarge" style={{padding: 15}}>Sending Transaction</Text>
		</React.Fragment>
	)},
		
	onSuccess:(navigation)=>(
		<React.Fragment>
			<AnimateIcon animation="flipInX" color="#009000" name="check-circle" size={80} />
			<Text variant="titleLarge" style={{padding: 15}}>Done</Text>
			<Button style={{padding: 15}}  onPress={()=>navigation.navigate('Tokens')}>Back to Tokens</Button>
		</React.Fragment>
	),

	onError:(navigation, message)=>(
		<React.Fragment>
			<AnimateIcon animation="flipInX" color="#ED4337" name="alert-circle" size={80} />
			<Card style={{backgroundColor:"#ED4337", minWidth: 100, maxWidth:800, width: screenWidth-40, marginTop:15}}>
			    <Card.Content>
					<Text variant="paragragh" style={{color:"white"}}>{message}</Text>			      
			    </Card.Content>
			</Card>
			<Button style={{padding: 15}} onPress={()=>navigation.pop()}>Back</Button>
		</React.Fragment>
	)
}

export default function SubmitTransaction({navigation, route}){
	let [status, setStatus] = React.useState("onProcess");
	const [screenState, setScreenState] = React.useState(<></>);
	const [errorMessage, setErdrorMessage] = React.useState("");
	const {wallet,refresh} = useAccount();

	const sendTransaction = async()=>{
		status = "onSuccess";
		const result = await wallet.signer.sendTransaction(
			{
				from: wallet.address,
				to: route.params.to,
				value: route.params.value,
				nonce: wallet.provider.getTransactionCount(wallet.address, "latest"),
				gasLimit: route.params.gasUnit,
				gasPrice: route.params.gasPrice
			}
		).catch(err=>{
			setErrorMessage(typeof(err)=="object"?(err.message||err.errorMessage||err.error_message):err);
			status = "onError";
		})
		setStatus(status);
		if(status=="onSuccess") {wallet.setBalance(),refresh()}
	} 

	React.useEffect(()=>{
		if(status=="onProcess") sendTransaction();
		setScreenState(state[status](navigation, errorMessage));
	}, [status])
	return (
		<View style={styles.center}>
			{screenState}
		</View>
	);
}