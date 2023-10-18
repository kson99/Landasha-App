import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    paddingHorizontal: 5,
    backgroundColor: COLORS.white,
    minHeight: 150,
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
    color: COLORS.grey,
  },

  tabsContainer: {
    width: "100%",
    borderBottomColor: COLORS.lightGrey,
    borderBottomWidth: 1,
    backgroundColor: COLORS.white,
  },
  tab: {
    paddingVertical: SIZES.small,
    marginHorizontal: SIZES.xSmall,
  },

  tabText: {
    fontSize: SIZES.medium,
  },

  networkError: {
    backgroundColor: COLORS.white,
    alignItems: "center",
  },
});

export default styles;
