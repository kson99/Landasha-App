import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { COLORS, SIZES } from "../../constants";

const CollectionCard = ({ item }) => {
  const router = useRouter();
  const images = item ? eval(item.images) : [];

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        router.push(`/item-view/${item.id}`);
      }}
    >
      <View style={styles.image}>
        <Image
          source={{ uri: images[0] }}
          resizeMode="cover"
          style={styles.img}
        />
      </View>

      {/* details */}
      <View style={styles.details}>
        <Text style={styles.name}>{item?.name}</Text>
        <Text></Text>
        <Text style={styles.price}>
          N${" "}
          {Number(item?.price).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CollectionCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 120,
    flexDirection: "row",
    gap: 15,
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
  },

  image: {
    flex: 0.35,
    paddingVertical: SIZES.xxSmall,
    justifyContent: "center",
    alignItems: "center",
  },

  img: {
    width: "80%",
    height: "80%",
  },

  details: {
    flex: 0.65,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingVertical: SIZES.xxSmall,
    paddingRight: SIZES.xxSmall,
  },

  name: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "500",
  },

  price: {
    color: "red",
    fontWeight: "bold",
    fontSize: 20,
    paddingBottom: 5,
  },
});
