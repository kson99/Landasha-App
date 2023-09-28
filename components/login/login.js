import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import styles from "./login.style";

const Login = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const login = (data) => {
    console.log(data);
  };

  return (
    <View style={styles.page}>
      <View style={styles.form}>
        <Text>Login</Text>

        <Controller
          name="email"
          control={control}
          render={() => (
            <TextInput placeholder="Email Address" style={styles.input} />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={() => (
            <TextInput placeholder="Password" style={styles.input} />
          )}
        />

        <TouchableOpacity style={styles.btn} onPress={handleSubmit(login)}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.registerTxt}>
            Become a Store {"->"} Register{" "}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
