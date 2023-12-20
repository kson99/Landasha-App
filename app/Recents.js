import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { appContext, width } from "../grobal/context";
import { ItemCard } from "../components";
import { SIZES } from "../constants";

const Recents = () => {
  const { items } = useContext(appContext);
  const columnNum = Math.floor(width / 180);

  const sorted = items.sort((a, b) => {
    return b.timestamp * 1 - a.timestamp * 1;
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={sorted}
        renderItem={({ item }) => <ItemCard item={item} />}
        contentContainerStyle={{ gap: 5 }}
        keyExtractor={(item) => item?.id}
        numColumns={columnNum}
        columnWrapperStyle={{ justifyContent: "space-around" }}
      />

      <View style={{ height: 20 }} />
    </View>
  );
};

export default Recents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: SIZES.xxSmall,
    paddingHorizontal: SIZES.xxSmall,
  },
});
