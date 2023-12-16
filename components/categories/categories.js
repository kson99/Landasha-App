import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native";
import { View } from "react-native";

import styles from "./categories.style";
import { Text } from "react-native";
import { useEffect, useRef, useState } from "react";
import { subCategories } from "../../grobal/context";

const Categories = ({ activeTab, setActiveTab, scrollIndex, setTabPress }) => {
  const catRef = useRef(null);
  // Scroll to today's date
  const scrollToIndex = () => {
    if (catRef.current) {
      catRef.current.scrollToIndex({
        index: scrollIndex,
        animated: true,
        viewOffset: 5,
      });
    }
  };

  useEffect(() => {
    scrollToIndex();
  }, [scrollIndex]);

  return (
    <View style={styles.tabsContainer}>
      <FlatList
        ref={catRef}
        data={["Home", ...subCategories]}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[
              styles.tab(activeTab, item),
              styles.scrollTab(scrollIndex, index),
            ]}
            onPress={() => {
              setActiveTab(item);
              setTabPress({
                isPress: true,
                index,
              });
            }}
          >
            <Text style={styles.tabText(activeTab, item)}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(data, index) => ({
          length: 55,
          offset: 55 * index,
          index,
        })}
        horizontal
      />
    </View>
  );
};

export default Categories;
