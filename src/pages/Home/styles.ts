import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  height: 113px;

  background-color: ${({ theme }) => theme.colors.header};
`;

export const HeaderContent = styled.View`
  width: 100%;
  height: 100%;

  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;

  padding: 32px 24px;
`;

export const TotalCars = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;

  color: ${({ theme }) => theme.colors.text};
`;

export const CarList = styled.FlatList.attrs({
  contentContainerStyle: {
    padding: 24,
  },
  showsVerticalScrollIndicator: false,
})``;
