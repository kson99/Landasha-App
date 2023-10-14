import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 120,
    flexDirection: "row",
    gap: 15,
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
  },

  image: {
    flex: 0.35,
    paddingVertical: SIZES.xxSmall,
    justifyContent: "center",
    alignItems: "center",
  },

  img: {
    width: "80%",
    height: "80%",
  },

  details: {
    flex: 0.65,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingVertical: SIZES.xxSmall,
    // borderBottomColor: COLORS.background,
    // borderBottomWidth: 1,
    paddingRight: SIZES.xxSmall,
  },

  name: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "500",
  },

  price: {
    color: "red",
    fontWeight: "bold",
    fontSize: 20,
    paddingBottom: 5,
  },
});

export default styles;
