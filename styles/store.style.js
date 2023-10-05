import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";

const store = StyleSheet.create({
  profCard: {
    // height: 100,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    paddingHorizontal: SIZES.small,
    backgroundColor: COLORS.white,
    paddingBottom: 10,
    paddingTop: 5,
  },

  image: {
    height: 60,
    width: 60,
    borderRadius: 3,
    backgroundColor: COLORS.lightGrey,
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

  myItems: {
    marginTop: SIZES.xxSmall,
    paddingHorizontal: SIZES.xxSmall,
    minHeight: 200,
    justifyContent: "center",
  },
});

export default store;
