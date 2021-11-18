import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  Alert,
} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import { api } from "../../../services/api";

import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { PasswordInput } from "../../../components/PasswordInput";

import { useTheme } from "styled-components";

import * as S from "./styles";

interface IRouteParams {
  user: {
    name: string;
    email: string;
    driverLicensed: string;
  };
}

export function SignUpSecondStep() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { goBack, navigate } = useNavigation();
  const route = useRoute();
  const theme = useTheme();

  const { user } = route.params as IRouteParams;

  function handleRegister() {
    if (!password || !passwordConfirm) {
      return Alert.alert("Senha e confirmação obrigatória");
    }

    if (password !== passwordConfirm) {
      return Alert.alert("As senhas não conferem");
    }

    api
      .post("/users", {
        name: user.name,
        email: user.email,
        driver_license: user.driverLicensed,
        password,
      })
      .then(() => {
        navigate("Confirmation", {
          title: "Conta criada!",
          message: "",
          nextScreen: "SignIn",
        });
      })
      .catch(() => {
        Alert.alert("Peraí", "Não foi possível cadastrar");
      });
  }

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
            <S.FormTitle>2. Senha</S.FormTitle>

            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Repetir senha"
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />

            <Button
              title="Cadastrar"
              color={theme.colors.success}
              onPress={handleRegister}
            />
          </S.Form>
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
