import { Dimensions, StatusBar, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";

const height = Math.floor(Dimensions.get("window").height / 2);
const width = Dimensions.get("window").width;

const itemView = StyleSheet.create({
  safeArea: {
    // paddingTop: StatusBar.currentHeight,
    backgroundColor: COLORS.white,
    flex: 1,
  },

  appBar: {
    position: "absolute",
    top: StatusBar.currentHeight + 2,
    left: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 50,
    paddingHorizontal: 3,
  },

  imageBox: {
    position: "relative",
  },

  imgWrap: {
    backgroundColor: "black",
    width: width,
    height: width,
  },

  imagesNav: {
    width: "100%",
    backgroundColor: COLORS.white,
    padding: 10,
    flexDirection: "row",
    columnGap: 10,
  },

  imgIndicator: {
    position: "absolute",
    right: 10,
    bottom: 10,
    padding: 5,
    backgroundColor: "rgba(0,0,0,.4)",
    borderRadius: 15,
  },

  imgIndicatorText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "600",
  },

  navTab: (activeTab, item) => ({
    borderWidth: 1,
    borderColor: activeTab === item ? "red" : "transparent",
  }),

  navTabImg: {
    width: 50,
    height: 50,
  },

  priceBox: {
    marginTop: 2,
    padding: 10,
    backgroundColor: COLORS.white,
  },

  price: {
    color: "red",
    fontSize: 24,
    fontWeight: "700",
  },

  titleBox: {
    marginTop: 5,
    padding: 10,
    backgroundColor: COLORS.white,
  },

  title: {
    fontWeight: "700",
    fontSize: 18,
  },

  descriptionBox: {
    marginTop: 5,
    padding: 10,
    backgroundColor: COLORS.white,
  },

  description: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: COLORS.background,
    fontWeight: "300",
    lineHeight: 20,
    fontSize: 13,
    letterSpacing: 1,
  },

  buttonsBox: {
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: COLORS.white,
    height: 55,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  buttons: {
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonsTxt: {
    fontSize: 12,
    color: COLORS.grey,
  },

  otherItems: {
    marginTop: SIZES.xxSmall,
    paddingHorizontal: SIZES.xxSmall,
    minHeight: 200,
    justifyContent: "center",
  },

  netError: {
    flex: 1,
    height: "100%",
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },

  loading: {
    flex: 1,
    height: "100%",
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },

  buyBtn: {
    width: "30%",
    backgroundColor: "red",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  buyBtnPrice: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },

  buyBtnTxt: {
    color: COLORS.white,
    fontWeight: "400",
  },
});

export default itemView;
