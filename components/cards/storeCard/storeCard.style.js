import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    paddingHorizontal: SIZES.small,
    backgroundColor: COLORS.white,
  },

  image: {
    height: 40,
    width: 40,
    borderRadius: 3,
  },

  shopName: {
    letterSpacing: 2,
    fontWeight: "800",
    fontSize: 20,
    color: COLORS.primary,
  },

  locationCont: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingTop: 2,
  },

  location: {
    fontSize: 14,
    color: COLORS.grey,
    fontWeight: "300",
  },
});

export default styles;
