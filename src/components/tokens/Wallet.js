import React from 'react';
import{View, SafeAreaView, StyleSheet} from 'react-native';
import { Text, Card, Button, Paragraph, Title, IconButton } from 'react-native-paper';
import {useAccount} from './../../services/Account';
import styles from './../../styles/main';
import * as Animatable from 'react-native-animatable';

const walletStyle = StyleSheet.create({
	centerText: {textAlign:'center'},
	whiteText: { color: "rgba(255, 255, 255, 1)" },
	whiteText75: { color: "rgba(255, 255, 255, 0.75)" },
	whiteText50: { color: "rgba(255, 255, 255, 0.5)" },
	floatText: {position: "absolute"}

});

export default function Wallet({navigation}){
	const {wallet, account} = useAccount();
	return (
		<Animatable.View animation="fadeInDownBig" >
			<Card style={{width:'100%', top: 0, backgroundColor:'transparent', position: 'relative'}}>
			    <Card.Content>
			    	<SafeAreaView>
				      <Text variant="titleLarge" style={{...walletStyle.centerText, ...walletStyle.whiteText75, marginTop:10}}>Wallet Balance</Text>
				      <View style={{alignItems:'center', marginTop:10}}>
				      	<View>
				      		<Text variant="displayLarge" style={{...walletStyle.whiteText, alignItems:'stretch'}}>{wallet.balance}</Text>
				      		<Text variant="bodySmall" style={[walletStyle.whiteText, walletStyle.centerText]}>{wallet.env.unit}</Text>
				      	</View>
				      </View>
				    </SafeAreaView>
			    </Card.Content>
			    <View style={{flexDirection:'row', justifyContent:'space-evenly', width:'100%', marginBottom:20}}>
				      <View style={{alignItems:'center'}}>
				      	<IconButton icon="transfer" size={25} iconColor="white" mode="outlined"  onPress={() => navigation.navigate('Transfer Balance')}/>
				      	<Text variant="bodySmall" style={walletStyle.whiteText50}>Transfer balance</Text>
				      </View>

				      <View style={{alignItems:'center'}}>
				      	<IconButton icon="qrcode-scan" size={25} iconColor="white" mode="outlined"/>
				      	<Text variant="bodySmall" style={walletStyle.whiteText50}>Scan a Transaction</Text>
				      </View>
			    </View>
		  	</Card>
	  	</Animatable.View>
	  )
}