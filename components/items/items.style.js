import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xxSmall,
    paddingHorizontal: SIZES.xxSmall,
    minHeight: 200,
    justifyContent: "center",
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

  networkError: {
    height: "100%",
    backgroundColor: COLORS.white,
    paddingTop: 50,
    alignItems: "center",
  },
});

export default styles;
