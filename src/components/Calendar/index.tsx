import React from 'react';

import { Calendar as CustomCalendar, LocaleConfig} from 'react-native-calendars';

import { ptBR } from './localeConfig';
import { generateInterval } from './generateInterval';

import Feather from '@expo/vector-icons/Feather';

import { useTheme } from 'styled-components';

LocaleConfig.locales['pt-br'] = ptBR;

LocaleConfig.defaultLocale = 'pt-br';

interface IDateObject {
  day: number;
  dateString: string;
  month: number;
  timestamp: number;
  year: number;
}

interface IMarkedDateProps {
  [date: string]: {
    color: string;
    textColor: string;
    disabled?: boolean;
    disabledTouchEvent?: boolean;
  }
}

interface ICalendarProps {
  markedDates: IMarkedDateProps;
  onDayPress: (date: IDateObject) => void;
}

function Calendar({ markedDates, onDayPress }: ICalendarProps) {
  const theme = useTheme();

  return (
    <CustomCalendar
      renderArrow={direction => 
        <Feather
          size={24}
          color={theme.colors.text}
          name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
       />
      }
      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text_detail,
        paddingBottom: 10,
        marginBottom: 10,
      }}
      theme={{
        textDayFontFamily: theme.fonts.primary_400,
        textDayHeaderFontFamily: theme.fonts.primary_500,
        textDayHeaderFontSize: 10,
        textMonthFontFamily: theme.fonts.secondary_600,
        textMonthFontSize: 20,
        monthTextColor: theme.colors.title,
        arrowStyle: {
          marginHorizontal: -15
        }
      }}
      firstDay={1}
      minDate={new Date()}
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  );
}

export { IDateObject, IMarkedDateProps, Calendar, generateInterval }