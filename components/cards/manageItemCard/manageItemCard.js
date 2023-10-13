import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import styles from "./manageItemCard.style.js";
import { timeAgo } from "../../../util";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { appContext, url } from "../../../grobal/context.js";
import common from "../../../styles/common.style.js";
import axios from "axios";

const ManageItemCard = ({ item }) => {
  const { reflesh, setReflesh } = useContext(appContext);
  const router = useRouter();
  const images = item ? eval(item.images) : [];
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteItem = async () => {
    setConfirm(false);
    setLoading(true);

    try {
      await axios
        .post(url + "Items/delete", { itemId: item.itemId })
        .then((res) => {
          setReflesh(reflesh + 1);
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
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
          <TouchableOpacity
            style={styles.crudBtn}
            onPress={() => router.push(`/edit-item/${item.id}`)}
          >
            <Ionicons name="pencil" size={18} />
            <Text style={styles.crudBtnText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.crudBtn}
            onPress={() => setConfirm(true)}
          >
            <Ionicons name="trash" size={18} color={"red"} />
            <Text style={styles.crudBtnText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={confirm}
        animationType="fade"
        onRequestClose={() => setConfirm(false)}
        transparent
      >
        <View style={common.modalCont}>
          <Pressable
            style={common.modalClose}
            onPress={() => setConfirm(false)}
          />
          <View style={common.modalMenu}>
            <Text style={styles.confirmText}>Are you sure?</Text>

            <View style={styles.itemBox}>
              <Image
                source={{ uri: images[0] }}
                resizeMode="contain"
                style={styles.itemBoxImg}
              />
              <View style={styles.itemDetailsBox}>
                <Text style={styles.itemBoxName}>{item?.name}</Text>

                <Text style={styles.priceText}>
                  N${" "}
                  {Number(item?.price).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Text>
              </View>
            </View>

            <View style={styles.confirmBtns}>
              <TouchableOpacity
                onPress={() => setConfirm(false)}
                style={styles.confirmBtn(false)}
              >
                <Text style={styles.btnText}>No, Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={deleteItem}
                style={styles.confirmBtn(true)}
              >
                <Text style={styles.btnText}>Yes, Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={loading}
        animationType="fade"
        onRequestClose={() => setLoading(false)}
        transparent
      >
        <View style={common.modalLoading}>
          <ActivityIndicator color="white" size="large" />
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

export default ManageItemCard;
