import { StatusBar, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";

const collection = StyleSheet.create({
  safeArea: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: COLORS.white,
    flex: 1,
  },

  list: {
    paddingVertical: SIZES.xxSmall,
  },
});

export default collection;
