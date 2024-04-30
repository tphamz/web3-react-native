import React from 'react';
import {ScrollView, View, Text, Dimensions } from 'react-native';
import styles from './../styles/main';
import { Avatar, Card, Title, Paragraph, List, Divider, Button } from 'react-native-paper';
import {useAccount} from './../services/Account';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const screenWidth = Dimensions.get("window").width;

let gasTimeout = null;
const TIMEOUT_SECOND = 10000;
	

export default function TransactionReview({transactionData=[], gasUnit=21000, onSubmit}){
	const {wallet} = useAccount();
	let [gas, setGas] = React.useState(0);
	const [isLoading, setLoading] = React.useState(true);
	const displaySkeleton = ()=>(
			Array(3).fill(1).map((item, index)=>(
				<React.Fragment key={index}>
					<View style={{height:64}} padding={10}>
						<SkeletonPlaceholder  >
			       			<SkeletonPlaceholder.Item width={100} height={20} />
			       			<SkeletonPlaceholder.Item width={200} height={14} marginTop={6}/>
			       		</SkeletonPlaceholder>
					</View>
					<React.Fragment>
						{index!=4?<Divider/>:<React.Fragment/>}
					</React.Fragment>
				</React.Fragment>
			)
		)
	);

	const displayData = ()=>(
		transactionData.map((item, index)=>(
			<React.Fragment key={index}>
				<List.Item title={item.name} description={item.value} descriptionStyle={{fontSize:item.type=="address"?12:16}}/>
				<React.Fragment>
					{index!=(transactionData.length-1)?<Divider/>:<React.Fragment/>}
				</React.Fragment>
			</React.Fragment>
		))
	)

	const displayGasPrice = ()=>(
		<React.Fragment>
			<List.Item title="Gas Limit" description={gasUnit}/>	
			<Divider/>
			<List.Item animation ="fadeIn" delay={300} iterationCount="infinite" title="Gas Price" description={parseInt(gas) + " Wei"}/>	
			<Divider/>
			<List.Item animation ="fadeIn" delay={300} iterationCount="infinite"title="Total Gas Fee" description={wallet.utils.formatEther(parseInt(gas) * gasUnit) + " " +  wallet.env.unit}/>	
		</React.Fragment>
	)

	const onContinue = ()=>{
		clearTimeout(gasTimeout);
		onSubmit({gasPrice: gas, gasUnit})
	}

	const getGas = async()=>{
		if(!gasTimeout){
			setLoading(true);
			gas = await wallet.provider.getGasPrice();
			setLoading(false);
			setGas(gas);
		}
			gasTimeout = setTimeout(()=>{
				clearTimeout(gasTimeout);
				gasTimeout = null;
				setGas(0);
			}, TIMEOUT_SECOND);
	}

	React.useEffect(()=>{
		getGas();
		setLoading(false);
	}, [gasUnit, gas])

	return (
		<ScrollView>
			<View style={{...styles.center}}>
					<Card style={{...styles.settingContainer, marginTop: 0}}>
						 <Card.Content>
						 	<View >
								<List.Subheader>TRANSACTION</List.Subheader>
								<List.Section style={styles.settingSection}>
								    {
								    	isLoading?displaySkeleton():displayData()
								    }
								</List.Section>
							</View>

							<View>
								<List.Subheader>GAS PRICE</List.Subheader>
								<List.Section style={styles.settingSection}>
								    {
								    	isLoading?displaySkeleton():displayGasPrice()
								    }
								</List.Section>
							</View>
					    </Card.Content>
						<View style={{marginTop: 20, alignItems:"center", width: screenWidth}}><Button disabled={isLoading} mode="contained" style={{borderRadius:5, width: (screenWidth-40)}} onPress={onContinue}>Submit</Button></View>
					</Card>
			</View>
		</ScrollView>
	)
}