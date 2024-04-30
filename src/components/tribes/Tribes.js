import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './../../styles/main';
import ZCarousel from './../ZCarousel';
import DATA from './mockupData.json';
import { Title, Paragraph } from 'react-native-paper';


export default function Tribes({route, navigation}){
	const cardContent = ({item, index})=>{
		return(<View style={{height: 200}}>
				<View style={{left:-5, top:-8, position:'absolute'}}>
					<Image source={{uri:item.image}} style={{cover:'contain', width: 222, height:100, borderTopLeftRadius:20, borderTopRightRadius: 20}}/>
				</View>
				<View style={{...styles.center, marginTop:80}}><Title style={{color:'white'}}>{item.name}</Title></View>
			</View>);
	}

	return (
		<View style={styles.center}>
			<View style={{position:"absolute", height:400, overflow:'visible'}}>
			<ZCarousel items={DATA} itemComponent={cardContent} itemWidth={240}/>
			</View>
		</View>
	)
}