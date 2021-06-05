import React from 'react';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
} from './styles';

export function CarDetails(){
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

      <About>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate rem temporibus autem minus blanditiis amet non. Amet nihil suscipit possimus! Qui inventore explicabo dolores sapiente accusantium libero dolore maxime placeat.
      </About>
    </Content>
   </Container>
 );
}