import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
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

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    paddingHorizontal: SIZES.small,
    backgroundColor: COLORS.white,
    marginBottom: 1,
  },

  image: {
    height: 40,
    width: 40,
    borderRadius: 3,
  },

  shopName: {
    letterSpacing: 2,
    fontWeight: "800",
    fontSize: 20,
    color: COLORS.primary,
  },

  locationCont: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingTop: 2,
  },

  location: {
    fontSize: 14,
    color: COLORS.grey,
    fontWeight: "300",
  },
});
