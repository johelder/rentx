import React, { useRef, useState } from "react";
import { FlatList, ViewToken } from "react-native";

import * as S from "./styles";

interface IImageSliderProps {
  imagesUrl: string[];
}

interface ICarrosselImageChangedInfoProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
} 

export function ImageSlider({ imagesUrl }: IImageSliderProps) {
  const [imageIndex, setImageIndex] = useState(0);

  const imageIndexRef = useRef((info: ICarrosselImageChangedInfoProps) => {
    const index = info.viewableItems[0].index!;
    setImageIndex(index);
  });

  return (
    <S.Container>
      <S.ImageIndexes>
        {imagesUrl.map((_, index) => (
          <S.ImageIndex key={String(index)} active={index === imageIndex} />
        ))}
      </S.ImageIndexes>

      <FlatList
        data={imagesUrl}
        keyExtractor={(key) => key}
        renderItem={({ item }) => (
          <S.CarImageWrapper>
            <S.CarImage source={{ uri: item }} resizeMode="contain" />
          </S.CarImageWrapper>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={imageIndexRef.current}
      />
    </S.Container>
  );
}
