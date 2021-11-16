import React from "react";

import * as S from "./styles";

interface IBulletProps {
  active?: boolean;
}

export function Bullet({ active }: IBulletProps) {
  return <S.Container active={active} />;
}
