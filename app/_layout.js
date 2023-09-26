import { Stack } from "expo-router";
import React from "react";
import Context from "../grobal/context";

function Layout() {
  return (
    <Context>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="Search" />
      </Stack>
    </Context>
  );
}

export default Layout;
