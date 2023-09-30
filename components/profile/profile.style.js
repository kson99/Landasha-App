import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  profCard: {
    position: "relative",
    height: 100,
    flexDirection: "row",
    gap: 15,
    paddingVertical: 10,
    paddingHorizontal: SIZES.small,
    backgroundColor: COLORS.white,
  },

  image: {
    height: 60,
    width: 60,
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

  myItems: {
    marginTop: SIZES.xxSmall,
    paddingHorizontal: SIZES.xxSmall,
    minHeight: 200,
    justifyContent: "center",
  },

  option: {
    position: "absolute",
    right: 5,
    top: 10,
  },

  menu: {
    height: 500,
    position: "absolute",
    right: 10,
    // top: 5,
    bottom: 10,
    backgroundColor: COLORS.custGrey,
    zIndex: 999,
  },
});

export default styles;
