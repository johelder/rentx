import React from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";

import * as S from "./styles";

export function SignUpFirstStep() {

  const { goBack } = useNavigation();

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.Container>
          <S.Header>
            <BackButton onPress={() => goBack()} />

            <S.Steps>
              <Bullet />
              <Bullet active />
            </S.Steps>
          </S.Header>

          <S.Title>Crie sua{"\n"}conta</S.Title>
          <S.SubTitle>
            Faça seu cadastro de{"\n"}forma rápida e fácil.
          </S.SubTitle>

          <S.Form>
            <S.FormTitle>1. Dados</S.FormTitle>

            <Input iconName="user" placeholder="Nome" />
            <Input iconName="mail" placeholder="E-mail" />
            <Input iconName="credit-card" placeholder="CNH" />

            <Button title="Próximo" />
          </S.Form>
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
