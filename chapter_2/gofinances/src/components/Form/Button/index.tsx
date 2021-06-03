import React from 'react';
import { TouchableOpacityProps } from 'react-native';

interface Props extends TouchableOpacityProps {
  title: string;
}

import {
  Container,
  Title
} from './styles';

export function Button({title, ...rest }: Props){
  return (
    <Container {...rest}>
      <Title>{title}</Title>
    </Container>
  )
}