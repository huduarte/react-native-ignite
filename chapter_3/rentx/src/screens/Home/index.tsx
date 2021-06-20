import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
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
 MyCarsButton,
} from './styles';
import { useTheme } from 'styled-components';

export function Home(){
  const [cars, setCars] = useState<CarDTO[]>([])
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const navigation = useNavigation();
  
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

    <MyCarsButton onPress={handleMyCars} >
      <Ionicons 
        name="ios-car-sport" 
        size={32}
        color={theme.colors.shape}
      />
    </MyCarsButton>

      
   </Container>
 );
}