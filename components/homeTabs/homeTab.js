import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import ForSale from "../forSale";
import Closets from "../closets";
import Rentals from "../rentals";
import Recents from "../recents";
import Items from "../items";
import { COLORS, SIZES } from "../../constants";

const HomeTab = () => {
  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      <View style={styles.scrollContainer}>
        <View style={styles.rentClosetContainer}>
          <ForSale />
          <Closets />
          <Rentals />
        </View>
        <Recents />
        <Items />
        <View style={{ height: 10 }} />
      </View>
    </ScrollView>
  );
};

export default HomeTab;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },

  rentClosetContainer: {
    backgroundColor: COLORS.white,
    flexDirection: "row",
    marginTop: SIZES.xxSmall,
    paddingVertical: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
    minHeight: 150,
  },
});
