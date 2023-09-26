import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    // width: "100%",
    // marginTop: SIZES.medium,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    color: COLORS.primary,
  },

  headerBtn: {
    fontSize: SIZES.medium,
    color: COLORS.grey,
  },

  cardsContainer: {
    marginTop: SIZES.medium,
  },
});

export default styles;
