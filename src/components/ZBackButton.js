import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import styles from './../styles/main';
import Icon from 'react-native-vector-icons/MaterialIcons';
const bstyles = StyleSheet.create({
  zbackbutton: {
    width: 34,
    height: 34,
    backgroundColor: "#B67FFA",
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default function ZBackButton({style={}, onClick}){
	return (
	<TouchableOpacity onPress={onClick} style={{...style,...bstyles.zbackbutton}}>
		<Icon color="black" name="arrow-left" size={24}>
		</Icon>
	</TouchableOpacity>
	);
}