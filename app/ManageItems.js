import {
  View,
  Text,
  FlatList,
  Dimensions,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useContext } from "react";
import { appContext } from "../grobal/context";
import { common } from "../styles";
import { ManageItemCard } from "../components";
import { Stack } from "expo-router";
import { SIZES } from "../constants";

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
    <ScrollView showsVerticalScrollIndicator={false}>
      <Stack.Screen
        options={{
          headerRight: () => <Text>({myItems().length})</Text>,
        }}
      />
      <View style={common.scrollView}>
        {myItems().length > 0 && (
          <View style={styles.container}>
            <FlatList
              data={myItems()}
              renderItem={({ item }) => <ManageItemCard item={item} />}
              columnWrapperStyle={{
                justifyContent: "space-around",
              }}
              contentContainerStyle={{ gap: 10 }}
              keyExtractor={(item) => item?.id}
              numColumns={columnNum}
              scrollEnabled={false}
            />

            <View style={{ height: 20 }} />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ManageItems;

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xxSmall,
    paddingHorizontal: SIZES.xxSmall,
    minHeight: 200,
  },
});
