import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import { Accessory } from '../../components/Accessory/Index';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Accessories,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Footer,
} from './styles';
import { Button } from '../../components/Button';
import { StatusBar } from 'react-native';
import { CarDTO } from '../../dtos/carDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

interface Params {
  car: CarDTO
}

export function CarDetails(){
  const route = useRoute();
  const { car } = route.params as Params;
  const navigation = useNavigation();
  
  function handleConfirmRental(){
    navigation.navigate('Scheduling', { car })
  }

  function handleBack(){
    navigation.goBack();
  }
 return (
   <Container>
     <StatusBar 
      barStyle="dark-content"
      translucent
      backgroundColor="transparent"
     />
    <Header>
      <BackButton onPress={handleBack} />
    </Header>

    <CarImages>
      <ImageSlider 
        imagesUrl={car.photos}
      />
    </CarImages>

    <Content>
      <Details>
        <Description>
          <Brand>{car.brand}</Brand>
          <Name>{car.name}</Name>
        </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
      </Details>

      <Accessories>
        {car.accessories.map(accessory => (
          <Accessory key={accessory.type} name={accessory.name} icon={getAccessoryIcon(accessory.type)}  />
        ))}
      </Accessories>

      <About>{car.about}</About>
    </Content>

    <Footer>
      <Button title="Escolher período do aluguel" onPress={handleConfirmRental}/>
    </Footer>
   </Container>
 );
}