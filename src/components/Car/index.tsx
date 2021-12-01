import React from "react";
import { StatusBar } from "react-native";

import { Car as ModelCar } from "../../database/model/Car";

import { RectButtonProps } from "react-native-gesture-handler";
import { getAccesoryIcon } from "../../utils/getAccessoryIcon";

import * as S from "./styles";

interface ICardProps extends RectButtonProps {
  data: ModelCar;
}

export function Car({ data, ...rest }: ICardProps) {
  const MotorIcon = getAccesoryIcon(data.fuel_type);

  return (
    <S.Container {...rest}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <S.Details>
        <S.Brand>{data.brand}</S.Brand>
        <S.Name>{data.name}</S.Name>

        <S.About>
          <S.Rent>
            <S.Period>{data.period}</S.Period>
            <S.Price>{`R$ ${data.price}`}</S.Price>
          </S.Rent>

          <S.Type>
            <MotorIcon />
          </S.Type>
        </S.About>
      </S.Details>

      <S.CarImage source={{ uri: data.thumbnail }} resizeMode="contain" />
    </S.Container>
  );
}
