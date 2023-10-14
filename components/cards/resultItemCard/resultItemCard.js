import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import styles from "./resultItemCard.style";
import { useRouter } from "expo-router";

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
