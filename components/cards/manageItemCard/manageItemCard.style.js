import { Dimensions, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants";

const width = Dimensions.get("window").width;
const maxWidth = (width - 20) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    margin: 5,
    borderRadius: 3,
    overflow: "hidden",
    maxWidth: maxWidth,
  },

  image: {
    width: "100%",
    height: 180,
  },

  details: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    alignItems: "center",
  },

  nameText: {
    color: COLORS.primary,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
  },

  priceText: {
    color: "red",
    fontWeight: "bold",
    fontSize: SIZES.medium,
    paddingBottom: 5,
  },

  timestamp: {
    fontSize: SIZES.small,
    paddingTop: 5,
    borderTopColor: COLORS.lightGrey,
    borderTopWidth: 1 / 2,
    width: "90%",
    color: COLORS.grey,
    textAlign: "center",
  },

  crudBox: {
    backgroundColor: COLORS.background,
    width: "100%",
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  crudBtn: {
    flexDirection: "column",
    alignItems: "center",
  },

  crudBtnText: {
    fontSize: SIZES.xSmall,
  },
});

export default styles;
