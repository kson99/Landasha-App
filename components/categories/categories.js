import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native";
import { View } from "react-native";

import styles from "./categories.style";
import { Text } from "react-native";
import { useState } from "react";
import { subCategories } from "../../grobal/context";

const Categories = () => {
  const [activeTab, setactiveTab] = useState("Home");

  return (
    <View style={styles.tabsContainer}>
      <FlatList
        data={["Home", ...subCategories]}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.tab(activeTab, item)}
            onPress={() => {
              setactiveTab(item);
            }}
          >
            <Text style={styles.tabText(activeTab, item)}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </View>
  );
};

export default Categories;
