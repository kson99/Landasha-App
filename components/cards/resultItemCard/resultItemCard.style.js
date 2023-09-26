import { StyleSheet } from "react-native";
import { SIZES } from "../../../constants";

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },

  image: {
    height: 130,
    flex: 0.35,
    paddingVertical: SIZES.xxSmall,
  },

  img: {
    width: "100%",
    height: "100%",
  },

  details: {
    flex: 0.65,
    flexDirection: "column",
    paddingVertical: SIZES.xxSmall,
  },

  price: {
    color: "red",
    fontWeight: "bold",
    fontSize: SIZES.medium,
    paddingBottom: 5,
  },
});

export default styles;
