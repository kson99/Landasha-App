import { StatusBar, StyleSheet } from "react-native";
import { COLORS } from "../constants";

const common = StyleSheet.create({
  safeArea: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: COLORS.white,
    flex: 1,
  },

  scrollView: {
    backgroundColor: COLORS.background,
  },

  // Login and Register
  page: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  form: {
    flexDirection: "column",
    alignItems: "center",
    gap: 15,
  },

  input: {
    minWidth: "60%",
    backgroundColor: COLORS.background,
    padding: 10,
    borderRadius: 5,
  },

  btn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "cornflowerblue",
    borderRadius: 10,
    borderWidth: 0,
  },

  btnText: {
    color: COLORS.white,
  },
});

export default common;
