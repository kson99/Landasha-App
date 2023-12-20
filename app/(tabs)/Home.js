import React from "react";
import {
  HomeTab,
  OtherTabs,
  PlatformSafeAreaView,
  SearchBtn,
} from "../../components";
import { subCategories } from "../../grobal/context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

const Home = () => {
  return (
    <PlatformSafeAreaView>
      <SearchBtn />
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarItemStyle: { width: "auto" },
          tabBarIndicatorStyle: {
            borderBottomColor: "red",
            borderBottomWidth: 2,
          },
          tabBarLabelStyle: { fontSize: 10, fontWeight: "600" },
          tabBarActiveTintColor: "red",
          tabBarInactiveTintColor: "grey",
        }}
      >
        <Tab.Screen name="Home " component={HomeTab} />
        {subCategories.map((cat) => (
          <Tab.Screen name={cat} component={OtherTabs} key={cat} />
        ))}
      </Tab.Navigator>
    </PlatformSafeAreaView>
  );
};

export default Home;
