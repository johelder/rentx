import React from 'react';

import { StatusBar } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';

import ArrowIcon from '../../assets/arrow.svg';

import * as S from './styles';

export function Scheduling() {
  const navigation = useNavigation();
  const theme = useTheme();

  function handleNavigate() {
    navigation.navigate('SchedulingDetails');
  }

  return (
    <S.Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <S.Header>
        <BackButton color={theme.colors.shape} onPress={() => {}} />

        <S.Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </S.Title>

        <S.RentPeriod>
          <S.DateInfo>
            <S.DateTitle>DE</S.DateTitle>
            <S.DateValue selected={false}></S.DateValue>
          </S.DateInfo>
        
          <ArrowIcon />

          <S.DateInfo>
            <S.DateTitle>ATÉ</S.DateTitle>
            <S.DateValue selected={false}></S.DateValue>
          </S.DateInfo>
        </S.RentPeriod>
      </S.Header>

      <S.Content>
        <Calendar />
      </S.Content>

      <S.Footer>
        <Button title="Confirmar" onPress={handleNavigate} />
      </S.Footer>
    </S.Container>
  );
}