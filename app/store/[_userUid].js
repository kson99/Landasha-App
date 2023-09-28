import {
  View,
  Text,
  FlatList,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useContext } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { common, store } from "../../styles";
import { appContext } from "../../grobal/context";
import { useLocalSearchParams } from "expo-router";
import { COLORS } from "../../constants";
import { ItemCard } from "../../components";

const width = Dimensions.get("window").width;

const Store = () => {
  const { items, users } = useContext(appContext);
  const columnNum = Math.floor(width / 180);
  const { _userUid } = useLocalSearchParams();
  const user = users.find(({ userUid }) => userUid === _userUid);

  const myItems = () => {
    let _items = items.filter(({ owner }) => owner === user.userUid);
    return _items;
  };

  return (
    <SafeAreaView style={common.safeArea}>
      <View style={store.profCard}>
        <View>
          {user?.imageUrl ? (
            <Image
              source={{ uri: user.imageUrl }}
              resizeMode="cover"
              style={store.image}
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
          <Text style={store.shopName}>{user?.shopName}</Text>

          <View style={store.locationCont}>
            <Ionicons name="location" color={COLORS.grey} />
            <Text style={store.location}>{user?.location}</Text>
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={common.scrollView}
      >
        {myItems().length > 0 && (
          <View style={store.myItems}>
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
    </SafeAreaView>
  );
};

export default Store;
