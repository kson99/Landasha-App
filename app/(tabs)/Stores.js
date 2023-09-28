import { View, Text, FlatList } from "react-native";
import React, { useContext } from "react";
import { appContext } from "../../grobal/context";
import { StoreCard } from "../../components";
import { stores } from "../../styles";

const Stores = () => {
  const { users } = useContext(appContext);

  return (
    <View>
      <FlatList
        style={stores.list}
        data={users}
        renderItem={({ item }) => <StoreCard item={item} />}
        show
      />
    </View>
  );
};

export default Stores;
