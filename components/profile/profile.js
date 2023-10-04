import {
  View,
  Text,
  FlatList,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import React, { useContext, useState } from "react";
import { appContext } from "../../grobal/context";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { COLORS } from "../../constants";
import styles from "./profile.style";
import ItemCard from "../cards/itemCard/itemCard";
import { common } from "../../styles";
import ProfileMenu from "../menu/profileMenu";

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

    // items.filter(({ owner }) => owner === user.userUid);
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
