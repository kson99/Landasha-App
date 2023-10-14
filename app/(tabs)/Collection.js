import { View, Text, SafeAreaView, FlatList } from "react-native";
import React, { useContext, useEffect } from "react";
import { useRouter } from "expo-router";
import { collection as style } from "../../styles";
import { appContext } from "../../grobal/context";
import { CollectionCard } from "../../components";

const Collection = () => {
  const { items, isLoading, error, collection } = useContext(appContext);

  const router = useRouter();

  const collectionItems = () => {
    let array = [];

    collection.map((id) => {
      let _item = items.find(({ itemId }) => itemId === id);

      if (_item) {
        array.push(_item);
      }
    });

    return array;
  };

  return (
    <View>
      <FlatList
        style={style.list}
        data={collectionItems()}
        renderItem={({ item }) => <CollectionCard item={item} />}
        contentContainerStyle={{ gap: 2 }}
      />
    </View>
  );
};

export default Collection;
