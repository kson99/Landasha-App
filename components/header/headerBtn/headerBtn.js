import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const HeaderBtn = ({ name, color, handlePress, bgColor }) => {
	return (
		<TouchableOpacity style={styles.btn(bgColor)} onPress={handlePress}>
			<Ionicons name={name} size={35} color={color} />
		</TouchableOpacity>
	);
};

export default HeaderBtn;

const styles = StyleSheet.create({
	btn: (bgColor) => ({
		padding: 1,
		backgroundColor: bgColor,
		borderRadius: 50,
	}),
});
