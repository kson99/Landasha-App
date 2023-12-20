import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { COLORS } from "../constants";

const Input = (props) => {
  return (
    <View style={styles.outline("string")}>
      <TextInput {...props} style={styles.input} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  outline: () => ({
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
    borderRadius: 10,
    overflow: "hidden",
  }),

  input: {
    minWidth: "80%",
    backgroundColor: COLORS.grey_100,
    padding: 10,
    borderRadius: 5,
  },
});
