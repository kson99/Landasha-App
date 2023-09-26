import { Dimensions, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants";

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
	container: {
		borderRadius: SIZES.medium,
		backgroundColor: COLORS.white,
	},

	image: {
		width: width / 3.4,
		height: width / 3.4,
		borderRadius: 5,
		overflow: "hidden",
		borderColor: "red",
		borderWidth: 1,
	},

	textContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: "center",
		alignItems: "center",
	},

	text: {
		bottom: 0,
		right: 0,
		width: "100%",
		backgroundColor: "rgba(255,0,0,0.6)",
		color: "white",
		fontSize: SIZES.medium,
		fontWeight: "bold",
		padding: 10,
		overflow: "hidden",
		textAlign: "center",
	},
});

export default styles;
