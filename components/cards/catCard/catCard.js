import { View } from "react-native";

import styles from "./catCard.style";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { ImageBackground } from "react-native";
import { COLORS, SIZES } from "../../../constants";
import { useRouter } from "expo-router";

const CatCard = ({ item }) => {
  const router = useRouter();
  const images = item ? JSON.parse(item.images) : [];

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        router.push({ pathname: "Group", params: { category: item?.category } })
      }
    >
      <ImageBackground
        source={{ uri: images[0] }}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.textContainer}>
          <Text style={styles.text}>{item?.category}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default CatCard;
