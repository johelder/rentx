import React from "react";
import { StatusBar, useWindowDimensions } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";

import { ConfirmButton } from "../../components/ConfirmButton";

import BackgroundIcon from "../../assets/logo_background_gray.svg";
import DoneIcon from "../../assets/done.svg";

import * as S from "./styles";

interface IRouteParams {
  title: string;
  message: string;
  nextScreen: string;
}

export function Confirmation() {
  const navigation = useNavigation();
  const route = useRoute();
  const { title, message, nextScreen } = route.params as IRouteParams;

  const { width } = useWindowDimensions();

  function handleNavigate() {
    navigation.navigate(nextScreen);
  }

  return (
    <S.Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <BackgroundIcon width={width} />

      <S.Content>
        <DoneIcon width={80} height={80} />

        <S.Title>{title}</S.Title>
        <S.Message>{message}</S.Message>
      </S.Content>

      <S.Footer>
        <ConfirmButton title="Ok" onPress={handleNavigate} />
      </S.Footer>
    </S.Container>
  );
}
