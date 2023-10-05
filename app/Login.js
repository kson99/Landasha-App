import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Controller, useForm } from "react-hook-form";
import { common } from "../styles";
import { auth } from "../database/firebase.service";
import { useRouter } from "expo-router";
import { COLORS } from "../constants";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const login = async (data) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      var uid = auth.currentUser.uid;

      if (uid) {
        router.push("/Account");
      }
    } catch (error) {
      alert(error.message);
    }

    setLoading(false);
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
          {loading ? (
            <ActivityIndicator color={COLORS.white} size="small" />
          ) : (
            <Text style={common.btnText}>Login</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
