import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 130,
    flexDirection: "row",
    gap: 10,
    backgroundColor: COLORS.white,
  },

  image: {
    flex: 0.35,
    paddingVertical: SIZES.xxSmall,
  },

  img: {
    width: "100%",
    height: "100%",
  },

  details: {
    flex: 0.65,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingVertical: SIZES.xxSmall,
    borderBottomColor: COLORS.background,
    borderBottomWidth: 1,
    paddingRight: SIZES.xxSmall,
  },

  name: {
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: "500",
  },

  price: {
    color: "red",
    fontWeight: "bold",
    fontSize: SIZES.large,
    paddingBottom: 5,
  },
});

export default styles;
