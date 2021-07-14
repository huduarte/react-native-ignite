import React, {useState} from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import {Feather} from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';


import {
  Container,
  IconContainer,
  InputText,
} from './styles';

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
}

export function PasswordInput({
  iconName,
  value,
  ...rest
}: Props){
  const [isPasswordVisibile, setIsPasswordVisibile] = useState(true);
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handlePasswordVisibilityChange(){
    setIsPasswordVisibile(prevState => !prevState)
  }

  function handleInputFocus(){
    setIsFocused(true);
  }

  function handleInputBlur(){
    setIsFocused(false);
    setIsFilled(!!value);
  }

  return (
    <Container>
      <IconContainer
        isFocused={isFocused}
      >
        <Feather 
          name={iconName}
          size={24}
          color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail}
        />
      </IconContainer>

      <InputText 
        isFocused={isFocused}
        {...rest} 
        secureTextEntry={isPasswordVisibile}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        autoCorrect={false}
      />

      <BorderlessButton onPress={handlePasswordVisibilityChange}>
        <IconContainer
          isFocused={isFocused}
        >
          <Feather 
            name={isPasswordVisibile ? 'eye' : 'eye-off'}
            size={24}
            color={theme.colors.text_detail}
          />
        </IconContainer>
      </BorderlessButton>
    </Container>
  );
}