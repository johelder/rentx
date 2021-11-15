import styled, { css } from "styled-components/native";
import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

interface IProps {
  isFocused: boolean;
}

export const Container = styled.View`
  flex-direction: row;

  margin-bottom: 8px;
`;

export const IconContainer = styled.View<IProps>`
  width: 55px;
  height: 55px;

  align-items: center;
  justify-content: center;

  margin-right: 2px;

  background-color: ${({ theme }) => theme.colors.background_secondary};

  ${({ theme, isFocused }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `}
`;

export const InputText = styled(TextInput)<IProps>`
  flex: 1;

  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.primary_400};

  padding: 0 24px;

  background-color: ${({ theme }) => theme.colors.background_secondary};
  color: ${({ theme }) => theme.colors.text_detail};

  ${({ theme, isFocused }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `}
`;
