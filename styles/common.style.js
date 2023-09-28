import { StatusBar, StyleSheet } from "react-native";
import { COLORS } from "../constants";

const common = StyleSheet.create({
  safeArea: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: COLORS.white,
    flex: 1,
  },
});

export default common;
