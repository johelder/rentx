import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  Alert,
} from "react-native";

import * as Yup from "yup";

import { useNavigation } from "@react-navigation/native";

import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";

import * as S from "./styles";

export function SignUpFirstStep() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [driverLicensed, setDriverLicensed] = useState("");

  const { goBack, navigate } = useNavigation();

  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        driverLicensed: Yup.string().required("CNH obrigatória"),
        email: Yup.string()
          .required("E-mail obrigatório")
          .email("Informe um e-mail válido"),
        name: Yup.string().required("Nome obrigatório"),
      });

      const data = { name, email, driverLicensed };
      await schema.validate(data);

      navigate("SignUpSecondStep", { user: data });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert("Peraí", error.message);
      }
    }
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
            <S.FormTitle>1. Dados</S.FormTitle>

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
              onChangeText={setDriverLicensed}
              value={driverLicensed}
            />

            <Button title="Próximo" onPress={handleNextStep} />
          </S.Form>
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
