import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface IContainerProps {
  color: string;
}

interface IButtonTextProps {
  light: boolean;
}

export const Container = styled(RectButton)<IContainerProps>`
  width: 100%;

  padding: 16px;

  justify-content: center;
  align-items: center;

  background-color: ${({ theme, color }) =>
    color ? color : theme.colors.main};

  margin-bottom: 8px;
`;

export const Title = styled.Text<IButtonTextProps>`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;

  color: ${({ theme, light }) =>
    light ? theme.colors.header : theme.colors.shape};
`;
