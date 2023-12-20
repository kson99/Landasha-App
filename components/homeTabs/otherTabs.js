import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import React, { useContext } from "react";
import { appContext, width } from "../../grobal/context";
import { COLORS, SIZES } from "../../constants";
import ItemCard from "../cards/itemCard";

const OtherTabs = () => {
  const { name } = useRoute();
  const { items, isLoading, error } = useContext(appContext);
  const columnNum = Math.floor(width / 180);

  const catItems = () => {
    let array = [];

    items.map((item) => {
      if (item.subCategory === name) {
        array.push(item);
      }
    });

    return array;
  };

  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {catItems().length > 0 ? (
          <FlatList
            data={catItems()}
            renderItem={({ item }) => <ItemCard item={item} />}
            keyExtractor={(item) => item?.id}
            numColumns={columnNum}
            scrollEnabled={false}
          />
        ) : (
          <View style={styles.noData}>
            <Text style={styles.noDataText}>No items found</Text>
          </View>
        )}
        {/* )} */}
      </View>
    </ScrollView>
  );
};

export default OtherTabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    color: COLORS.primary,
  },

  headerBtn: {
    fontSize: SIZES.medium,
    color: COLORS.grey,
  },

  networkError: {
    height: "100%",
    backgroundColor: COLORS.white,
    paddingTop: 50,
    alignItems: "center",
  },

  noData: {
    height: 100,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  noDataText: {
    fontWeight: "600",
    color: COLORS.grey,
  },
});
