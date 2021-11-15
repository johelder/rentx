import styled from "styled-components/native";
import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex-direction: row;
`;

export const IconContainer = styled.View`
  width: 55px;
  height: 55px;

  align-items: center;
  justify-content: center;

  margin-right: 2px;

  background-color: ${({ theme }) => theme.colors.background_secondary};
`;

export const InputText = styled(TextInput)`
  flex: 1;

  font-size: ${RFValue(15)}px;
  font-family: ${({theme}) => theme.fonts.primary_400};

  padding: 0 24px;

  background-color: ${({ theme }) => theme.colors.background_secondary};
  color: ${({ theme }) => theme.colors.text_detail};
`;
