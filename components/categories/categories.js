import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native";
import { View } from "react-native";

import styles from "./categories.style";
import { Text } from "react-native";
import { useState } from "react";

const categories = [
  "Recent",
  "Accessories",
  "Clothing",
  "Home",
  "Housing",
  "Computers",
  "Phones",
  "Gaming",
  "Electronics",
  "Vehicles",
  "Others",
];

const Categories = () => {
  const [activeTab, setactiveTab] = useState(categories[0]);

  return (
    <View style={styles.tabsContainer}>
      <FlatList
        data={categories}
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
