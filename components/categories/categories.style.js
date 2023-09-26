import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  tabsContainer: {
    width: "100%",
    borderBottomColor: COLORS.lightGrey,
    borderBottomWidth: 1,
    backgroundColor: COLORS.white,
  },
  tab: (activeTab, item) => ({
    paddingVertical: SIZES.small,
    marginHorizontal: SIZES.xSmall,
    borderBottomWidth: activeTab === item ? 2 : 0,
    borderBottomColor: activeTab === item ? "red" : "",
  }),

  tabText: (activeTab, item) => ({
    fontSize: SIZES.medium,
    color: activeTab === item ? "red" : COLORS.primary,
    fontWeight: activeTab === item ? "bold" : "normal",
  }),
});

export default styles;
