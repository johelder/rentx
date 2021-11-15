import React, { useState } from "react";
import { TextInputProps } from "react-native";

import Feather from "@expo/vector-icons/Feather";

import { useTheme } from "styled-components";

import * as S from "./styles";

interface IInputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  value?: string;
}

export function Input({ iconName, value, ...rest }: IInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const theme = useTheme();

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  return (
    <S.Container>
      <S.IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          color={isFocused || isFilled ? theme.colors.main : theme.colors.text}
          size={24}
        />
      </S.IconContainer>

      <S.InputText
        isFocused={isFocused}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
      />
    </S.Container>
  );
}
