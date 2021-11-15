import React from "react";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import { useTheme } from "styled-components";

import * as S from "./styles";
import { StatusBar } from "react-native";

export function SignIn() {
  const theme = useTheme();

  return (
    <S.Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <S.Header>
        <S.Title>Estamos{"\n"}quase lá.</S.Title>

        <S.SubTitle>
          Faça seu login para começar{"\n"}uma experência incrível.
        </S.SubTitle>
      </S.Header>

      <S.Form>
        <Input
          iconName="mail"
          placeholder="E-mail"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
        />
      </S.Form>

      <S.Footer>
        <Button
          title="Login"
          onPress={() => {}}
          enabled={false}
          loading={false}
        />

        <Button
          title="Criar conta gratuita"
          color={theme.colors.background_secondary}
          onPress={() => {}}
          loading={false}
          light
        />
      </S.Footer>
    </S.Container>
  );
}
