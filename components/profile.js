import {
  View,
  Text,
  FlatList,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  Image,
  StyleSheet,
} from "react-native";
import React, { useContext, useState } from "react";
import { appContext } from "../grobal/context";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import ItemCard from "./cards/itemCard";
import { common } from "../styles";
import ProfileMenu from "./profileMenu";

const width = Dimensions.get("window").width;

const Profile = () => {
  const { items, user } = useContext(appContext);
  const columnNum = Math.floor(width / 180);
  const [isMenu, setIsMenu] = useState(false);

  const myItems = () => {
    let _items = [];

    items.map((itm) => {
      if (itm.owner === user.userUid) {
        _items.push(itm);
      }
    });

    return _items;
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={common.scrollView}>
      <View style={styles.profCard}>
        <View>
          {user?.imageUrl ? (
            <Image
              source={{ uri: user.imageUrl }}
              resizeMode="cover"
              style={styles.image}
            />
          ) : (
            <View>
              <MaterialCommunityIcons
                name="storefront"
                size={60}
                color={COLORS.grey}
              />
            </View>
          )}
        </View>

        <View>
          <Text style={styles.shopName}>{user?.shopName}</Text>

          <View style={styles.locationCont}>
            <Ionicons name="location" color={COLORS.grey} />
            <Text style={styles.location}>{user?.location}</Text>
          </View>

          <View style={styles.locationCont}>
            <Ionicons name="call" color={COLORS.grey} />
            <Text style={styles.location}>{user?.phoneNo}</Text>
          </View>

          <View style={styles.locationCont}>
            <Text style={styles.location}>Items: {myItems().length}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.option} onPress={() => setIsMenu(true)}>
          <Ionicons name="ellipsis-vertical" size={25} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={common.scrollView}>
        {myItems().length > 0 && (
          <View style={styles.myItems}>
            <FlatList
              data={myItems()}
              renderItem={({ item }) => <ItemCard item={item} />}
              columnWrapperStyle={{
                justifyContent: "space-around",
              }}
              contentContainerStyle={{ gap: 5 }}
              keyExtractor={(item) => item?.id}
              numColumns={columnNum}
              scrollEnabled={false}
            />
          </View>
        )}
      </View>

      <Modal
        visible={isMenu}
        animationType="fade"
        onRequestClose={() => setIsMenu(false)}
        transparent
      >
        <View style={common.modalCont}>
          <Pressable
            style={common.modalClose}
            onPress={() => setIsMenu(false)}
          />
          <View style={common.modalMenu}>
            <ProfileMenu close={setIsMenu} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  profCard: {
    position: "relative",
    height: 100,
    flexDirection: "row",
    gap: 15,
    paddingVertical: 10,
    paddingHorizontal: SIZES.small,
    backgroundColor: COLORS.white,
  },

  image: {
    height: 60,
    width: 60,
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

  myItems: {
    marginTop: SIZES.xxSmall,
    paddingHorizontal: SIZES.xxSmall,
    minHeight: 200,
    justifyContent: "center",
  },

  option: {
    position: "absolute",
    right: 15,
    top: 15,
  },

  menu: {
    height: 500,
    position: "absolute",
    right: 10,
    // top: 5,
    bottom: 10,
    backgroundColor: COLORS.custGrey,
    zIndex: 999,
  },
});
