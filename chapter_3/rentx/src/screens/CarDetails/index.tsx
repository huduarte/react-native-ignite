import React from 'react';
import {useNavigation} from '@react-navigation/native';
import { Acessory } from '../../components/Acessory/Index';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import SpeedSvg from '../../assets/speed.svg';
import AccelerationSvg from '../../assets/acceleration.svg';
import ForceSvg from '../../assets/force.svg';
import GasolineSvg from '../../assets/gasoline.svg';
import ExchangeSvg from '../../assets/exchange.svg';
import PeopleSvg from '../../assets/people.svg';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Acessories,
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

export function CarDetails(){
  const navigation = useNavigation();
  
  function handleConfirmRental(){
    navigation.navigate('Scheduling')
  }
 return (
   <Container>
     <StatusBar 
      barStyle="dark-content"
      translucent
      backgroundColor="transparent"
     />
    <Header>
      <BackButton onPress={() => {}} />
    </Header>

    <CarImages>
      <ImageSlider 
        imagesUrl={['https://www.motortrend.com/uploads/sites/10/2018/05/2018-audi-rs5-4wd-coupe-angular-front.png']}
      />
    </CarImages>

    <Content>
      <Details>
        <Description>
          <Brand>Lamborghini</Brand>
          <Name>Huracan</Name>
        </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
      </Details>

      <Acessories>

        <Acessory name="380 Km/h" icon={SpeedSvg}  />
        <Acessory name="3.2s" icon={AccelerationSvg}/>
        <Acessory name="800 HP" icon={ForceSvg} />
        <Acessory name="Gasolina"icon={GasolineSvg}/>
        <Acessory name="Auto" icon={ExchangeSvg}/>
        <Acessory name="2 Pessoas" icon={PeopleSvg}/>
      </Acessories>

      <About>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate rem temporibus autem minus blanditiis amet non. Amet nihil suscipit possimus! Qui inventore explicabo dolores sapiente accusantium libero dolore maxime placeat.
      </About>
    </Content>

    <Footer>
      <Button title="Escolher período do aluguel" onPress={handleConfirmRental}/>
    </Footer>
   </Container>
 );
}