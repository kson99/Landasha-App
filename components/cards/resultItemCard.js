import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { COLORS, SIZES } from "../../constants";

const ResultItemCard = ({ item }) => {
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
          resizeMode="contain"
          style={styles.img}
        />
      </View>

      {/* details */}
      <View style={styles.details}>
        <Text>{item?.name}</Text>
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

export default ResultItemCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 130,
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 5,
    backgroundColor: COLORS.white,
  },

  image: {
    flex: 0.35,
    paddingVertical: SIZES.xxSmall,
    justifyContent: "center",
    alignItems: "center",
  },

  img: {
    width: "90%",
    height: "90%",
  },

  details: {
    flex: 0.65,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingVertical: SIZES.xxSmall,
    borderBottomColor: COLORS.background,
    borderBottomWidth: 1,
    paddingRight: SIZES.xxSmall,
  },

  price: {
    color: "red",
    fontWeight: "bold",
    fontSize: SIZES.medium,
    paddingBottom: 5,
  },
});
