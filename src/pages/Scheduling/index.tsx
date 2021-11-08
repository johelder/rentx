import React, { useState } from "react";

import { Alert, StatusBar } from "react-native";

import { format } from "date-fns";
import { getPlataformDate } from "../../utils/getPlataformDate";

import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "styled-components";

import { BackButton } from "../../components/BackButton";
import { Button } from "../../components/Button";
import {
  Calendar,
  IDateObject,
  IMarkedDateProps,
  generateInterval,
} from "../../components/Calendar";

import ArrowIcon from "../../assets/arrow.svg";

import * as S from "./styles";
import { CarDTO } from "../../dtos/CarDTO";

interface IRentalPeriodProps {
  startDayFormatted: string;
  endingDayFormatted: string;
}

interface IRouteParams {
  car: CarDTO;
}

export function Scheduling() {
  const [lastSelectedDate, setLastSelectedDate] = useState<IDateObject>(
    {} as IDateObject
  );
  const [markedDates, setMarkedDates] = useState<IMarkedDateProps>(
    {} as IMarkedDateProps
  );
  const [rentalPeriod, setRentalPeriod] = useState<IRentalPeriodProps>(
    {} as IRentalPeriodProps
  );

  const navigation = useNavigation();
  const theme = useTheme();
  const route = useRoute();
  const { car } = route.params as IRouteParams;

  function handleNavigate() {
    navigation.navigate("SchedulingDetails", {
      car,
      dates: Object.keys(markedDates),
    });
  }

  function handleBack() {
    navigation.goBack();
  }

  function handleChangeDate(date: IDateObject) {
    let startDay = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let endingDay = date;

    if (startDay.timestamp > endingDay.timestamp) {
      startDay = endingDay;
      endingDay = startDay;
    }

    setLastSelectedDate(endingDay);
    const interval = generateInterval(startDay, endingDay);

    setMarkedDates(interval);

    const firstDateSelected = Object.keys(interval)[0];
    const lastDateSelected =
      Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startDayFormatted: format(
        getPlataformDate(new Date(firstDateSelected)),
        "dd/MM/yyyy"
      ),
      endingDayFormatted: format(
        getPlataformDate(new Date(lastDateSelected)),
        "dd/MM/yyyy"
      ),
    });
  }

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
          Escolha uma {"\n"}
          data de início e {"\n"}
          fim do aluguel
        </S.Title>

        <S.RentPeriod>
          <S.DateInfo>
            <S.DateTitle>DE</S.DateTitle>
            <S.DateValue selected={!!rentalPeriod.startDayFormatted}>
              {rentalPeriod.startDayFormatted}
            </S.DateValue>
          </S.DateInfo>

          <ArrowIcon />

          <S.DateInfo>
            <S.DateTitle>ATÉ</S.DateTitle>
            <S.DateValue selected={!!rentalPeriod.endingDayFormatted}>
              {rentalPeriod.endingDayFormatted}
            </S.DateValue>
          </S.DateInfo>
        </S.RentPeriod>
      </S.Header>

      <S.Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </S.Content>

      <S.Footer>
        <Button
          title="Confirmar"
          onPress={handleNavigate}
          enabled={!!rentalPeriod.startDayFormatted}
        />
      </S.Footer>
    </S.Container>
  );
}
