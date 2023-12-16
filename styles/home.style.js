import { Dimensions, StatusBar, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";
const { width, height } = Dimensions.get("window");

const home = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    minHeight: "100%",
  },

  scrollContainer: {
    flex: 1,
    width,
    minHeight: height,
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

export default home;
