import React, { useState, useEffect } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { AntDesign } from '@expo/vector-icons';
import { Car } from '../../components/Car';
import { BackButton } from '../../components/BackButton';
import { LoadAnimation } from '../../components/LoadAnimation';
import { CarDTO } from '../../dtos/carDTO';
import api from '../../services/api';

import {
  Container,
  Header,
  Title,
  Subtitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';

interface CarProps {
  user_id: string;
  id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

export function MyCars(){
  const [cars, setCars] = useState<CarProps[]>([])
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  const navigation = useNavigation();

  useEffect(() => {
    async function fetchCars(){
      try {
        const response = await api.get('/schedules_byuser/?user_id=1');
        console.log(response.data);
        setCars(response.data);
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, [])

  function handleBack(){
    navigation.goBack();
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <BackButton
          onPress={handleBack}
          color={theme.colors.shape} 
        />

        <Title>Escolha uma{'\n'}data de início e{'\n'}fim do aluguel</Title>

        <Subtitle>Conforto, segurança e praticidade.</Subtitle>

        
      </Header>
      {loading ? <LoadAnimation /> : 
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList 
            data={cars}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign 
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{marginHorizontal: 10}}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      }

    </Container>
  );
}