import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  position: absolute;
  margin-top: ${getStatusBarHeight() + 18}px;
  margin-left: 24px;
`;

export const CarImages = styled.View`
  margin-top: ${getStatusBarHeight() + 32}px;
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 24,
    alignItems: "center",
  },
  showsVerticalScrollIndicator: false,
})``;

export const Details = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: 30px;
`;

export const Description = styled.View``;

export const Brand = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(10)}px;

  text-transform: uppercase;

  color: ${({ theme }) => theme.colors.text_detail};
`;

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(25)}px;

  color: ${({ theme }) => theme.colors.title};
`;

export const Rent = styled.View``;

export const Period = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(10)}px;

  text-transform: uppercase;

  color: ${({ theme }) => theme.colors.text_detail};
`;

export const Price = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(25)}px;

  color: ${({ theme }) => theme.colors.main};
`;

export const Acessories = styled.View`
  width: 100%;

  flex-direction: row;
  flex-wrap: wrap;

  align-items: center;
  justify-content: space-between;

  margin-top: 16px;
`;

export const RentalPeriod = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: 40px;
  padding-bottom: 16px;

  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.line};
`;

export const CalendarIcon = styled.View`
  width: 48px;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.main};
`;

export const DateInfo = styled.View``;

export const DateTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(10)}px;

  text-transform: uppercase;

  color: ${({ theme }) => theme.colors.text_detail};
`;

export const DateValue = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;

  color: ${({ theme }) => theme.colors.title};
`;

export const Footer = styled.View`
  width: 100%;

  padding: 24px 24px ${getBottomSpace() + 24}px;

  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const RentalPrice = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 16px 0;
`;

export const RentalPriceDetails = styled.View``;

export const RentalPriceLabel = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(10)}px;

  text-transform: uppercase;

  color: ${({ theme }) => theme.colors.text_detail};
`;

export const RentalPriceQuota = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(15)}px;

  color: ${({ theme }) => theme.colors.title};
`;

export const RentalPriceTotal = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(24)}px;

  color: ${({ theme }) => theme.colors.success};
`;
