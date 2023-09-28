import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import styles from "./collectionCard.style";

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
