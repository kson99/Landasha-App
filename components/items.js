import { Dimensions, StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native";
import ItemCard from "./cards/itemCard";
import { FlatList } from "react-native";
import { COLORS, SIZES } from "../constants";
import { useContext } from "react";
import { appContext } from "../grobal/context";
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
          columnWrapperStyle={{
            justifyContent: "space-around",
          }}
          contentContainerStyle={{ gap: 5 }}
          scrollEnabled={false}
        />
      )}
    </View>
  );
};

export default Items;

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xxSmall,
    paddingHorizontal: SIZES.xxSmall,
    minHeight: 200,
    justifyContent: "center",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    color: COLORS.primary,
  },

  headerBtn: {
    fontSize: SIZES.medium,
    color: COLORS.grey,
  },

  networkError: {
    height: "100%",
    backgroundColor: COLORS.white,
    paddingTop: 50,
    alignItems: "center",
  },
});
