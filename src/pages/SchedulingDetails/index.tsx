import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { Acessory } from '../../components/Acessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';

import speedIcon from '../../assets/speed.svg';
import accelerationIcon from '../../assets/acceleration.svg';
import forceIcon from '../../assets/force.svg';
import gasolineIcon from '../../assets/gasoline.svg';
import exchangeIcon from '../../assets/exchange.svg';
import peopleIcon from '../../assets/people.svg';

import Feather from '@expo/vector-icons/Feather';

import * as S from './styles';

export function SchedulingDetails() {
  const navigation = useNavigation();
  const theme = useTheme();

  function handleNavigate() {
    navigation.navigate('SchedulingComplete')
  }

  return (
    <S.Container>
      <S.Header>
        <BackButton onPress={() => {}} />
      </S.Header>

      <S.CarImages>
        <ImageSlider imagesUrl={['https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png']} />
      </S.CarImages>

      <S.Content>
        <S.Details>
          <S.Description>
            <S.Brand>Lamborghini</S.Brand>
            <S.Name>Huracan</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>Ao Dia</S.Period>
            <S.Price>R$ 580</S.Price>
          </S.Rent>
        </S.Details>

        <S.Acessories>
          <Acessory icon={speedIcon} name="380Km/h" />
          <Acessory icon={accelerationIcon} name="3.2s" />
          <Acessory icon={forceIcon} name="800 HP" />
          <Acessory icon={gasolineIcon} name="Gasolina" />
          <Acessory icon={exchangeIcon} name="Auto" />
          <Acessory icon={peopleIcon} name="2 pessoas" />
        </S.Acessories>

        <S.RentalPeriod>
          <S.CalendarIcon>
              <Feather
                name="calendar"
                size={RFValue(24)}
                color={theme.colors.background_secondary}
              />
          </S.CalendarIcon>

          <S.DateInfo>
            <S.DateTitle>DE</S.DateTitle>
            <S.DateValue>18/06/2021</S.DateValue>
          </S.DateInfo>

            <Feather
            name="chevron-right"
            size={10}
            color={theme.colors.text}
          />
          <S.DateInfo>
            <S.DateTitle>ATÉ</S.DateTitle>
            <S.DateValue>20/06/2021</S.DateValue>
          </S.DateInfo>
            

        </S.RentalPeriod>

        <S.RentalPrice>
          <S.RentalPriceDetails>
          <S.RentalPriceLabel>TOTAL</S.RentalPriceLabel>
          <S.RentalPriceQuota>R$ 500 x3 diárias</S.RentalPriceQuota>
          </S.RentalPriceDetails>
          <S.RentalPriceTotal>R$ 2.900</S.RentalPriceTotal>
        </S.RentalPrice>

      </S.Content>

      <S.Footer>
        <Button 
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleNavigate}
        />
      </S.Footer>
    </S.Container>
  );
}