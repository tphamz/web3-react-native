import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Tokens from './Tokens';
import ReviewTransfer from './ReviewTransfer';
import TransferBalance from './TransferBalance';
import SubmitTransaction from './SubmitTransaction';

const RootStack = createStackNavigator();

export default function TokenPage(){
	return(
		<RootStack.Navigator initialRouteName="Tokens" screenOptions={{ headerBackTitleVisible: false}}>
	        <RootStack.Group>
	          <RootStack.Screen name="Tokens" component={Tokens} options={{ headerShown: false}} />
	        </RootStack.Group>

	       <RootStack.Group screenOptions={{cardStyle:{backgroundColor:'white'} }}>
	          <RootStack.Screen name="Transfer Balance" component={TransferBalance} />
	       		<RootStack.Screen name="Review Transaction" component={ReviewTransfer} />
	          	<RootStack.Screen name="Submitting Transaction" component={SubmitTransaction} screenOptions={{ headerBackTitleVisible: false}} />
	       	</RootStack.Group> 
	    </RootStack.Navigator>

	)
}

