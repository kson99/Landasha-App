import { View } from "react-native";
import { Text } from "react-native";
import { COLORS, SIZES } from "../../constants";
import useFetch from "../../hooks/useFetch";

import { ActivityIndicator } from "react-native";
import CatCard from "../cards/catCard/catCard";
import { useContext } from "react";
import { appContext } from "../../grobal/context";

const ForSale = () => {
  const { items, isLoading, error } = useContext(appContext);

  const randomItem = (data) => {
    var items = [];
    data.forEach((item) => {
      if (item.category === "For Sale") {
        items.push(item);
      }
    });

    var random = Math.floor(Math.random() * items.length);
    return items[random];
  };

  return (
    <View>
      <View>
        {isLoading ? (
          <ActivityIndicator size={"large"} color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <CatCard item={randomItem(items)} />
        )}
      </View>
    </View>
  );
};

export default ForSale;
