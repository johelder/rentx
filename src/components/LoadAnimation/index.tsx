import React from "react";
import LottieView from "lottie-react-native";

import loadingCar from "../../assets/carAnimation.json";

import * as S from "./styles";

export function LoadAnimation() {
  return (
    <S.Container>
      <LottieView
        source={loadingCar}
        style={{ height: 120 }}
        resizeMode="contain"
        autoPlay
        loop
      />
    </S.Container>
  );
}
