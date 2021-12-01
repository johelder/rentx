import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppTabRoutes } from "./app.tab.routes";
import { AuthRoutes } from "./auth.routes";

import { useAuth } from "../hooks/auth";
import AppLoading from "expo-app-loading";

export function Routes() {
  const { user, loading } = useAuth();

  return loading ? (
    <AppLoading />
  ) : (
    <NavigationContainer>
      {user.id ? <AppTabRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
