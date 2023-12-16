import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import styles from "./input.styles";

const Input = (props) => {
  return (
    <View style={styles.outline("string")}>
      <TextInput {...props} style={styles.input} />
    </View>
  );
};

export default Input;
