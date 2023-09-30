import { StyleSheet } from "react-native";
import { COLORS } from "../constants";

const addItem = StyleSheet.create({
  page: {
    width: "100%",
    padding: 20,
    flex: 1,
    backgroundColor: COLORS.background,
  },

  form: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 25,
  },

  images: {
    minWidth: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
  },

  image: {
    height: 100,
    width: "auto",
  },

  upload: {
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 2,
    width: 100,
    height: 100,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  uploadText: {
    fontSize: 12,
    paddingTop: 2,
    color: COLORS.grey,
  },
});

export default addItem;
