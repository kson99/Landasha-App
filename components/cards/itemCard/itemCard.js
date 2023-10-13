import { View } from "react-native";

import styles from "./itemCard.style";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { timeAgo } from "../../../util";
import { useRouter } from "expo-router";

const ItemCard = ({ item }) => {
  const router = useRouter();
  const images = item ? JSON.parse(item.images) : [];

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        router.push(`/item-view/${item.id}`);
      }}
    >
      <Image
        source={{ uri: images[0] }}
        resizeMode="contain"
        style={styles.image}
      />

      <View style={styles.details}>
        <Text style={styles.nameText} numberOfLines={1}>
          {item?.name}
        </Text>

        <Text style={styles.priceText}>
          N${" "}
          {Number(item?.price).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Text>

        <Text style={styles.timestamp}>{timeAgo(item?.timestamp)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ItemCard;
