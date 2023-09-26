import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
	container: {
		marginTop: 10,
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
		fontSize: SIZES.medium,
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
});

export default styles;
