import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React, { useContext, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { appContext, url, width } from "../../grobal/context.js";
import common from "../../styles/common.style.js";
import axios from "axios";
import { COLORS, SIZES } from "../../constants/theme.js";

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 3,
    overflow: "hidden",
    maxWidth: (width - 20) / 2,
  },

  image: {
    width: "100%",
    height: 180,
  },

  details: {
    padding: 5,
    alignItems: "center",
  },

  nameText: {
    color: COLORS.primary,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
  },

  priceText: {
    color: "red",
    fontWeight: "bold",
    fontSize: SIZES.medium,
    paddingBottom: 5,
  },

  timestamp: {
    fontSize: SIZES.small,
    paddingTop: 5,
    borderTopColor: COLORS.lightGrey,
    borderTopWidth: 1 / 2,
    width: "90%",
    color: COLORS.grey,
    textAlign: "center",
  },

  crudBox: {
    backgroundColor: COLORS.background,
    width: "100%",
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderRadius: 5,
  },

  crudBtn: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },

  crudBtnText: {
    fontSize: SIZES.xSmall,
  },

  confirmText: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginTop: -10,
    paddingBottom: 10,
  },

  itemBox: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    borderTopWidth: 1,
    borderTopColor: "black",
  },

  itemBoxImg: {
    width: 100,
    height: 100,
  },

  itemDetailsBox: {
    flex: 1,
    flexDirection: "column",
    gap: 5,
  },

  itemBoxName: {
    color: COLORS.primary,
    fontWeight: "bold",
  },

  confirmBtns: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingBottom: 10,
  },

  confirmBtn: (dlt) => ({
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: dlt ? "red" : COLORS.grey,
    borderRadius: 10,
  }),

  btnText: {
    color: COLORS.white,
    fontWeight: "600",
  },
});
