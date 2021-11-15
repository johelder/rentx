import React from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";

import * as S from "./styles";

interface IButtonProps {
  title: string;
  color?: string;
  onPress: () => void;
  enabled?: boolean;
  loading?: boolean;
  light?: boolean;
}

export function Button({
  title,
  color,
  onPress,
  enabled = true,
  loading = false,
  light = false,
}: IButtonProps) {
  const theme = useTheme();

  return (
    <S.Container
      color={color}
      onPress={onPress}
      enabled={enabled}
      style={{ opacity: enabled === false || loading ? 0.5 : 1 }}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.shape} />
      ) : (
        <S.Title light={light}>{title}</S.Title>
      )}
    </S.Container>
  );
}
