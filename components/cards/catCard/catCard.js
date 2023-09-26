import { View } from "react-native";

import styles from "./catCard.style";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { ImageBackground } from "react-native";
import { COLORS, SIZES } from "../../../constants";

const CatCard = ({ item }) => {
	const images = item ? JSON.parse(item.images) : [];

	return (
		<TouchableOpacity style={styles.container}>
			<ImageBackground
				source={{ uri: images[0] }}
				resizeMode="cover"
				style={styles.image}>
				<View style={styles.textContainer}>
					<Text style={styles.text}>{item?.category}</Text>
				</View>
			</ImageBackground>
		</TouchableOpacity>
	);
};

export default CatCard;
