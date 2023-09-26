import { StatusBar, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";

const search = StyleSheet.create({
  safeArea: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: COLORS.white,
    flex: 1,
  },

  appBar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
  },

  searchBox: {
    backgroundColor: COLORS.background,
    width: "75%",
    height: 35,
    borderRadius: 5,
  },

  searchInput: {
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.small,
  },

  btn: {
    padding: 1,
    borderRadius: 50,
  },
});

export default search;
