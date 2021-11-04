import React from 'react';
import { SvgProps } from 'react-native-svg';

import * as S from './styles';

interface IAccessoryProps {
  icon: React.FC<SvgProps>;
  name: string;
}

export function Accessory({ icon: Icon, name }: IAccessoryProps) {
  return (
    <S.Container>
      <Icon width={32} height={32} />
      <S.Name>{name}</S.Name>
    </S.Container>
  );
}