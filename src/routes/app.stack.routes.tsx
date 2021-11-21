import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "../pages/Home";
import { CarDetails } from "../pages/CarDetails";
import { Scheduling } from "../pages/Scheduling";
import { SchedulingDetails } from "../pages/SchedulingDetails";
import { Confirmation } from "../pages/Confirmation";
import { MyCars } from "../pages/MyCars";
import { Splash } from "../pages/Splash";
import { SignIn } from "../pages/SignIn";
import { SignUpFirstStep } from "../pages/SignUp/SignUpFirstStep";
import { SignUpSecondStep } from "../pages/SignUp/SignUpSecondStep";

const { Navigator, Screen } = createStackNavigator();

export function AppStackRoutes() {
  return (
    <Navigator headerMode="none" initialRouteName="Home">
      <Screen name="Splash" component={Splash} />
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUpFirstStep" component={SignUpFirstStep} />
      <Screen name="SignUpSecondStep" component={SignUpSecondStep} />
      <Screen
        name="Home"
        component={Home}
        options={{
          gestureEnabled: false,
        }}
      />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="Confirmation" component={Confirmation} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
}
