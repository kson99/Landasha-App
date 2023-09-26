import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    width: 100,
    borderWidth: 1 / 2,
    borderColor: COLORS.grey,
    backgroundColor: COLORS.white,
    overflow: "hidden",
    marginVertical: 7,
    borderRadius: 4,
  },

  image: {
    width: "100%",
    height: 100,
  },

  details: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    alignItems: "center",
  },

  priceText: {
    color: "red",
    fontWeight: "bold",
    fontSize: SIZES.medium,
    paddingBottom: 5,
    width: "100%",
    textAlign: "center",
  },
});

export default styles;
