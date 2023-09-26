import { Image, Text, TouchableOpacity, View } from "react-native";
import styles from "./itemRecentCard.style";
import { useRouter } from "expo-router";

const ItemRecentCard = ({ item }) => {
	const router = useRouter();
	const images = item ? JSON.parse(item.images) : [];

	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => router.push(`/item-view/${item.id}`)}>
			<Image
				source={{ uri: images[0] }}
				resizeMode="cover"
				style={styles.image}
			/>

			<View styles={styles.details}>
				<Text style={styles.priceText}>
					N${" "}
					{Number(item?.price).toLocaleString(undefined, {
						maximumFractionDigits: 2,
					})}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default ItemRecentCard;
