import React from "react";
import  {ImageBackground, Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height
	},
	fixed: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	},
	scrollview: {
		backgroundColor: 'transparent'
	}
});

export default function Background({children}){
	return <ImageBackground style={[styles.fixed, styles.container]} source={require('../assets/images/background.png')} >{children}</ImageBackground>
}