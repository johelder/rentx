import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { CarDTO } from '../../dtos/CarDTO';

import GasolineIcon from '../../assets/gasoline.svg';

import * as S from './styles';

interface ICardProps {
  data: CarDTO;
}

export function Car({ data }: ICardProps) {

  const navigation = useNavigation();

  function handleNavigate() {
    navigation.navigate('CarDetails');
  }

  return (
    <S.Container onPress={handleNavigate}>
      <S.Details>
        <S.Brand>{data.brand}</S.Brand>
        <S.Name>{data.name}</S.Name>

        <S.About>
          <S.Rent>
            <S.Period>{data.rent.period}</S.Period>
            <S.Price>{`R$ ${data.rent.price}`}</S.Price>
          </S.Rent>

          <S.Type>
            <GasolineIcon />
          </S.Type>
        </S.About>
      </S.Details>

      <S.CarImage source={{ uri: data.thumbnail }} resizeMode="contain" />
    </S.Container>
  );
}