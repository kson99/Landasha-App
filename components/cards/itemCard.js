import { StyleSheet, View } from "react-native";

import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { timeAgo } from "../../util";
import { useRouter } from "expo-router";
import { COLORS, SIZES } from "../../constants";
import { width } from "../../grobal/context";

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    // margin: 5,
    borderRadius: 3,
    overflow: "hidden",
    maxWidth: (width - 20) / 2,
  },

  image: {
    width: "100%",
    height: 180,
  },

  details: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    alignItems: "center",
  },

  nameText: {
    color: COLORS.primary,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
  },

  priceText: {
    color: "red",
    fontWeight: "bold",
    fontSize: SIZES.medium,
    paddingBottom: 5,
  },

  timestamp: {
    fontSize: SIZES.small,
    paddingTop: 5,
    borderTopColor: COLORS.lightGrey,
    borderTopWidth: 1 / 2,
    width: "90%",
    color: COLORS.grey,
    textAlign: "center",
  },
});
