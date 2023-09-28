import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const styles = StyleSheet.create({
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
    backgroundColor: COLORS.grey,
    borderRadius: 10,
    borderWidth: 0,
  },

  btnText: {
    color: COLORS.white,
  },

  registerTxt: {
    textDecorationLine: "underline",
    color: "blue",
  },
});

export default styles;
