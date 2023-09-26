import React from "react";
import { Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home-sharp" : "home-outline";
          } else if (route.name === "AddItem") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "Stores") {
            iconName = focused ? "storefront" : "storefront-outline";
          } else if (route.name === "Collection") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "Account") {
            iconName = focused ? "md-person-sharp" : "md-person-outline";
          }

          if (route.name === "Stores") {
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          } else {
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tabs.Screen
        name="Home"
        options={{
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="Stores"
        options={{
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="Collection"
        options={{
          headerTitleAlign: "center",
        }}
      />

      <Tabs.Screen
        name="Account"
        options={{
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
