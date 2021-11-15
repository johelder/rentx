import React from "react";
import { Button } from "../../components/Button";

import { useTheme } from "styled-components";

import * as S from "./styles";

export function SignIn() {

  const theme = useTheme();

  return (
    <S.Container>
      <S.Header>
        <S.Title>Estamos{"\n"}quase lá.</S.Title>

        <S.SubTitle>
          Faça seu login para começar{"\n"}uma experência incrível.
        </S.SubTitle>
      </S.Header>

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
