import { View, Text, FlatList, Dimensions } from "react-native";
import React, { useContext } from "react";
import { appContext } from "../grobal/context";
import { common } from "../styles";
import { ManageItemCard } from "../components";
import { Stack } from "expo-router";

const width = Dimensions.get("window").width;

const ManageItems = () => {
  const { items, user } = useContext(appContext);
  const columnNum = Math.floor(width / 180);

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
    <View>
      <Stack.Screen
        options={{
          headerRight: () => <Text>{myItems().length}</Text>,
        }}
      />
      <View style={common.scrollView}>
        {myItems().length > 0 && (
          <View style={common.myItems}>
            <FlatList
              data={myItems()}
              renderItem={({ item }) => <ManageItemCard item={item} />}
              keyExtractor={(item) => item?.id}
              numColumns={columnNum}
              scrollEnabled={false}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default ManageItems;
