import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import styles from "./resultItemCard.style";

const ResultItemCard = ({ item }) => {
  const images = item ? eval(item.images) : [];

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.image}>
        <Image
          source={{ uri: images[0] }}
          resizeMode="cover"
          style={styles.img}
        />
      </View>

      {/* details */}
      <View style={styles.details}>
        <Text>{item?.name}</Text>
        <Text></Text>
        <Text style={styles.price}>{item?.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ResultItemCard;
