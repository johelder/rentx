import React, { useEffect, useState } from "react";
import { StatusBar, FlatList } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";

import { BackButton } from "../../components/BackButton";
import { Car } from "../../components/Car";
import { Load } from "../../components/Load";

import { CarDTO } from "../../dtos/CarDTO";
import { api } from "../../services/api";

import { AntDesign } from "@expo/vector-icons";

import * as S from "./styles";

interface ICarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

export function MyCars() {
  const [myCars, setMyCars] = useState<ICarProps[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const theme = useTheme();

  async function getCars() {
    try {
      const response = await api.get("schedules_byuser?user_id=1");
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

        <S.Title>Seus agendamentos, estão aqui.</S.Title>

        <S.SubTitle>Conforto, segurança e praticidade.</S.SubTitle>
      </S.Header>

      {loading ? (
        <Load />
      ) : (
        <S.Content>
          <S.Appointments>
            <S.AppointmentsTitle>Agendamentos feitos</S.AppointmentsTitle>
            <S.AppointmentsQuantity>{myCars.length}</S.AppointmentsQuantity>
          </S.Appointments>

          <FlatList
            data={myCars}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <S.CarWrapper>
                <Car data={item.car} />
                <S.CarFooter>
                  <S.CarFooterTitle>Período</S.CarFooterTitle>
                  <S.CarFooterPeriod>
                    <S.CarFooterDate>{item.startDate}</S.CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.text}
                      style={{ marginHorizontal: 10 }}
                    />
                    <S.CarFooterDate>{item.endDate}</S.CarFooterDate>
                  </S.CarFooterPeriod>
                </S.CarFooter>
              </S.CarWrapper>
            )}
          />
        </S.Content>
      )}
    </S.Container>
  );
}
