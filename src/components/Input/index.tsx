import React from "react";
import { TextInputProps } from "react-native";

import Feather from "@expo/vector-icons/Feather";

import { useTheme } from "styled-components";

import * as S from "./styles";

interface IInputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
}

export function Input({ iconName, ...rest }: IInputProps) {
  const theme = useTheme();

  return (
    <S.Container>
      <S.IconContainer>
        <Feather name={iconName} color={theme.colors.text} size={24} />
      </S.IconContainer>

      <S.InputText {...rest} />
    </S.Container>
  );
}
