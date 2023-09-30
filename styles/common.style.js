import { StatusBar, StyleSheet } from "react-native";
import { COLORS } from "../constants";

const common = StyleSheet.create({
  safeArea: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: COLORS.white,
    flex: 1,
  },

  scrollView: {
    minHeight: "100%",
    backgroundColor: COLORS.background,
  },

  // Login and Register
  page: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  pageV2: {
    width: "100%",
    padding: 20,
    flex: 1,
  },

  form: {
    flexDirection: "column",
    alignItems: "center",
    gap: 15,
  },

  formV2: {
    flexDirection: "column",
    // alignItems: "center",
    alignItems: "flex-start",
    gap: 20,
  },

  input: {
    minWidth: "60%",
    backgroundColor: COLORS.background,
    padding: 10,
    borderRadius: 5,
  },

  inputV2: {
    minWidth: "100%",
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 5,
  },

  inputV3: {
    minWidth: "100%",
    padding: 10,
    borderRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },

  select: {
    minWidth: "100%",
    padding: 10,
    borderRadius: 5,
  },

  textArea: {
    minWidth: "100%",
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 5,
    height: 150,
  },

  inputLabel: {
    color: COLORS.primary,
    paddingBottom: 5,
  },

  inputLabelV2: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: "300",
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

  modalCont: {
    backgroundColor: "rgba(0,0,0,0.4)",
    flex: 1,
    flexDirection: "column",
  },

  modalClose: {
    width: "100%",
    flex: 1,
  },

  modalMenu: {
    backgroundColor: COLORS.white,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: "100%",
    // minHeight: "30%",
    paddingVertical: 20,
  },

  modalMenuOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  modalMenuOptionText: {
    fontSize: 18,
    textTransform: "capitalize",
  },
});

export default common;
