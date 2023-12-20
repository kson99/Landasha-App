import { EvilIcons } from "@expo/vector-icons";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";
import { useRouter } from "expo-router";

const SearchBtn = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.wrapper}
        onPress={() => router.push("/Search")}
      >
        <EvilIcons name="search" size={25} color={COLORS.grey} />
        <Text style={styles.text}>Search for item</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBtn;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: SIZES.large,
    height: 43,
    backgroundColor: COLORS.white,
    paddingTop: 5,
  },

  wrapper: {
    height: "100%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
    borderRadius: 10,
  },

  text: {
    fontSize: 18,
    paddingLeft: 3,
    color: COLORS.grey,
  },
});
