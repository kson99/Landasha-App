import { Stack } from "expo-router";
import React, { useRef, useState } from "react";
import Context from "../grobal/context";

function Layout() {
  return (
    <Context>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="Search" options={{ headerShown: false }} />
        <Stack.Screen
          name="store/[_userUid]"
          options={{
            title: "",
            headerShadowVisible: false,
          }}
        />

        <Stack.Screen name="item-view/[_id]" options={{ headerShown: false }} />

        <Stack.Screen
          name="Login"
          options={{
            headerTitleAlign: "center",
            headerBackTitleVisible: false,
          }}
        />

        <Stack.Screen
          name="Register"
          options={{
            headerTitleAlign: "center",
            headerBackTitleVisible: false,
          }}
        />

        <Stack.Screen
          name="EditStore"
          options={{
            title: "Edit Store",
            headerTitleAlign: "center",
            headerBackTitleVisible: false,
          }}
        />

        <Stack.Screen
          name="AddItem"
          options={{
            title: "Add Item",
            headerTitleAlign: "center",
            headerBackTitleVisible: false,
          }}
        />
      </Stack>
    </Context>
  );
}

export default Layout;
