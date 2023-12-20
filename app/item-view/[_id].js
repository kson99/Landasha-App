import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Alert,
  Share,
  StyleSheet,
  StatusBar,
} from "react-native";
import React, { useContext, useState } from "react";
import { common } from "../../styles";
import { HeaderBtn, ItemCard } from "../../components";
import { COLORS, SIZES } from "../../constants";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { appContext } from "../../grobal/context";
import { addToCollection, removeItem } from "../../database/sqlite.service";

const width = Dimensions.get("window").width;

const ItemView = () => {
  const { items, isLoading, error, collection, dbReflesh, setDbReflesh } =
    useContext(appContext);
  const router = useRouter();
  const { _id } = useLocalSearchParams();

  const _item = items?.find(({ id }) => {
    return `${id}` === _id;
  });

  const images = _item ? JSON.parse(_item.images) : [];
  const [active, setActive] = useState(1);
  const columnNum = Math.floor(width / 180);

  const imageScroll = (e) => {
    if (e) {
      const slide =
        Math.ceil(e.contentOffset.x / e.layoutMeasurement.width) + 1;
      if (slide != active) {
        setActive(slide);
      }
    }
  };

  // getting other shop items
  const otherItems = () => {
    let array = [];

    items.map((item, i) => {
      if (item.owner === _item.owner && item.id != _item.id) {
        array.push(item);
      }
    });

    return array;
  };

  const isInCollection = () => {
    let is = false;

    if (collection.includes(_item?.itemId)) {
      is = true;
    }

    return is;
  };

  // Adding or removing from collection
  const addOrRemove = async () => {
    if (isInCollection()) {
      try {
        await removeItem(_item.itemId);
        setDbReflesh(dbReflesh + 1);
      } catch (error) {
        Alert("Failed, try again");
      }
    } else {
      try {
        await addToCollection(_item.itemId);
        setDbReflesh(dbReflesh + 1);
      } catch (error) {
        Alert("Failed, try again");
      }
    }
  };

  // Share button implementation
  const shareClick = async () => {
    try {
      await Share.share({
        message: _item.name,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {!isLoading && !error && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={common.scrollView}
        >
          <View style={styles.imageBox}>
            <ScrollView
              onScroll={({ nativeEvent }) => imageScroll(nativeEvent)}
              scrollEventThrottle={0}
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              horizontal
              style={styles.imgWrap}
            >
              {images.map((img, _i) => (
                <Image
                  key={_i}
                  style={styles.imgWrap}
                  source={{ uri: img }}
                  resizeMode="contain"
                  resizeMethod="scale"
                />
              ))}
            </ScrollView>

            <View style={styles.imgIndicator}>
              <Text style={styles.imgIndicatorText}>
                {`${active}/${images.length}`}
              </Text>
            </View>

            <View style={styles.appBar}>
              <HeaderBtn
                name="chevron-back"
                color={COLORS.white}
                handlePress={() => router.back()}
                bgColor={"rgba(0,0,0,0.4)"}
              />

              <HeaderBtn
                name="share-social"
                color={COLORS.white}
                handlePress={shareClick}
                bgColor={"rgba(0,0,0,0.4)"}
              />
            </View>
          </View>

          <View style={styles.priceBox}>
            <Text style={styles.price}>
              N${" "}
              {Number(_item?.price).toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })}
            </Text>
          </View>

          <View style={styles.titleBox}>
            <Text style={styles.title}>{_item?.name}</Text>
          </View>

          <View style={styles.descriptionBox}>
            <Text>About Item:</Text>
            <Text style={styles.description}>{_item?.description}</Text>
          </View>

          {otherItems().length > 0 && (
            <View style={styles.otherItems}>
              <FlatList
                data={otherItems()}
                renderItem={({ item }) => <ItemCard item={item} />}
                columnWrapperStyle={{
                  justifyContent: "space-around",
                }}
                contentContainerStyle={{ gap: 5 }}
                keyExtractor={(item) => item?.id}
                numColumns={columnNum}
                scrollEnabled={false}
              />
            </View>
          )}

          <View style={{ height: 60 }}></View>
        </ScrollView>
      )}

      {/* Bottom Bar */}
      {!isLoading && !error && (
        <View style={styles.buttonsBox}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.buttons}
              onPress={() => router.push(`/store/${_item.owner}`)}
            >
              <MaterialIcons name="storefront" size={30} color={COLORS.grey} />
              <Text style={styles.buttonsTxt}>Shop</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttons} onPress={addOrRemove}>
              <Ionicons
                name={isInCollection() ? "heart" : "heart-outline"}
                size={30}
                color={isInCollection() ? "red" : COLORS.grey}
              />
              <Text style={styles.buttonsTxt}>
                {isInCollection() ? "Remove" : "Collect"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.buyBtn}>
            <Text style={styles.buyBtnPrice}>
              N${" "}
              {Number(_item?.price).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
            <Text style={styles.buyBtnTxt}>Buy</Text>
          </TouchableOpacity>
        </View>
      )}

      {error && (
        <View style={styles.netError}>
          <View style={styles.appBar}>
            <HeaderBtn
              name="chevron-back"
              color={COLORS.white}
              handlePress={() => router.back()}
              bgColor={"rgba(0,0,0,0.4)"}
            />
          </View>
          <Ionicons name="wifi" size={40} color={COLORS.grey} />
          <Text>Network Error!</Text>
        </View>
      )}

      {isLoading && (
        <View style={styles.loading}>
          <View style={styles.appBar}>
            <HeaderBtn
              name="chevron-back"
              color={COLORS.white}
              handlePress={() => router.back()}
              bgColor={"rgba(0,0,0,0.4)"}
            />
          </View>
          <ActivityIndicator size={"large"} color={COLORS.primary} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default ItemView;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.white,
    flex: 1,
  },

  appBar: {
    position: "absolute",
    top: StatusBar.currentHeight + 2,
    left: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 50,
    paddingHorizontal: 3,
  },

  imageBox: {
    position: "relative",
  },

  imgWrap: {
    backgroundColor: "black",
    width: width,
    height: width,
  },

  imagesNav: {
    width: "100%",
    backgroundColor: COLORS.white,
    padding: 10,
    flexDirection: "row",
    columnGap: 10,
  },

  imgIndicator: {
    position: "absolute",
    right: 10,
    bottom: 10,
    padding: 5,
    backgroundColor: "rgba(0,0,0,.4)",
    borderRadius: 15,
  },

  imgIndicatorText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "600",
  },

  navTab: (activeTab, item) => ({
    borderWidth: 1,
    borderColor: activeTab === item ? "red" : "transparent",
  }),

  navTabImg: {
    width: 50,
    height: 50,
  },

  priceBox: {
    marginTop: 2,
    padding: 10,
    backgroundColor: COLORS.white,
  },

  price: {
    color: "red",
    fontSize: 24,
    fontWeight: "700",
  },

  titleBox: {
    marginTop: 5,
    padding: 10,
    backgroundColor: COLORS.white,
  },

  title: {
    fontWeight: "700",
    fontSize: 18,
  },

  descriptionBox: {
    marginTop: 5,
    padding: 10,
    backgroundColor: COLORS.white,
  },

  description: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: COLORS.background,
    fontWeight: "300",
    lineHeight: 20,
    fontSize: 13,
    letterSpacing: 1,
  },

  buttonsBox: {
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: COLORS.white,
    height: 55,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  buttons: {
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonsTxt: {
    fontSize: 12,
    color: COLORS.grey,
  },

  otherItems: {
    marginTop: SIZES.xxSmall,
    paddingHorizontal: SIZES.xxSmall,
    minHeight: 200,
    justifyContent: "center",
  },

  netError: {
    flex: 1,
    height: "100%",
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },

  loading: {
    flex: 1,
    height: "100%",
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },

  buyBtn: {
    width: "30%",
    backgroundColor: "red",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  buyBtnPrice: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "700",
  },

  buyBtnTxt: {
    color: COLORS.white,
    fontWeight: "400",
  },
});
