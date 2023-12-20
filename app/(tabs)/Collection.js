import { View, FlatList, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { useRouter } from "expo-router";
import { appContext } from "../../grobal/context";
import { CollectionCard } from "../../components";
import { SIZES } from "../../constants";

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
        style={styles.list}
        data={collectionItems()}
        renderItem={({ item }) => <CollectionCard item={item} />}
        contentContainerStyle={{ gap: 2 }}
      />
    </View>
  );
};

export default Collection;

const styles = StyleSheet.create({
  list: {
    paddingVertical: SIZES.xxSmall,
  },
});
