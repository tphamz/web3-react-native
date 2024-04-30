import React from 'react';
import {Text, SafeAreaView, Image, View, TextInput } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './../../styles/main';

import Tribes from './../tribes/Tribes';
import TokenPage from './../tokens/TokenPage';
import Profile from './../profile/Profile';

const screens = [
	{name: "Tribes", component: Tribes, icon: 'account-group-outline'},
	{name: "TokenPage", component: TokenPage, icon: 'hand-coin-outline'},
	{name: "Profile", component: Profile, icon: 'account-circle-outline'},
]

export default function Pages(){
	const Stack = createBottomTabNavigator();
	return (
	      <Stack.Navigator initialRouteName="Tribes" screenOptions={{
	      	tabBarShowLabel: false,
	      	detachInactiveScreens: true,
	      	tabBarStyle:{
	      		...styles.center,
	      		position: 'absolute',
	      		bottom: -100,
	      		height: 200,
	      		left: 0,
	      		opacity:0.75,
	      		elevation: 0,
	      		borderRadius: 100,

	      	}
	      }}>
	      {
	      	screens.map(
	      	(item, index)=>
	      		<Stack.Screen
	      			key={index}
	      			name={item.name} 
	      			component={item.component} 
	      			options={{
	      				headerShown:false,
	      				tabBarIcon:({focused})=>(
	      					<View style={{alignItems:'center', justifyContent:'center', flexWrap:'wrap', top: -35, width:30, height: 30}}>
	      						<Icon color={focused?"#331B50":"#6f3bb0"} name={item.icon} size={24} />
	      					</View>)
	      			}}
	      		/>)
	      }
	      </Stack.Navigator>
	);
}