import React from "react";
import { StatusBar, useWindowDimensions } from "react-native";

import { ConfirmButton } from "../../components/ConfirmButton";

import BackgroundIcon from "../../assets/logo_background_gray.svg";
import DoneIcon from "../../assets/done.svg";

import * as S from "./styles";

export function SchedulingComplete() {
  const { width } = useWindowDimensions();

  return (
    <S.Container>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <BackgroundIcon width={width} />

      <S.Content>
        <DoneIcon width={80} height={80} />

        <S.Title>Carro alugado!</S.Title>
        <S.Message>
          Agora você só precisa ir {'\n'} 
          até a concessionária da RENTX {'\n'} 
          pegar o seu automóvel.
        </S.Message>
      </S.Content>

      <S.Footer>
        <ConfirmButton title="Ok" />
      </S.Footer>
    </S.Container>
  );
}
