import {
  View,
  Text,
  FlatList,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useContext } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { common, store } from "../../styles";
import { appContext } from "../../grobal/context";
import { Stack, useLocalSearchParams } from "expo-router";
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
    <ScrollView style={common.scrollView} showsVerticalScrollIndicator={false}>
      <Stack.Screen
        options={{
          title: user.shopName,
          headerTitleAlign: "center",
          headerTitleStyle: { color: COLORS.primary, fontWeight: 800 },
        }}
      />

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
          {/* <Text style={store.shopName}>{user?.shopName}</Text> */}

          <View style={store.locationCont}>
            <Ionicons name="location" color={COLORS.grey} />
            <Text style={store.location}>{user?.location}</Text>
          </View>

          <View style={store.locationCont}>
            <Ionicons name="call" color={COLORS.grey} />
            <Text style={store.location}>{user?.phoneNo}</Text>
          </View>

          <View style={store.locationCont}>
            <Text style={store.location}>Items: {myItems().length}</Text>
          </View>
        </View>
      </View>

      <View>
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
      </View>
    </ScrollView>
  );
};

export default Store;
