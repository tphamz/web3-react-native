import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './../../styles/main';
import ZCarousel from './../ZCarousel';
import { Title, Paragraph } from 'react-native-paper';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import * as Animatable from 'react-native-animatable';

import {useAccount} from '../../services/Account';
import DATA from './../tribes/mockupData.json';
import Wallet from './Wallet';

export default function Tokens({route, navigation}){
	const {wallet} = useAccount();
	let [data, setData] = React.useState([{loading:true}, {loading:true}, {loading:true}]);

	const displaySkeleton = ()=>(
		<View style={{height:250}}>
			<SkeletonPlaceholder height={300} highlightColor={"#333333"} backgroundColor={"#121212"}>
		      <SkeletonPlaceholder.Item flexDirection="row" justifyContent="center">
		        <SkeletonPlaceholder.Item width={100} height={100} borderRadius={50}/>
		      </SkeletonPlaceholder.Item >
		      
		      <SkeletonPlaceholder.Item flexDirection="row" justifyContent="center" marginTop={10}>
			          <SkeletonPlaceholder.Item width={80} height={20} />
		      </SkeletonPlaceholder.Item>

		      <SkeletonPlaceholder.Item flexDirection="row" justifyContent="center">
		          <SkeletonPlaceholder.Item marginTop={6} width={200} height={16} />
		      </SkeletonPlaceholder.Item>

		     <SkeletonPlaceholder.Item flexDirection="row" justifyContent="center">
		          <SkeletonPlaceholder.Item marginTop={6} width={200} height={16} />
		      </SkeletonPlaceholder.Item>
		    </SkeletonPlaceholder>
		</View>   
	);

	const displayContent = ({item, index})=>(
		<View style={{height: 250}}>
				<View style={{ ...styles.center, ...styles.stackShadow, position:'absolute', width:'100%'}}>
					<Image source={{uri:`https://z1-assets.s3.amazonaws.com/tokens/${item.tribeToken}.png`}} style={{...styles.stackImageShadow, cover:'contain', width: 100, height:100}}/>
				</View>
				<View style={{...styles.center, marginTop:100}}><Title style={{color:'white'}}>{item.symbol.toUpperCase()}</Title></View>
				<View style={{...styles.center}}><Paragraph style={{color:'rgb(250, 250, 250)'}}>{`TRIBE: ${item.tribeName.toUpperCase()}`}</Paragraph></View>
				<View style={{...styles.center}}><Paragraph style={{color:'rgb(250, 250, 250)'}}>{`BALANCE: ${item.balance}`}</Paragraph></View>
		</View>
	)

	const cardContent = ({item, index})=>(item.loading?displaySkeleton():displayContent({item, index}))

	React.useEffect(()=>{
		(async ()=>{
			const items = DATA.filter(item=>item.tribeToken);
			data = [];
			for( item of items){
				const token = {tribeToken: item.tribeToken, tribeName: item.name||""};
		        const tokenTransaction = wallet.tokenTransaction(item.tribeToken);
		        token.name = await tokenTransaction.name().catch(err=>{
		          console.log(err); 
		          return "";
		        });
		        token.symbol = await tokenTransaction.symbol().catch(err=>{
		          console.log(err)
		          return "";
		        });
		        token.balance = parseFloat(wallet.formatEther(await tokenTransaction.balanceOf(wallet.address).catch(err=>{
		          console.log(err);
		          return 0;
		        })));
		        data.push(token);
			}
			setData([...data]);
		})();
		
	}, []);

	return (
		<View style={styles.container}>
			<Wallet route={route} navigation={navigation} />
			<View style={{...styles.center, flexGrow:1}}>
				<ZCarousel items={data} itemComponent={cardContent} itemWidth={240} minHeight={300}/>
			</View>
		</View>
	)
}