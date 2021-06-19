import React, { useState } from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Accessory } from '../../components/Accessory/Index';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import {format} from 'date-fns';

import { Button } from '../../components/Button';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { CarDTO } from '../../dtos/carDTO';

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
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { useEffect } from 'react';
import { getPlatformDate } from '../../utils/getPlatformDate';
import api from '../../services/api';
import { Alert } from 'react-native';

interface Params {
  car: CarDTO
  dates: string[]
}

interface RentalPeriod {
  start: string;
  end: string;
}

export function SchedulingDetails(){
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>();
  const theme = useTheme();

  const route = useRoute();
  const { car, dates } = route.params as Params;

  const rentTotal = Number(dates.length * car.rent.price)

  const navigation = useNavigation();

  async function handleConfirmRental(){
    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates,
      ...dates
    ]

    api.put(`/schedules_bycars/${car.id}`, {
      id: car.id,
      unavailable_dates,
    })
    .then(() => navigation.navigate('SchedulingComplete'))
    .catch(() => Alert.alert('Não foi possível confirmar o agendamento'))

    
  }

  function handleBack(){
    navigation.goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')
    })
  }, [])

  return (
    <Container>
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
        {
          car.accessories.map(accessory => (
            <Accessory
              key={accessory.type} 
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)} 
            />
          ))
        }
      </Accessories>

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
          <DateValue>{rentalPeriod?.start}</DateValue>
        </DateInfo>

        <Feather 
          name="chevron-right"
          size={RFValue(10)}
          color={theme.colors.text}
        />

        <DateInfo>
          <DateTitle>ATÉ</DateTitle>
          <DateValue>{rentalPeriod?.end}</DateValue>
        </DateInfo>
      </RentalPeriod>

      <RentalPrice>
        <RentalPriceLabel>TOTAL</RentalPriceLabel>
        <RentalPriceDetail>
          <RentalPriceQuota>R$ {car.rent.price} x{dates.length} diárias</RentalPriceQuota>
          <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
        </RentalPriceDetail>
      </RentalPrice>
      

    </Content>

    <Footer>
      <Button title="Alugar agora" color={theme.colors.succes} onPress={handleConfirmRental}/>
    </Footer>
    </Container>
  );
}