import React, { useCallback, useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import { api } from "../../services/api";
import { CarDTO } from "../../dtos/CarDTO";

import { Car } from "../../components/Car";

import Logo from "../../assets/logo.svg";

import * as S from "./styles";
import { Load } from "../../components/Load";

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCars = useCallback(async () => {
    try {
      const response = await api.get("/cars");
      setCars(response.data);
      console.log(response.data);
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
          <S.TotalCars>Total de 12 carros</S.TotalCars>
        </S.HeaderContent>
      </S.Header>

      {isLoading ? (
        <Load />
      ) : (
        <S.CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Car data={item} />}
        />
      )}
    </S.Container>
  );
}
