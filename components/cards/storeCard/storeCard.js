import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./storeCard.style";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../../../constants";
import { useRouter } from "expo-router";

const StoreCard = ({ item }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/store/${item.userUid}`)}
    >
      <View>
        {item?.imageUrl ? (
          <Image
            source={{ uri: item.imageUrl }}
            resizeMode="cover"
            style={styles.image}
          />
        ) : (
          <View>
            <MaterialCommunityIcons
              name="storefront"
              size={40}
              color={COLORS.grey}
            />
          </View>
        )}
      </View>

      <View>
        <Text style={styles.shopName}>{item.shopName}</Text>

        <View style={styles.locationCont}>
          <Ionicons name="location" color={COLORS.grey} />
          <Text style={styles.location}>{item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default StoreCard;
