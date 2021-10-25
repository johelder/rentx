import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  width: 109px;
  height: 92px;

  padding: 16px;
  margin-top: 8px;

  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(13)}px;

  color: ${({ theme }) => theme.colors.text};
`;
