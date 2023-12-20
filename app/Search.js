import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useContext, useState } from "react";
import { HeaderBtn, PlatformSafeAreaView, ResultItemCard } from "../components";
import { COLORS, SIZES } from "../constants";
import { useRouter } from "expo-router";
import { common } from "../styles";
import { Ionicons } from "@expo/vector-icons";
import { appContext } from "../grobal/context";

const Search = () => {
  const { items, isLoading, error } = useContext(appContext);

  const router = useRouter();
  const [isSearch, setIsSearch] = useState(false);
  const [searchTxt, setSearchTxt] = useState("");
  const [results, setResults] = useState([]);

  const onSearch = () => {
    setIsSearch(true);
    let array = [];

    items.map((item) => {
      if (
        (item?.name).toLowerCase().includes(searchTxt.toLowerCase()) ||
        (item?.description).toLowerCase().includes(searchTxt.toLowerCase()) ||
        (item?.category).toLowerCase().includes(searchTxt.toLowerCase())
      ) {
        array.push(item);
      }
    });

    setResults(array);
  };

  return (
    <PlatformSafeAreaView>
      <View style={styles.appBar}>
        <HeaderBtn
          name="chevron-back"
          color={COLORS.lightGrey}
          handlePress={() => router.back()}
        />

        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchInput}
            value={searchTxt}
            onChangeText={(txt) => {
              setSearchTxt(txt);
            }}
            placeholder="Search Here"
          />
        </View>

        <TouchableOpacity style={styles.btn} onPress={onSearch}>
          <Ionicons name="search" size={35} color={COLORS.lightGrey} />
        </TouchableOpacity>
      </View>

      {isSearch && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={common.scrollView}
        >
          {/* <Text>results for: {searchTxt}</Text> */}

          <FlatList
            style={styles.list}
            data={results}
            renderItem={({ item }) => <ResultItemCard item={item} />}
            keyExtractor={(item) => item?.id}
            // showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />

          <View style={{ height: 50 }} />
        </ScrollView>
      )}
    </PlatformSafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  appBar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
  },

  searchBox: {
    backgroundColor: COLORS.background,
    width: "75%",
    height: 35,
    borderRadius: 10,
  },

  searchInput: {
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.small,
  },

  btn: {
    padding: 1,
    borderRadius: 50,
  },

  list: {
    borderTopColor: COLORS.background,
    borderTopWidth: 4,
    paddingVertical: SIZES.xxSmall,
  },
});
