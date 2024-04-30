import React from 'react';
import {View, TextInput, Dimensions, Text} from 'react-native';
import { Button } from 'react-native-paper';

import styles from './../../styles/main';

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
export function InputScreen({validate, unit = "ETH"}){
	const [value, setValue] = React.useState("");
	const [size, setSize] = React.useState({input: SIZE_MAX, unit: UNIT_SIZE_MAX});
	const [error, setError] = React.useState("");

	const onChangeText = (val)=>{
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
				if(!hasError) setValue(val);
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
		<View style={{...styles.center, position:'relative', padding: 20}}>
			<View style={{alignItems: 'stretch'}}>
				<View style={{width:100}}><Text style={{fontWeight: "700", fontSize: size.unit, position:"absolute", left: 0, top:-12, opacity:0.85}}>{unit}</Text></View>
				<TextInput
				 		onLayout={onLayoutChanged}
				        style={{alignItems: 'stretch', fontSize:size.input, fontWeight:"700", textAlignVertical:"top"}}
				        onChangeText={onChangeText}
				        value={value}
				        placeholder="0"
				        multiline={true}
				        keyboardType="decimal-pad"
				        caretHidden={true} 
				        numberOfLines={Object.keys(dp).length + 1}
				        selectable={false} 

				/>
			</View>
			<Button disabled={(value && !error)?false:true} mode="contained" style={{borderRadius:5, position:"absolute", bottom: 50, width:"80%"}}>Continue</Button>
		</View>
	)
}