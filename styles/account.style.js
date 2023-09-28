import { StyleSheet } from "react-native";
import { COLORS } from "../constants";

const account = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
  },

  text: {
    maxWidth: "70%",
    textAlign: "center",
    color: COLORS.primary,
  },
});

export default account;
