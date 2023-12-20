import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { appContext } from "../../grobal/context";
import { StoreCard } from "../../components";
import { SIZES } from "../../constants";

const Stores = () => {
  const { users } = useContext(appContext);

  return (
    <View>
      <FlatList
        style={styles.list}
        data={users}
        renderItem={({ item }) => <StoreCard item={item} />}
        show
      />
    </View>
  );
};

export default Stores;

const styles = StyleSheet.create({
  list: {
    paddingVertical: SIZES.xxSmall,
  },
});
