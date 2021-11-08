import React, { useCallback, useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from "styled-components";

import { api } from "../../services/api";
import { CarDTO } from "../../dtos/CarDTO";

import { Car } from "../../components/Car";
import { Load } from "../../components/Load";

import Logo from "../../assets/logo.svg";

import * as S from "./styles";

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();
  const theme = useTheme();

  function handleNavigate(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
  }

  function handleMyCars() {
    navigation.navigate('MyCars');
  }

  const fetchCars = useCallback(async () => {
    try {
      const response = await api.get("/cars");
      setCars(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <S.Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <S.Header>
        <S.HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          <S.TotalCars>Total de {cars.length} carros</S.TotalCars>
        </S.HeaderContent>
      </S.Header>

      {isLoading ? (
        <Load />
      ) : (
        <S.CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Car data={item} onPress={() => handleNavigate(item)} />}
        />
      )}

      <S.MyCarsButton onPress={handleMyCars}>
        <Ionicons 
          name="car-sport"
          size={32}
          color={theme.colors.background_secondary}
        />
      </S.MyCarsButton>
    </S.Container>
  );
}
