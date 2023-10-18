import { View } from "react-native";
import { Text } from "react-native";
import { COLORS, SIZES } from "../../constants";
import useFetch from "../../hooks/useFetch";

import { ActivityIndicator } from "react-native";
import CatCard from "../cards/catCard/catCard";
import { useContext } from "react";
import { appContext } from "../../grobal/context";
import { Ionicons } from "@expo/vector-icons";

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
          <Ionicons name="alert-circle-outline" size={30} color="red" />
        ) : (
          <CatCard item={randomItem(items)} />
        )}
      </View>
    </View>
  );
};

export default ForSale;
