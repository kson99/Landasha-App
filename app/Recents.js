import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { appContext, width } from "../grobal/context";
import { ItemCard } from "../components";

const Recents = () => {
  const { items } = useContext(appContext);
  const columnNum = Math.floor(width / 180);

  const sorted = items.sort((a, b) => {
    return b.timestamp * 1 - a.timestamp * 1;
  });

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={sorted}
        renderItem={({ item }) => <ItemCard item={item} />}
        keyExtractor={(item) => item?.id}
        numColumns={columnNum}
      />

      <View style={{ height: 20 }} />
    </View>
  );
};

export default Recents;

const styles = StyleSheet.create({});
