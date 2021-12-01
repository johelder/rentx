import React, { useCallback, useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import { useNavigation } from "@react-navigation/native";

import { useNetInfo } from "@react-native-community/netinfo";

import { synchronize } from "@nozbe/watermelondb/sync";

import { database } from "../../database";
import { Car as ModelCar } from "../../database/model/Car";

import { api } from "../../services/api";

import { Car } from "../../components/Car";
import { LoadAnimation } from "../../components/LoadAnimation";

import Logo from "../../assets/logo.svg";

import * as S from "./styles";

export function Home() {
  const [cars, setCars] = useState<ModelCar[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();
  const netInfo = useNetInfo();

  function handleNavigate(car: ModelCar) {
    navigation.navigate("CarDetails", { car });
  }

  const fetchCars = useCallback(async () => {
    try {
      const carCollection = database.get<ModelCar>('cars');
      const cars = await carCollection.query().fetch();
      setCars(cars);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }, []);

  async function offlineSynchronize() {
    synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const response = await api.get(
          `cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`
        );

        const { changes, latestVersion } = response.data;
        return { changes, timestamp: latestVersion };
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        await api.post("cars/sync", user);
      },
    });
  }

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    if(netInfo.isConnected) {
      offlineSynchronize();
    }
  }, [netInfo.isConnected]);

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
          {!isLoading && (
            <S.TotalCars>Total de {cars.length} carros</S.TotalCars>
          )}
        </S.HeaderContent>
      </S.Header>

      {isLoading ? (
        <LoadAnimation />
      ) : (
        <S.CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleNavigate(item)} />
          )}
        />
      )}
    </S.Container>
  );
}
