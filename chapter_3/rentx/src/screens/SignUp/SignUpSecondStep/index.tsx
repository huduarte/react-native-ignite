import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { PasswordInput } from '../../../components/PasswordInput';
import { Button } from '../../../components/Button';

import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle,
} from './styles';

interface Params {
  user: {
    name: string,
    email: string,
    driverLicense: string;
  }
}

import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from 'styled-components';
import api from '../../../services/api';

export function SignUpSecondStep(){
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const theme = useTheme();
  const navigation = useNavigation();
  
  const route = useRoute();
  const { user } = route.params as Params;

  function handleBack(){
    navigation.goBack();
  }

  async function handleRegister(){
    if(!password || !passwordConfirm){
      return Alert.alert("Informa a senha e a confirmação.")
    }

    if(password != passwordConfirm){
      return Alert.alert("As senhas não são iguais")
    }

    await api.post('/users', {
      name: user.name,
      email: user.email,
      driver_license: user.driverLicense,
      password
    }).then(() => {
      navigation.navigate('Confirmation', {
        nextScreenRoute: 'SignIn',
        title: 'Contra criada!',
        message: `Agora é só fazer login\ne aproveitar.`
      })
    }).catch(error => {
      console.log(error)
      Alert.alert('Opa', 'Não foi possível cadastrar');
    })

  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack}/>
            <Steps>
              <Bullet/>
              <Bullet active/>
            </Steps>
          </Header>

          <Title>Crie sua{'\n'}conta</Title>
          <Subtitle>Faça seu cadastro de{'\n'}forma rápida e fácil</Subtitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>
            <PasswordInput 
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput 
              iconName="lock"
              placeholder="Repetir Senha"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </Form>

          <Button
            color={theme.colors.succes}
            title="Cadastrar"
            onPress={handleRegister}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}