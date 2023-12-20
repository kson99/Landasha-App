import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { appContext, width } from "../../grobal/context";
import { ItemCard } from "../../components";
import { SIZES } from "../../constants";

const Category = () => {
  const { cat } = useLocalSearchParams();
  const { items } = useContext(appContext);
  const columnNum = Math.floor(width / 180);

  const catItems = () => {
    let array = [];

    items.map((item) => {
      if (item.category === cat) {
        array.push(item);
      }
    });

    return array;
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: cat,
          headerShadowVisible: false,
        }}
      />

      <ScrollView>
        <View style={styles.container}>
          <FlatList
            data={catItems()}
            renderItem={({ item }) => <ItemCard item={item} />}
            keyExtractor={(item) => item?.id}
            columnWrapperStyle={{ justifyContent: "space-around" }}
            contentContainerStyle={{ gap: 5 }}
            numColumns={columnNum}
            scrollEnabled={false}
          />
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xxSmall,
    paddingHorizontal: SIZES.xxSmall,
  },
});
