import React, { useEffect } from "react";

import BrandIcon from "../../assets/brand.svg";
import LogoIcon from "../../assets/logo.svg";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

import * as S from "./styles";

export function Splash() {
  const animation = useSharedValue(0);

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animation.value, [0, 50], [1, 0]),
      transform: [
        {
          translateX: interpolate(
            animation.value,
            [0, 50],
            [0, -50],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animation.value, [0, 50], [0, 1]),
      transform: [
        {
          translateX: interpolate(
            animation.value,
            [0, 50],
            [-50, 0],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  useEffect(() => {
    animation.value = withTiming(50, { duration: 1000 });
  }, []);

  return (
    <S.Container>
      <Animated.View style={[brandStyle, { position: 'absolute' }]}>
        <BrandIcon width={80} height={50} />
      </Animated.View>

      <Animated.View style={[logoStyle, { position: 'absolute' }]}>
        <LogoIcon width={120} height={80} />
      </Animated.View>
    </S.Container>
  );
}
