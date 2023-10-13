import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import { HeaderBtn, PlatformSafeAreaView, ResultItemCard } from "../components";
import { COLORS } from "../constants";
import { useRouter } from "expo-router";
import { common, search } from "../styles";
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
      <View style={search.appBar}>
        <HeaderBtn
          name="chevron-back"
          color={COLORS.lightGrey}
          handlePress={() => router.back()}
        />

        <View style={search.searchBox}>
          <TextInput
            style={search.searchInput}
            value={searchTxt}
            onChangeText={(txt) => {
              setSearchTxt(txt);
            }}
            placeholder="Search Here"
          />
        </View>

        <TouchableOpacity style={search.btn} onPress={onSearch}>
          <Ionicons name="search" size={35} color={COLORS.lightGrey} />
        </TouchableOpacity>
      </View>

      {isSearch && (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <Text>results for: {searchTxt}</Text> */}

          <FlatList
            style={search.list}
            data={results}
            renderItem={({ item }) => <ResultItemCard item={item} />}
            keyExtractor={(item) => item?.id}
            // showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        </ScrollView>
      )}
    </PlatformSafeAreaView>
  );
};

export default Search;
