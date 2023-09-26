import { EvilIcons } from "@expo/vector-icons";
import { Text, View, TouchableOpacity } from "react-native";
import { COLORS } from "../../../constants";
import styles from "./searchBtn.style";
import { useRouter } from "expo-router";

const SearchBtn = () => {
	const router = useRouter();
	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.wrapper}
				onPress={() => router.push("/Search")}>
				<EvilIcons name="search" size={25} color={COLORS.grey} />
				<Text style={styles.text}>Search for item</Text>
			</TouchableOpacity>
		</View>
	);
};

export default SearchBtn;
