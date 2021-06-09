import React from 'react';
import {useNavigation} from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
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
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetail,
  RentalPriceQuota,
  RentalPriceTotal,
  Footer,
} from './styles';
import { Button } from '../../components/Button';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

export function SchedulingDetails(){
  const theme = useTheme();

  const navigation = useNavigation();
  
  function handleConfirmRental(){
    navigation.navigate('SchedulingComplete')
  }
  return (
    <Container>
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

      <RentalPeriod>
        <CalendarIcon>
          <Feather
            name="calendar"
            size={RFValue(24)}
            color={theme.colors.shape}
          />
        </CalendarIcon>

        <DateInfo>
          <DateTitle>DE</DateTitle>
          <DateValue>18/06/2021</DateValue>
        </DateInfo>

        <Feather 
          name="chevron-right"
          size={RFValue(10)}
          color={theme.colors.text}
        />

        <DateInfo>
          <DateTitle>ATÉ</DateTitle>
          <DateValue>18/06/2021</DateValue>
        </DateInfo>
      </RentalPeriod>

      <RentalPrice>
        <RentalPriceLabel>TOTAL</RentalPriceLabel>
        <RentalPriceDetail>
          <RentalPriceQuota>R$ 580 x3 diárias</RentalPriceQuota>
          <RentalPriceTotal>R$ 2.900</RentalPriceTotal>
        </RentalPriceDetail>
      </RentalPrice>
      

    </Content>

    <Footer>
      <Button title="Alugar agora" color={theme.colors.succes} onPress={handleConfirmRental}/>
    </Footer>
    </Container>
  );
}