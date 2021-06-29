import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

import * as Yup from 'yup';

import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle,
} from './styles';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react';

export function SignUpFirstStep(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState('');
  const navigation = useNavigation();

  function handleBack(){
    navigation.goBack();
  }

  async function handleNextStep(){
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string()
          .required('CNH é obrigatória'),
        email: Yup.string()
          .required('Email é obrigatório')
          .email('Digite um e-mail válido'),
        name: Yup.string()
          .required('Nome é obrigatório')
      })

      const data = {name, email, driverLicense}
  
      await schema.validate(data);

      navigation.navigate('SignUpSecondStep', {user: data});
    } catch (error) {
      if(error instanceof Yup.ValidationError){
        Alert.alert('Opa', error.message);
      } else {
        Alert.alert('Erro na autenticação', 'Ocorreu um erro ao fazer login, verifique as credências')
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack}/>
            <Steps>
              <Bullet active/>
              <Bullet/>
            </Steps>
          </Header>

          <Title>Crie sua{'\n'}conta</Title>
          <Subtitle>Faça seu cadastro de{'\n'}forma rápida e fácil</Subtitle>

          <Form>
            <FormTitle>1. Dados</FormTitle>
            <Input 
              iconName="user"
              placeholder="Nome"
              onChangeText={setName}
              value={name}
            />
            <Input 
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              onChangeText={setEmail}
              value={email}
            />
            <Input 
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              onChangeText={setDriverLicense}
              // onChangeText={(value) => setDriverLicense(Number(value))}
              value={driverLicense}
            />
          </Form>

          <Button 
            title="Próximo"
            onPress={handleNextStep}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}