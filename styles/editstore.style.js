import { StyleSheet } from "react-native";
import { COLORS } from "../constants";

const editStore = StyleSheet.create({
  form: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    paddingBottom: 20,
  },

  imageHolder: {
    flexDirection: "column",
    alignItems: "center",
  },

  image: {
    width: 180,
    height: 180,
    backgroundColor: COLORS.lightGrey,
  },
});

export default editStore;
