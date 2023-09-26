import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./recents.style";
import ItemRecentCard from "../cards/itemRecentCard/itemRecentCard";
import { COLORS } from "../../constants";
import { useContext } from "react";
import { appContext } from "../../grobal/context";

const Recents = () => {
  const { items, isLoading, error } = useContext(appContext);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recent</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={{ justifyContent: "center", minHeight: 100 }}>
        {isLoading ? (
          <ActivityIndicator size={"large"} color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
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
