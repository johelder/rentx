import { eachDayOfInterval, format } from "date-fns";

import { IMarkedDateProps, IDateObject } from ".";
import { getPlataformDate } from "../../utils/getPlataformDate";

import theme from "../../styles/theme";

export function generateInterval(
  startDay: IDateObject,
  endingDay: IDateObject
) {
  let interval: IMarkedDateProps = {};

  eachDayOfInterval({
    start: new Date(startDay.timestamp),
    end: new Date(endingDay.timestamp),
  }).forEach((item) => {
    const date = format(getPlataformDate(item), "yyyy-MM-dd");

    interval = {
      ...interval,
      [date]: {
        color:
          startDay.dateString === date || endingDay.dateString === date
            ? theme.colors.main
            : theme.colors.main_light,
        textColor:
          startDay.dateString === date || endingDay.dateString === date
            ? theme.colors.main_light
            : theme.colors.main,
      },
    };
  });

  return interval;
}
