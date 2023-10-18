import { Dimensions, View } from "react-native";
import { ActivityIndicator } from "react-native";
import ItemCard from "../cards/itemCard/itemCard";
import { FlatList } from "react-native";
import { Text } from "react-native";
import styles from "./items.style";
import { COLORS } from "../../constants";
import { useContext } from "react";
import { appContext } from "../../grobal/context";
import { Ionicons } from "@expo/vector-icons";

const width = Dimensions.get("window").width;

const Items = () => {
  const { items, isLoading, error } = useContext(appContext);
  const columnNum = Math.floor(width / 180);

  const dataShuffle = (data) => {
    return data.sort(() => Math.random() - 0.5);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={"large"} color={COLORS.primary} />
      ) : error ? (
        <View style={styles.networkError}>
          <Ionicons name="alert-circle-outline" size={30} color="red" />
        </View>
      ) : (
        <FlatList
          data={dataShuffle(items)}
          renderItem={({ item }) => <ItemCard item={item} />}
          keyExtractor={(item) => item?.id}
          numColumns={columnNum}
          scrollEnabled={false}
        />
      )}
    </View>
  );
};

export default Items;
