import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";

const styles = StyleSheet.create({
  outline: () => ({
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
    borderRadius: 10,
    overflow: "hidden",
  }),

  input: {
    minWidth: "80%",
    backgroundColor: COLORS.grey_100,
    padding: 10,
    borderRadius: 5,
  },
});

export default styles;
