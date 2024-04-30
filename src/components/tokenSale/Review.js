import React from 'react';
import {ScrollView, View, Text, Dimensions } from 'react-native';
import styles from './../../styles/main';
import { Avatar, Card, Title, Paragraph, List, Divider, Button } from 'react-native-paper';
import {useAccount} from './../../services/Account';
import SkeletonContent from 'react-native-skeleton-content';

export default function Review({data=[], onSubmit, isLoading=true}){
	const displaySkeleton = ()=>(
			Array(5).fill(1).map((item, index)=>(
				<React.Fragment>
					<SkeletonContent
		       			containerStyle={}
		       			animationType="pulse"
		       			layout={[
		       			 	{width:"50%", height: 80},
		       			 	{width: "100%", height: 60}
		       			]}
		       		>
		       			<View />
		       			<View />
		       			<React.Fragment>
							{index!=4?<Divider/>:<React.Fragment/>}
						</React.Fragment>
		       		</SkeletonContent>
				</React.Fragment>
			)
		)
	);

	const displayData = ()=>(
		data.map((item, index)=>(
			<React.Fragment>
				<List.Item title={item.name} description={item.value}/>
				<React.Fragment>
					{index!=(data.length-1)?<Divider/>:<React.Fragment/>}
				</React.Fragment>
			</React.Fragment>
		))
	)

	return (
		<ScrollView>
			<View style={styles.center}>
					<Card style={{...styles.settingContainer, marginTop: 0}}>
						 <Card.Content>
						 	<View style={styles.settingSectionContainer}>
								<List.Subheader>TRANSACTION</List.Subheader>
								<List.Section style={styles.settingSection}>
								    {
								    	loading?displaySkeleton():displayData()
								    }
								</List.Section>
							</View>
							<Button disabled={(value && !error)?false:true} mode="contained" style={{...styles.center, borderRadius:5, position:"absolute", bottom: 50, width:"80%"}}>Confirm</Button>
					    </Card.Content>
					</Card>
			</View>
		</ScrollView>
	)
}