import React from 'react';

import { Acessory } from '../../components/Acessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import speedIcon from '../../assets/speed.svg';
import accelerationIcon from '../../assets/acceleration.svg';
import forceIcon from '../../assets/force.svg';
import gasolineIcon from '../../assets/gasoline.svg';
import exchangeIcon from '../../assets/exchange.svg';
import peopleIcon from '../../assets/people.svg';

import * as S from './styles';
import { Button } from '../../components/Button';

export function CarDetails() {
  return (
    <S.Container>
      <S.Header>
        <BackButton onPress={() => {}} />
      </S.Header>

      <S.CarImages>
        <ImageSlider imagesUrl={['https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png']} />
      </S.CarImages>

      <S.Content>
        <S.Details>
          <S.Description>
            <S.Brand>Lamborghini</S.Brand>
            <S.Name>Huracan</S.Name>
          </S.Description>

          <S.Rent>
            <S.Period>Ao Dia</S.Period>
            <S.Price>R$ 580</S.Price>
          </S.Rent>
        </S.Details>

        <S.Acessories>
          <Acessory icon={speedIcon} name="380Km/h" />
          <Acessory icon={accelerationIcon} name="3.2s" />
          <Acessory icon={forceIcon} name="800 HP" />
          <Acessory icon={gasolineIcon} name="Gasolina" />
          <Acessory icon={exchangeIcon} name="Auto" />
          <Acessory icon={peopleIcon} name="2 pessoas" />
        </S.Acessories>

        <S.About>
        Este é automóvel desportivo. Surgiu do lendário touro de lide indultado na praça Real Maestranza de Sevilla. É um belíssimo carro para quem gosta de acelerar.
        </S.About>
      </S.Content>

      <S.Footer>
        <Button title="Confirmar" />
      </S.Footer>
    </S.Container>
  );
}