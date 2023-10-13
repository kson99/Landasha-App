import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useContext } from "react";
import styles from "./manageItemCard.style.js";
import { timeAgo } from "../../../util";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { appContext } from "../../../grobal/context.js";

const ManageItemCard = ({ item }) => {
  const { items, reflesh, setReflesh } = useContext(appContext);
  const router = useRouter();
  const images = item ? eval(item.images) : [];

  const deleteItem = (id) => {
    //
  };

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

        <View style={styles.crudBox}>
          <TouchableOpacity style={styles.crudBtn}>
            <Ionicons name="pencil" size={18} />
            <Text style={styles.crudBtnText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.crudBtn} onPress={deleteItem}>
            <Ionicons name="trash" size={18} color={"red"} />
            <Text style={styles.crudBtnText}>Delete</Text>
          </TouchableOpacity>
        </View>

        {/* <Text style={styles.timestamp}>{timeAgo(item?.timestamp)}</Text> */}
      </View>
    </TouchableOpacity>
  );
};

export default ManageItemCard;
