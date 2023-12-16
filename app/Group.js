import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { common } from "../styles";

const Group = () => {
  const { category } = useLocalSearchParams();

  return (
    <View style={common.page}>
      <Stack.Screen
        options={{
          title: category,
          headerShadowVisible: false,
        }}
      />

      <View style={{ flex: 1 }}></View>
    </View>
  );
};

export default Group;

const styles = StyleSheet.create({});
