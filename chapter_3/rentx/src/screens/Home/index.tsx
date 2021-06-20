import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import { StatusBar, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring
} from 'react-native-reanimated';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';
import { Load } from '../../components/Load';
import api from '../../services/api';
import { CarDTO } from '../../dtos/carDTO';

import {
 Container,
 Header,
 HeaderContent,
 TotalCars,
 CarList,
} from './styles';

export function Home(){
  const [cars, setCars] = useState<CarDTO[]>([])
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const navigation = useNavigation();

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: positionX.value},
        {translateY: positionY.value},
      ]
    }
  })

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any){
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any){
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd(){
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    }
  })
  
  function handleCarDetails(car: CarDTO){
    navigation.navigate('CarDetails', { car })
  }

  function handleMyCars(){
    navigation.navigate('MyCars')
  }

  useEffect(() => {
    async function fetchCars(){
      try {
        const response = await api.get('/cars');
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, [])

 return (
   <Container>
    <StatusBar 
      barStyle="light-content"
      backgroundColor="transparent"
      translucent
    />
     <Header>
      <HeaderContent>
        <Logo 
          width={RFValue(108)} 
          height={RFValue(12)} 
        />
        <TotalCars>
          Total de {cars.length} carros
        </TotalCars>
      </HeaderContent>
     </Header>

     {loading ? <Load /> : 
      <CarList 
        data={cars}
        keyExtractor={item => item.id}
        renderItem={({item}) => 
          <Car onPress={() => handleCarDetails(item)} data={item} />
        }
      />
     }

    <PanGestureHandler onGestureEvent={onGestureEvent} >
      <Animated.View
        style={[
          myCarsButtonStyle,
          {
            position: 'absolute',
            bottom: 13,
            right: 22
          }
        ]}
      >
        <ButtonAnimated 
          onPress={handleMyCars}
          style={[styles.button, { backgroundColor: theme.colors.main }]}
        >
          <Ionicons 
            name="ios-car-sport" 
            size={32}
            color={theme.colors.shape}
          />
        </ButtonAnimated>
      </Animated.View>
    </PanGestureHandler>

      
   </Container>
 );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  }
})