import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import styles from './../styles/main';
import * as Animatable from 'react-native-animatable';

var containerStyle = StyleSheet.create({
  card: {
    transform: [
      { perspective: 500 },
      { rotateY: '-25deg'},

    ],
  },
  shadow:{
  	elevation: 20,
  	shadowColor: "#592abc",
  	shadowOffset: {width: 5, height: 4},
    shadowOpacity: 1,
    shadowRadius: 2,

  }
});


function ZCarouselContainer({children}){
	return (
		<View style={{...containerStyle.shadow, marginTop:50, overflow: 'visible', borderRadius: 30}}>
			<LinearGradient colors={['#7035EB', '#B67FFA']} style={{borderRadius: 20, padding: 5}}>
					<View style={{backgroundColor: '#331B50', opacity:0.8, borderRadius: 20, minWidth: 160, minHeight:160, padding:10}} >{children}</View>
			</LinearGradient>
		</View>
	)
}


export default function ZCCarousel({minHeight=300, sliderWidth=Dimensions.get("window").width, itemWidth=200, items=[], itemComponent}){
	 return (
	 	<Animatable.View style={{minHeight}} animation="slideInRight">
            <Carousel
              data={items}
              renderItem={({item, index})=>(<View style={containerStyle.card}><ZCarouselContainer>{itemComponent({item, index})}</ZCarouselContainer></View>)}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              layout={'stack'} 
              layoutCardOffset={30} 
              inactiveSlideOpacity= {0.05}
              loopClonesPerSide={4}
            />
        </Animatable.View>
     );
}