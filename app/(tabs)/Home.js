import { View, Text, SafeAreaView, StatusBar, ScrollView } from "react-native";
import React from "react";
import { common, home } from "../../styles";
import {
  Categories,
  Closets,
  ForSale,
  Items,
  PlatformSafeAreaView,
  Recents,
  Rentals,
  SearchBtn,
} from "../../components";

const Home = () => {
  return (
    <PlatformSafeAreaView>
      <View style={home.container}>
        <SearchBtn />
        <Categories />

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={home.scrollContainer}>
            <View style={home.rentClosetContainer}>
              <ForSale />
              <Closets />
              <Rentals />
            </View>
            <Recents />
            <Items />
            <View style={{ height: 100 }}></View>
          </View>
        </ScrollView>
      </View>
    </PlatformSafeAreaView>
  );
};

export default Home;
