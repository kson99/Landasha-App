import { View, Text, SafeAreaView, StatusBar, ScrollView } from "react-native";
import React, { useEffect, useRef, useState } from "react";
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
import { subCategories, width } from "../../grobal/context";

const Home = () => {
  const [active, setActive] = useState(1);
  const [activeTab, setActiveTab] = useState("Home");
  const array = ["Home", ...subCategories];
  const [index, setIndex] = useState(0);
  const pageRef = useRef(null);
  const [tabPress, setTabPress] = useState({
    isPress: false,
    index: 0,
  });

  const tabScroll = (e) => {
    if (e) {
      const slide =
        Math.floor(e.contentOffset.x / e.layoutMeasurement.width) + 1;

      if (slide != active) {
        setActive(slide);
        setIndex(slide - 1);

        if (slide === 1) {
          setActiveTab("Home");
        } else {
          const tab = array[slide - 1];
          setActiveTab(tab);
        }
      }
    }
  };

  useEffect(() => {
    if (tabPress.isPress) {
      pageRef.current.scrollTo({
        x: array.indexOf(activeTab) * width,
      });
    }
  }, [activeTab]);

  return (
    <PlatformSafeAreaView>
      <View style={home.container}>
        <SearchBtn />
        <Categories
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setScrollIndex={setIndex}
          scrollIndex={index}
          setTabPress={setTabPress}
        />

        <ScrollView
          ref={pageRef}
          onScroll={({ nativeEvent }) => tabScroll(nativeEvent)}
          scrollEventThrottle={0}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={home.scrollContainer}
        >
          <ScrollView showsHorizontalScrollIndicator={false}>
            <View style={home.scrollContainer}>
              <View style={home.rentClosetContainer}>
                <ForSale />
                <Closets />
                <Rentals />
              </View>
              <Recents />
              <Items />
              <View style={{ height: 180 }}></View>
            </View>
          </ScrollView>

          {subCategories.map((page, i) => (
            <View style={home.scrollContainer} key={i}>
              <Text>{page}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </PlatformSafeAreaView>
  );
};

export default Home;
