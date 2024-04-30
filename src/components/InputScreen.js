import React from 'react';
import {View, TextInput, Dimensions, Text} from 'react-native';
import { Button } from 'react-native-paper';

import styles from './../styles/main';

const screenWidth = Dimensions.get("window").width;
const SIZE_MIN = 40;
const SIZE_MAX = 100;
const SIZE_OFFSET = 10;
const UNIT_SIZEE_OFFSET = 2;
const SCREEN_PADDING = 100;
const UNIT_SIZE_MAX = 32;
const UNIT_SIZE_MIN = 16;
let textSize = 0;
const dp = {};
export default function InputScreen({validate, unit = "ETH", onContinue, disableContinue}){
	const [value, setValue] = React.useState("");
	const [size, setSize] = React.useState({input: SIZE_MAX, unit: UNIT_SIZE_MAX});
	let [error, setError] = React.useState("");

	const onChangeText = (val)=>{
		console.log("val::", val)
		if(!val) return setValue(val);
		if(val[val.length-1]=="." && val.length>1){
			for(let i = 0; i<val.length-1; i++) 
				if(val[i]==".") return;
			setError("Invalid input");
			return setValue(val);
		}

		if(!(/^([0-9]\d*)(\.\d+)?$/).test(val)) return;
		if(validate){
			try{
				validate(val);
				setValue(val);
				setError("");
			}catch(err){
				if(!error || val.length<value.length) setValue(val);
				error = typeof(err)=="object"?(err.message||err.errorMessage||err.error_message):err;
				setError(error);
			}
			return;
		} 
		setError("");
		setValue(val);
	}

	const onLayoutChanged = (evt)=>{
		if(textSize == value.length) return;
		textSize = value.length;
		const{width} = evt.nativeEvent.layout;
		if(width>screenWidth-SCREEN_PADDING && size.input>SIZE_MIN){
			dp[size.input] = textSize;
			size.input = size.input - SIZE_OFFSET;
			if(size.unit>UNIT_SIZE_MIN) size.unit = size.unit - UNIT_SIZEE_OFFSET;
			return setSize({...size});
		} 
		if(size.input<SIZE_MAX && dp[size.input + SIZE_OFFSET]>textSize){
			delete dp[size.input + SIZE_OFFSET];
			return setSize({input:size.input + SIZE_OFFSET, unit: size.unit + UNIT_SIZEE_OFFSET});
		} 
	}
	return (
		<View style={{...styles.center,  flexGrow:1}}>
			<View style={{alignItems: 'stretch', flexGrow:1}}>
				<View style={styles.center}>
					<TextInput
					 		onLayout={onLayoutChanged}
					        style={{alignItems: 'stretch', fontSize:size.input, fontWeight:"500", textAlignVertical:"top", color: error?'red':'black'}}
					        onChangeText={onChangeText}
					        value={value}
					        placeholder="0"
					        multiline={true}
					        keyboardType="decimal-pad"
					        caretHidden={true} 
					        numberOfLines={Object.keys(dp).length + 1}
					        selectable={false} 

					/>
					<View><Text style={{textAlign:'center', fontWeight: "500", fontSize: size.unit, opacity:0.75}}>{unit}</Text></View>
				</View>
			</View>
			<Button disabled={(!disableContinue && value && !error)?false:true} mode="contained" style={{borderRadius:5, width: (screenWidth-40)}} onPress={()=>onContinue(value)}>Continue</Button>
		</View>
	)
}