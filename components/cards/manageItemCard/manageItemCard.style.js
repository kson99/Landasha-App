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
    padding: 5,
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
    borderRadius: 5,
  },

  crudBtn: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },

  crudBtnText: {
    fontSize: SIZES.xSmall,
  },

  confirmText: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginTop: -10,
    paddingBottom: 10,
  },

  itemBox: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    borderTopWidth: 1,
    borderTopColor: "black",
  },

  itemBoxImg: {
    width: 100,
    height: 100,
  },

  itemDetailsBox: {
    flex: 1,
    flexDirection: "column",
    gap: 5,
  },

  itemBoxName: {
    color: COLORS.primary,
    fontWeight: "bold",
  },

  confirmBtns: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingBottom: 10,
  },

  confirmBtn: (dlt) => ({
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: dlt ? "red" : COLORS.grey,
    borderRadius: 10,
  }),

  btnText: {
    color: COLORS.white,
    fontWeight: "600",
  },
});

export default styles;
