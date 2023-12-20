import {
  View,
  Text,
  FlatList,
  Dimensions,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import React, { useContext } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { common } from "../../styles";
import { appContext } from "../../grobal/context";
import { Stack, useLocalSearchParams } from "expo-router";
import { COLORS, SIZES } from "../../constants";
import { ItemCard } from "../../components";

const width = Dimensions.get("window").width;

const Store = () => {
  const { items, users } = useContext(appContext);
  const columnNum = Math.floor(width / 180);
  const { _userUid } = useLocalSearchParams();
  const user = users.find(({ userUid }) => userUid === _userUid);

  const myItems = () => {
    let _items;
    if (user) {
      _items = items.filter(({ owner }) => owner === user.userUid);
    }

    return _items;
  };

  return (
    <ScrollView style={common.scrollView} showsVerticalScrollIndicator={false}>
      <Stack.Screen
        options={{
          title: user?.shopName,
          headerTitleAlign: "center",
        }}
      />

      <View style={styles.profCard}>
        <View>
          {user?.imageUrl ? (
            <Image
              source={{ uri: user?.imageUrl }}
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
      </View>

      <View>
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

        <View style={{ height: 100 }}></View>
      </View>
    </ScrollView>
  );
};

export default Store;

const styles = StyleSheet.create({
  profCard: {
    // height: 100,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    paddingHorizontal: SIZES.small,
    backgroundColor: COLORS.white,
    paddingBottom: 10,
    paddingTop: 5,
  },

  image: {
    height: 60,
    width: 60,
    borderRadius: 3,
    backgroundColor: COLORS.lightGrey,
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
});
