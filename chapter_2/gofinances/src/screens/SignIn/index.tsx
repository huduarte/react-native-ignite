import React, { useState} from 'react';
import { Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import {useAuth} from '../../hooks/auth';
import { useTheme } from 'styled-components';
import { SignInSocialButton } from '../../components/SignInSocialButton';

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from './styles';
import { ActivityIndicator, Alert } from 'react-native';

export function SignIn(){
  const [isLoading, setIsLoading] = useState(false);
  const {signInWithGoogle, signInWithApple} = useAuth();
  const theme = useTheme();

  async function handleSignInWithGoogle(){
    try{
      setIsLoading(true);
      return await signInWithGoogle();
    } catch(error) {
      console.log(error)
      Alert.alert('Erro ao fazer autênticação com o google', 'tente novamente.')
      setIsLoading(false)
    }
  }

  async function handleSignInWithApple(){
    try{
      return await signInWithApple();
    } catch(error) {
      console.log(error)
      Alert.alert('Erro ao fazer autênticação com o Apple', 'tente novamente.')
      setIsLoading(false)
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg 
            width={RFValue(120)}
            height={RFValue(68)}
          />

          <Title>Controle suas{'\n'}finanças de forma{'\n'}muito simples</Title>
        </TitleWrapper>

        <SignInTitle>
          Faça o seu login com{'\n'} uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton 
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />

          {
            Platform.OS === 'ios' && (
              <SignInSocialButton 
                title="Entrar com Apple"
                svg={AppleSvg}
                onPress={handleSignInWithApple}
              />
            )
          }
        </FooterWrapper>

        {isLoading && <ActivityIndicator color={theme.colors.shape} style={{marginTop: 18}} />}
      </Footer>
    </Container>
  )
}