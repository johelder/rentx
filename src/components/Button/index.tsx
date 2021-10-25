import React from 'react';

import * as S from './styles';

interface IButtonProps {
  title: string;
  color?: string;
}

export function Button({ title, color, ...rest }: IButtonProps) {
  return (
    <S.Container color={color} {...rest}>
      <S.Title>{title}</S.Title>
    </S.Container>
  );
}