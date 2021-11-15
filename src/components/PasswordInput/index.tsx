import React, { useState } from "react";
import { TextInputProps } from "react-native";

import { BorderlessButton } from "react-native-gesture-handler";

import Feather from "@expo/vector-icons/Feather";

import { useTheme } from "styled-components";

import * as S from "./styles";

interface IInputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  value;
}

export function PasswordInput({ iconName, value, ...rest }: IInputProps) {
  const [isVisiblePassword, setIsVisiblePassword] = useState(true);
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

  function handleVisibilityPassword() {
    setIsVisiblePassword((prevState) => !prevState);
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
        secureTextEntry={isVisiblePassword}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        {...rest}
      />

      <BorderlessButton onPress={handleVisibilityPassword}>
        <S.IconContainer isFocused={isFocused}>
          <Feather
            name={isVisiblePassword ? "eye" : "eye-off"}
            color={theme.colors.text}
            size={24}
          />
        </S.IconContainer>
      </BorderlessButton>
    </S.Container>
  );
}
