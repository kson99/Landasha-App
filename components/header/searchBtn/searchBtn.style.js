import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants";

const styles = StyleSheet.create({
	container: {
		width: "100%",
		paddingHorizontal: SIZES.large,
		height: 43,
		backgroundColor: COLORS.white,
		paddingTop: 5,
	},

	wrapper: {
		height: "100%",
		width: "100%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.background,
		borderRadius: 10,
	},

	text: {
		fontSize: 18,
		paddingLeft: 3,
		color: COLORS.grey,
	},
});

export default styles;
