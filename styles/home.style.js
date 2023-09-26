import { StatusBar, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";

const home = StyleSheet.create({
	safeArea: {
		paddingTop: StatusBar.currentHeight,
		backgroundColor: COLORS.white,
		flex: 1,
	},

	container: {
		backgroundColor: COLORS.background,
		minHeight: "100%",
	},

	scrollContainer: {
		flex: 1,
	},

	rentClosetContainer: {
		backgroundColor: COLORS.lightWhite,
		flexDirection: "row",
		marginTop: SIZES.xxSmall,
		paddingVertical: 20,
		justifyContent: "space-evenly",
		alignItems: "center",
		minHeight: 150,
	},
});

export default home;
