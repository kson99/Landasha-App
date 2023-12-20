import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { COLORS, SIZES } from "../../constants";

const ItemRecentCard = ({ item }) => {
  const router = useRouter();
  const images = item ? JSON.parse(item.images) : [];

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push(`/item-view/${item.id}`)}
    >
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

const styles = StyleSheet.create({
  container: {
    width: 100,
    borderWidth: 1 / 2,
    borderColor: COLORS.grey,
    backgroundColor: COLORS.white,
    overflow: "hidden",
    marginVertical: 7,
    borderRadius: 4,
  },

  image: {
    width: "100%",
    height: 100,
  },

  details: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    alignItems: "center",
  },

  priceText: {
    color: "red",
    fontWeight: "bold",
    fontSize: SIZES.medium,
    paddingBottom: 5,
    width: "100%",
    textAlign: "center",
  },
});
