import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import { itemView } from "../../styles";
import { HeaderBtn, ItemCard } from "../../components";
import { COLORS } from "../../constants";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import useFetch from "../../hooks/useFetch";
import { appContext } from "../../grobal/context";

const width = Dimensions.get("window").width;

const ItemView = () => {
  const { items, isLoading, error } = useContext(appContext);
  const router = useRouter();
  const { _id } = useLocalSearchParams();

  const _item = items?.find(({ id }) => {
    return `${id}` === _id;
  });

  const images = _item ? JSON.parse(_item.images) : [];
  // const [activeTab, setActiveTab] = useState(images[0]);
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

  const otherItems = () => {
    let array = [];

    items.map((item, i) => {
      if (item.owner === _item.owner && item.id != _item.id) {
        array.push(item);
      }
    });

    return array;
  };

  return (
    <SafeAreaView style={itemView.safeArea}>
      {!isLoading && !error && (
        <ScrollView>
          <View style={itemView.imageBox}>
            <ScrollView
              onScroll={({ nativeEvent }) => imageScroll(nativeEvent)}
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              horizontal
              style={itemView.imgWrap}
            >
              {images.map((img, _i) => (
                <Image
                  key={_i}
                  style={itemView.imgWrap}
                  source={{ uri: img }}
                  resizeMode="contain"
                  resizeMethod="scale"
                />
              ))}
            </ScrollView>

            <View style={itemView.imgIndicator}>
              <Text style={itemView.imgIndicatorText}>
                {`${active}/${images.length}`}
              </Text>
            </View>

            <View style={itemView.appBar}>
              <HeaderBtn
                name="chevron-back"
                color={COLORS.white}
                handlePress={() => router.back()}
                bgColor={"rgba(0,0,0,0.4)"}
              />

              <HeaderBtn
                name="share-social"
                color={COLORS.white}
                bgColor={"rgba(0,0,0,0.4)"}
              />
            </View>
          </View>

          {/* <View style={itemView.imagesNav}>
						{images.map((img, _i) => (
							<TouchableOpacity
								key={_i}
								style={itemView.navTab(activeTab, img)}
								onPress={() => {
									setActiveTab(img);
								}}>
								<Image
									style={itemView.navTabImg}
									source={{ uri: img }}
									resizeMode="contain"
								/>
							</TouchableOpacity>
						))}
					</View> */}

          <View style={itemView.priceBox}>
            <Text style={itemView.price}>
              N${" "}
              {Number(_item?.price).toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })}
            </Text>
          </View>

          <View style={itemView.titleBox}>
            <Text style={itemView.title}>{_item?.name}</Text>
          </View>

          <View style={itemView.descriptionBox}>
            <Text>About Item:</Text>
            <Text style={itemView.description}>{_item?.description}</Text>
          </View>

          {otherItems().length > 0 && (
            <View style={itemView.otherItems}>
              <FlatList
                data={otherItems()}
                renderItem={({ item }) => <ItemCard item={item} />}
                keyExtractor={(item) => item?.id}
                numColumns={columnNum}
                scrollEnabled={false}
              />
            </View>
          )}
        </ScrollView>
      )}

      {!isLoading && !error && (
        <View style={itemView.buttonsBox}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={itemView.buttons}>
              <MaterialIcons name="storefront" size={30} color={COLORS.grey} />
              <Text style={itemView.buttonsTxt}>Shop</Text>
            </TouchableOpacity>
            <TouchableOpacity style={itemView.buttons}>
              <Ionicons name="heart-outline" size={30} color={COLORS.grey} />
              <Text style={itemView.buttonsTxt}>Collect</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={itemView.buyBtn}>
            <Text style={itemView.buyBtnPrice}>
              N${" "}
              {Number(_item?.price).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Text>
            <Text style={itemView.buyBtnTxt}>Buy</Text>
          </TouchableOpacity>
        </View>
      )}

      {error && (
        <View style={itemView.netError}>
          <View style={itemView.appBar}>
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
        <View style={itemView.loading}>
          <View style={itemView.appBar}>
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
