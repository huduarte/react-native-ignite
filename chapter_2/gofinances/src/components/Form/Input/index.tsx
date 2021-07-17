import React from 'react';
import { TextInputProps } from 'react-native';

interface Props extends TextInputProps {
  active?: boolean;
}

import {
  Container,
} from './styles';

export function Input({
  active = false,
  ...rest
}: Props){
  return (
    <Container
      active={active}
      {...rest} 
    />
  )
}