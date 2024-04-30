import React from 'react';
import {ScrollView, View, Text, Dimensions } from 'react-native';
import styles from './../../styles/main';
import { Avatar, Card, Title, Paragraph, List, Divider } from 'react-native-paper';
import {useAccount} from './../../services/Account';

export default function Profile({route, navigation}){
	const {wallet, account} = useAccount();
	const [profile, setProfile] = React.useState({fullName: "", email: "", network: "", balance:"0.0", address:"0x00000000000000000..."});
	React.useEffect(()=>{
		(async()=>{
			profile.email = account.email ||"";
			profile.fullName = (account.first_name||"Tan") + " " + (account.last_name||"Pham");
			profile.network = wallet.env.name || "Unsupported Network";
			profile.address = wallet.address || profile.address;
			if(wallet.provider)
				profile.balance =  wallet.formatEther(await wallet.provider.getBalance(wallet.address).catch(err=>{
		          console.log(err);
		          return 0;
		        }));
			setProfile({...profile});
		})();
		
	},[]);
	return (
		<ScrollView>
			<View style={{...styles.center}}>
				<View style={[styles.rowCenter, styles.settingAvatar]}>
					<Avatar.Text size={80} label="TP" />
					<Title style={styles.rowCenter}>{profile.fullName}</Title>
					<Paragraph style={styles.rowCenter}>{profile.email}</Paragraph>
				</View>
					<Card style={styles.settingContainer}>
						 <Card.Content>
						 	<View style={styles.settingSectionContainer}>
								<List.Subheader>PROFILE</List.Subheader>
								<List.Section style={styles.settingSection}>
								    <List.Item title={profile.fullName} description="Full Name"/>
								    <Divider/>
								    <List.Item  title={profile.email} description="Email"/>
								</List.Section>
							</View>

							<View>
								<List.Subheader>WALLET</List.Subheader>
								<List.Section style={styles.settingSection}>
								    <List.Item title={profile.network} description="Network"/>
								    <Divider/>
								    <List.Item  title={profile.address} description="Wallet Address" titleStyle={{fontSize: 13}}/>
								    <Divider/>
								    <List.Item  title={profile.balance} description="Balance"/>
								</List.Section>
							</View>
					    </Card.Content>
					</Card>
			</View>
		</ScrollView>
	)
}