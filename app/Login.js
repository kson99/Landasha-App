import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Controller, useForm } from "react-hook-form";
import { common } from "../styles";
import { auth } from "../database/firebase.service";
import { useRouter } from "expo-router";

const Login = () => {
  const router = useRouter();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const login = async (data) => {
    console.log(data);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      var uid = auth.currentUser.uid;

      if (uid) {
        console.log("User login successful", uid);
      }
      router.push("/Account");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={common.page}>
      <View style={common.form}>
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInput
              placeholder="Email Address"
              style={common.input}
              onChangeText={onChange}
              value={value}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInput
              placeholder="Password"
              style={common.input}
              onChangeText={onChange}
              value={value}
              secureTextEntry
            />
          )}
        />

        <TouchableOpacity style={common.btn} onPress={handleSubmit(login)}>
          <Text style={common.btnText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
