import React, { useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";

import { RFValue } from "react-native-responsive-fontsize";
import { format } from "date-fns";

import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "styled-components";

import { api } from "../../services/api";

import { CarDTO } from "../../dtos/CarDTO";

import { getAccesoryIcon } from "../../utils/getAccessoryIcon";
import { getPlataformDate } from "../../utils/getPlataformDate";

import { Accessory } from "../../components/Accessory";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Button } from "../../components/Button";

import Feather from "@expo/vector-icons/Feather";

import * as S from "./styles";

interface IRouteParams {
  car: CarDTO;
  dates: string[];
}

interface IRentalPeriodProps {
  startDayFormatted: string;
  endingDayFormatted: string;
}

export function SchedulingDetails() {
  const [rentalPeriod, setRentalPeriod] = useState<IRentalPeriodProps>(
    {} as IRentalPeriodProps
  );
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const theme = useTheme();
  const route = useRoute();

  const { car, dates } = route.params as IRouteParams;

  const rentalTotal = useMemo(() => {
    return Number(car.rent.price * dates.length);
  }, []);

  async function handleConfirmRental() {
    setLoading(true);
    const SchedulesByCar = await api.get(`schedules_bycars/${car.id}`);

    const unavailable_dates = {
      ...SchedulesByCar.data.unavailable_dates,
      ...dates,
    };

    await api
      .post("/schedules_byuser", {
        user_id: 1,
        car,
        startDate: rentalPeriod.startDayFormatted,
        endDate: rentalPeriod.endingDayFormatted,
      })
      .catch(() =>
        Alert.alert(
          "Tente novamente mais tarde, ocorreu um erro ao alugar o carro."
        )
      );

    await api
      .put(`schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates,
      })
      .then(() => navigation.navigate("SchedulingComplete"))
      .catch(() => {
        Alert.alert(
          "Tente novamente mais tarde, ocorreu um erro ao alugar o carro."
        );
        setLoading(false);
      });
  }

  function handleBack() {
    navigation.goBack();
  }

  useEffect(() => {
    setRentalPeriod({
      startDayFormatted: format(
        getPlataformDate(new Date(dates[0])),
        "dd/MM/yyyy"
      ),
      endingDayFormatted: format(
        getPlataformDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy"
      ),
    });
  }, []);

  return (
    <S.Container>
      <S.Header>
        <BackButton onPress={handleBack} />
      </S.Header>

      <S.CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </S.CarImages>

      <S.Content>
        <S.Details>
          <S.Description>
            <S.Brand>{car.brand}</S.Brand>
            <S.Name>{car.name}</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>Ao Dia</S.Period>
            <S.Price>R$ {car.rent.price}</S.Price>
          </S.Rent>
        </S.Details>

        <S.Acessories>
          {car.accessories.map((accessory) => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccesoryIcon(accessory.type)}
            />
          ))}
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
            <S.DateValue>{rentalPeriod.startDayFormatted}</S.DateValue>
          </S.DateInfo>

          <Feather name="chevron-right" size={10} color={theme.colors.text} />
          <S.DateInfo>
            <S.DateTitle>ATÉ</S.DateTitle>
            <S.DateValue>{rentalPeriod.endingDayFormatted}</S.DateValue>
          </S.DateInfo>
        </S.RentalPeriod>

        <S.RentalPrice>
          <S.RentalPriceDetails>
            <S.RentalPriceLabel>TOTAL</S.RentalPriceLabel>
            <S.RentalPriceQuota>{`R$ ${car.rent.price} x${dates.length} diárias`}</S.RentalPriceQuota>
          </S.RentalPriceDetails>
          <S.RentalPriceTotal>R$ {rentalTotal}</S.RentalPriceTotal>
        </S.RentalPrice>
      </S.Content>

      <S.Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirmRental}
          enabled={!loading}
          loading={loading}
        />
      </S.Footer>
    </S.Container>
  );
}
