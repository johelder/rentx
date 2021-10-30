import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.header};

  padding: 65px 0;
`;

export const Content = styled.View`
  align-items: center;

  padding: 0 75px 60px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  font-size: ${RFValue(30)}px;

  color: ${({ theme }) => theme.colors.background_secondary};

  margin-top: 35px;
`;

export const Message = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;

  text-align: center;
  line-height: 25px;

  color: ${({ theme }) => theme.colors.text};
`;

export const Footer = styled.View`
  width: 100%;

  align-items: center;
  justify-content: center;
`;
