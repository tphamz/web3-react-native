/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import Login from "./src/components/login/Login";
import Pages from "./src/components/pages/Pages";

import {AccountProvider, useAccount} from './src/services/Account';
import  Background from "./src/components/Background";
import SubmitTransaction from  "./src/components/tokens/SubmitTransaction";

const NavTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent'
  },
};

const App: () => Node = () => {
  React.useEffect(()=>{
    // (async()=>{
    //     await wallet.init();

    //     const token = {};
    //     const tokenTransaction = wallet.tokenTransaction("0x74FbeC958cf737468273B025B9b919b0ac2a7549");
    //     token.name = await tokenTransaction.name().catch(err=>{
    //       console.log(err); 
    //       return "";
    //     });
    //     token.symbol = await tokenTransaction.symbol().catch(err=>{
    //       console.log(err)
    //       return "";
    //     });
    //     token.balance = parseFloat(wallet.formatEther(await tokenTransaction.balanceOf(wallet.account.address).catch(err=>{
    //       console.log(err);
    //       return 0;
    //     })));
    //     const myBalance = await wallet.provider.getBalance(wallet.account.address).catch(err=>{
    //       console.log(err);
    //       return 0;
    //     });
    //     console.log("token::", token);
    //     console.log("myBalance::", wallet.formatEther(myBalance));
    // })();
  }, []);

  return (
    <AccountProvider>
      <Background>
        <NavigationContainer theme={NavTheme}>
            <AppContent />
        </NavigationContainer>
      </Background>
    </AccountProvider>
  );
};

const AppContent = ()=>{
  const {authenticated} = useAccount();
  return (
    <React.Fragment> 
    {
      authenticated()?<Pages/>:<Login/>
      /*<SubmitTransaction />*/
    }
    </React.Fragment>
  )
}

export default App;
