import { View, Text, FlatList, Dimensions, ScrollView } from "react-native";
import React, { useContext } from "react";
import { appContext } from "../../grobal/context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import styles from "./profile.style";
import ItemCard from "../cards/itemCard/itemCard";

const width = Dimensions.get("window").width;

const Profile = () => {
  const { items, user } = useContext(appContext);
  const columnNum = Math.floor(width / 180);

  const myItems = () => {
    let _items = items.filter(({ owner }) => owner === user.userUid);
    return _items;
  };

  return (
    <View>
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
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
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
        <View style={{ height: 100 }}></View>
      </ScrollView>
    </View>
  );
};

export default Profile;
