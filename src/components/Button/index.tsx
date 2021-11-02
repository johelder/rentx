import React from 'react';

import * as S from './styles';

interface IButtonProps {
  title: string;
  color?: string;
  onPress: () => void;
}

export function Button({ title, color, onPress }: IButtonProps) {
  return (
    <S.Container color={color} onPress={onPress}>
      <S.Title>{title}</S.Title>
    </S.Container>
  );
}