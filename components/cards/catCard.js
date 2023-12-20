import { StyleSheet, View } from "react-native";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { ImageBackground } from "react-native";
import { COLORS, SIZES } from "../../constants";
import { useRouter } from "expo-router";
import { width } from "../../grobal/context";

const CatCard = ({ item }) => {
  const router = useRouter();
  const images = item ? JSON.parse(item.images) : [];

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push(`category/${item.category}`)}
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

const styles = StyleSheet.create({
  container: {
    borderRadius: SIZES.medium,
    backgroundColor: COLORS.white,
  },

  image: {
    width: width / 3.4,
    height: width / 3.4,
    borderRadius: 5,
    overflow: "hidden",
    borderColor: "red",
    borderWidth: 1,
  },

  textContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    bottom: 0,
    right: 0,
    width: "100%",
    backgroundColor: "rgba(255,0,0,0.6)",
    color: "white",
    fontSize: SIZES.medium,
    fontWeight: "bold",
    padding: 10,
    overflow: "hidden",
    textAlign: "center",
  },
});
