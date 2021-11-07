import React, { useEffect, useState } from 'react';
import { StatusBar, FlatList } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';

import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';

import * as S from './styles';
import { Car } from '../../components/Car';

interface ICarProps {
  id: string;
  user_id: string;
  car: CarDTO;
}

export function MyCars() {
  const [myCars, setMyCars] = useState<ICarProps[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const theme = useTheme();

  async function getCars() {
    try {
      const response = await api.get('schedules_byuser?user_id=1');
      setMyCars(response.data);
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleBack() {
    navigation.goBack();
  }


  useEffect(() => {
    getCars();
  }, []);

  return (
    <S.Container>
       <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <S.Header>
        <BackButton color={theme.colors.shape} onPress={handleBack} />

        <S.Title>
          Seus agendamentos, estão aqui.
        </S.Title>

        <S.SubTitle>
          Conforto, segurança e praticidade.
        </S.SubTitle>
      </S.Header>

      <S.Content>
        <S.Appointments>
          <S.AppointmentsTitle>Agendamentos feitos</S.AppointmentsTitle>
          <S.AppointmentsQuantity>06</S.AppointmentsQuantity>
        </S.Appointments>

        <FlatList
          data={myCars}
          keyExtractor={item => String(item.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Car data={item.car} />
          )}
        />
      </S.Content>
    </S.Container>
  );
}