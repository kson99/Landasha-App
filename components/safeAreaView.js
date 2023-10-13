import { View, Text, Platform, SafeAreaView } from "react-native";
import React from "react";
import { common } from "../styles";

const PlatformSafeAreaView = ({ children }) => {
  if (Platform.OS === "android") {
    return <View style={common.safeArea}>{children}</View>;
  }
  if (Platform.OS === "ios") {
    return <SafeAreaView style={common.safeArea}>{children}</SafeAreaView>;
  }
};

export default PlatformSafeAreaView;
