import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ItemRecentCard from "./cards/itemRecentCard";
import { COLORS, SIZES } from "../constants";
import { useContext } from "react";
import { appContext } from "../grobal/context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Recents = () => {
  const router = useRouter();
  const { items, isLoading, error } = useContext(appContext);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recent</Text>
        <TouchableOpacity onPress={() => router.push("Recents")}>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={{ justifyContent: "center", minHeight: 100 }}>
        {isLoading ? (
          <ActivityIndicator size={"large"} color={COLORS.primary} />
        ) : error ? (
          <View style={styles.networkError}>
            <Ionicons name="alert-circle-outline" size={30} color="red" />
          </View>
        ) : (
          <FlatList
            data={items.slice(0, 10)}
            renderItem={({ item }) => <ItemRecentCard item={item} />}
            keyExtractor={(item) => item?.id}
            contentContainerStyle={{ columnGap: 10 }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

export default Recents;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
    minHeight: 150,
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
    color: COLORS.grey,
  },

  tabsContainer: {
    width: "100%",
    borderBottomColor: COLORS.lightGrey,
    borderBottomWidth: 1,
    backgroundColor: COLORS.white,
  },
  tab: {
    paddingVertical: SIZES.small,
    marginHorizontal: SIZES.xSmall,
  },

  tabText: {
    fontSize: SIZES.medium,
  },

  networkError: {
    backgroundColor: COLORS.white,
    alignItems: "center",
  },
});
