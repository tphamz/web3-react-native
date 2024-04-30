import RN from 'react-native';

const styles =  RN.StyleSheet.create({
	container: {
		width: RN.Dimensions.get("window").width,
		height: RN.Dimensions.get("window").height - 150
	},
	screenPadding:{
		padding:20
	},
	screenTopMargin: {
		marginTop: 20
	},
	rowFlex:{
		flexDirection:'row',
		alignItems: 'center',
	},
	center:{
		flex:1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	rowCenter:{
		justifyContent: 'center',
		alignItems: 'center',
	},
	zInput:{
		width: '80%',
		maxWidth: 600,
		borderRadius: 52/2,
		height: 52,
		backgroundColor: '#FFFFFF',
		paddingLeft:20
	},
	zButton:{
		borderRadius: '50%',
		backgroundColor: '#B67FFA',
		color: '#36215D',
		shadowOffset: {width: 5, height: 5},
		shadowRadius: 48,
		shadowOpacity: 1.5,
		shadowColor: 'rgba(0, 0, 0, 0.25)'
	},
	zLoginLabel:{
		fontSize: 20,
		fontWeight: '700',
		lineHeight: 27.25,
		textAlign: 'center',
		color: '#FFFFFF',
		marginBottom: 28,
	},

	settingAvatar:{
		justifyContent: 'center',
		alignItems: 'center',
		position:'absolute', 
		top: 60, 
		zIndex:1
	},

	settingContainer:{
		minHeight: RN.Dimensions.get('window').height -60,
		marginTop:100, 
		width:RN.Dimensions.get('window').width, 
		borderRadius: 20,
		backgroundColor: "rgba(250, 250, 250, 0.8)"
	},
	settingSectionContainer:{
		marginTop: 100
	},
	settingSection:{
		margin: 5,
		backgroundColor: "#FFFFFF",
		borderRadius: 10
	},

	zCardContainer:{
		padding: 20,
		position: "relative",
		justifyContent:"center",
		alignItems: "center"
	},

	zCardContent:{
		flex: 1
	},

	transactionInput:{

	},

	stackShadow:{
	  	elevation: 20,
	  	shadowColor: "black",
	  	shadowOffset: {width: 10, height: 3},
	    shadowOpacity: 1,
	    shadowRadius: 1,

	 }

});
export default styles;