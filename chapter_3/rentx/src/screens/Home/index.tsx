import React from 'react';
import {useNavigation} from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';

import {
 Container,
 Header,
 HeaderContent,
 TotalCars,
 CarList,
} from './styles';

export function Home(){
  const navigation = useNavigation();
  
  function handleCarDetails(){
    navigation.navigate('CarDetails')
  }
  
  const cardDataOne = {
    brand: 'AUDI',
    name: 'RS 5 Coupé',
    rent: {
      period: 'AO DIA',
      price: 120
    },
    thumbnail: 'https://www.motortrend.com/uploads/sites/10/2018/05/2018-audi-rs5-4wd-coupe-angular-front.png'
  }

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
          Total de 12 carros
        </TotalCars>
      </HeaderContent>
     </Header>

      <CarList 
        data={[1,2,3,4,5,6,7]}
        keyExtractor={item => String(item)}
        renderItem={({item}) => 
          <Car
            onPress={handleCarDetails} 
            data={cardDataOne}
          />
        }
      />
   </Container>
 );
}