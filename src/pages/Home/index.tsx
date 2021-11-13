import React, { useCallback, useEffect, useState } from "react";
import { StatusBar, StyleSheet, BackHandler } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { RectButton, PanGestureHandler } from "react-native-gesture-handler";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";
const AnimatedButton = Animated.createAnimatedComponent(RectButton);

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

  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const myCarButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    };
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any) {
      positionX.value = event.translationX + ctx.positionX;
      positionY.value = event.translationY + ctx.positionY;
    },
    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    },
  });

  function handleNavigate(car: CarDTO) {
    navigation.navigate("CarDetails", { car });
  }

  function handleMyCars() {
    navigation.navigate("MyCars");
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

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => true);
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
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleNavigate(item)} />
          )}
        />
      )}

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarButtonStyle,
            { position: "absolute", bottom: 22, right: 16 },
          ]}
        >
          <AnimatedButton
            style={[styles.button, { backgroundColor: theme.colors.main }]}
            onPress={handleMyCars}
          >
            <Ionicons
              name="car-sport"
              size={32}
              color={theme.colors.background_secondary}
            />
          </AnimatedButton>
        </Animated.View>
      </PanGestureHandler>
    </S.Container>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 30,
  },
});
