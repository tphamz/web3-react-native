import React from 'react';
import {Text, SafeAreaView, View, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Background from './../Background';
import ZBackButton from './../ZBackButton';
import styles from './../../styles/main';
import {useAccount} from './../../services/Account';

const data = {email: '', code: ''};

const EmailScreen = ({navigation})=>{
	const [email, setEmail] = React.useState('');
	let [error, setError] = React.useState('');

	const validate = (val)=>{
		error = '';
		if((/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/).test(val)) return;
		error = 'Invalid Email Address';
		setError(error);
	}

	const onSubmit = ()=>{
		if(data.email == email && error) return;
		data.email = email;
		validate(email);
		if(error) return;
		navigation.navigate('ConfirmScreen', {email});
	}

	return(
		<View style={styles.center}>
				 <Text style={styles.zLoginLabel}>
				 	Enter email to receive a code:
			     </Text>
			     <TextInput
			        style={styles.zInput}
			        onChangeText={(val)=>setEmail(val)||validate(val)}
			        value={email}
			        onEndEditing={onSubmit}
			        placeholder="ENTER YOUR EMAIL"
			     />
		</View>
	)
}

const ConfirmScreen = ({route, navigation})=>{
	const {setupAccount} = useAccount();
	const [code, setCode] = React.useState('');
	let [error, setError] = React.useState('');

	const validate = (val)=>{
		error = '';
		if (code.length != 6 || !/^\d*$/.test(code)) error = 'Invalid Code';
		setError(error);
	}
	const onSubmit = ()=>{
		if(data.code == code && error) return;
		data.code = code;
		validate(code);
		if(error) return;
		setupAccount({email: route.params.email});
	}

	return(
		<Background>
			<SafeAreaView style={{...styles.center}}>
				<View style={{position:"relative", width:"80%"}}>
				 <ZBackButton onClick={()=>navigation.navigate('EmailScreen')} style={{position:"absolute",top:-2, zIndex:10}} />
				 <Text style={{...styles.zLoginLabel}}>
				 	Have a code? Enter here:
			     </Text>
			    </View>
			     <TextInput
			     	keyboardType="number-pad"
			        style={styles.zInput}
			        onChangeText={val=>setCode(val)||validate(val)}
			        onEndEditing={onSubmit}
			        value={code}
			        placeholder="ENTER THE CODE"
			     />
			</SafeAreaView>
		</Background>
	)
}



export default function Login(){
	const Stack = createStackNavigator();
	return (
	      <Stack.Navigator initialRouteName="EmailScreen" screenOptions={{ presentation:'transparentModal', headerShown: false,  cardStyle: {backgroundColor: 'transparent', shadowColor:'transparent'}}}>
	        <Stack.Screen name="EmailScreen" component={EmailScreen} />
	        <Stack.Screen name="ConfirmScreen" component={ConfirmScreen} />
	      </Stack.Navigator>
	);
}