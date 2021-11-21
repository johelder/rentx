import styled, { css } from "styled-components/native";
import { StyleSheet } from "react-native";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";

interface IOptionProps {
  active: boolean;
}

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  height: 227px;

  background-color: ${({ theme }) => theme.colors.header};

  padding: 0 24px;
  align-items: center;
`;

export const HeaderTop = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: ${getStatusBarHeight() + 18}px;
`;

export const HeaderTitle = styled.Text`
  font-size: ${RFValue(25)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};

  color: ${({ theme }) => theme.colors.background_secondary};
`;

export const SignOutButton = styled(BorderlessButton)``;

export const PhotoContainer = styled.View`
  width: 180px;
  height: 180px;

  border-radius: 90px;
  background-color: ${({ theme }) => theme.colors.text_detail};

  margin-top: 30px;
`;

export const Photo = styled.Image`
  width: 180px;
  height: 180px;

  border-radius: 90px;
`;

export const PhotoButton = styled(RectButton)`
  width: 40px;
  height: 40px;

  background-color: ${({ theme }) => theme.colors.main};

  align-items: center;
  justify-content: center;

  position: absolute;
  bottom: 0px;
  right: 10px;
`;

export const Content = styled.View`
  padding: 0 24px;
  margin-top: 122px;
  align-items: center;
`;

export const Options = styled.View`
  width: 100%;

  margin-bottom: 24px;

  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-bottom-color: ${({ theme }) => theme.colors.line};
`;

export const Option = styled.TouchableOpacity<IOptionProps>`
  padding-bottom: 14px;
  
  ${({ theme, active }) =>
    active &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.main};
    `}
`;

export const OptionTitle = styled.Text<IOptionProps>`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme, active }) =>
    active ? theme.fonts.secondary_600 : theme.fonts.secondary_400};

  color: ${({ theme, active }) =>
    active ? theme.colors.header : theme.colors.text_detail};
`;

export const Section = styled.View`
  width: 100%;
`;
