import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  height: 325px;

  background-color: ${({ theme }) => theme.colors.header};

  justify-content: center;
  padding: ${getStatusBarHeight() + 19}px 25px 34px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  font-size: ${RFValue(30)}px;

  color: ${({ theme }) => theme.colors.shape};
  margin-top: 24px;
`;

export const SubTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_400};
  font-size: ${RFValue(15)}px;

  color: ${({ theme }) => theme.colors.shape};
  margin-top: 18px;
`;

export const Content = styled.View`
  flex: 1;

  padding: 0px 16px;
`;

export const Appointments = styled.View`
  width: 100%;

  padding: 24px 0;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const AppointmentsTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;

  color: ${({ theme }) => theme.colors.text};
`;

export const AppointmentsQuantity = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_500};
  font-size: ${RFValue(15)}px;

  color: ${({ theme }) => theme.colors.title};
`;
