import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { StackRoute } from './stack.routes';

export function Routes(){
  return (
    <NavigationContainer>
      <StackRoute />
    </NavigationContainer>
  );
}