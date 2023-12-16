import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { common } from "../styles";
import { auth } from "../database/firebase.service";
import { useRouter } from "expo-router";
import { COLORS } from "../constants";
import { Input } from "../components";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const login = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      var uid = auth.currentUser.uid;

      if (uid) {
        router.push("/Account");
      }
    } catch (error) {
      if (error.message.includes("wrong-password")) {
        alert("Wrong Login credentials! Please try again.");
      } else if (error.message.includes("network-request-failed")) {
        alert("Network error!");
      } else if (error.message.includes("too-many-requests")) {
        alert(error.message.split(": ")[1]);
      }
    }

    setLoading(false);
  };

  const ontextChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

  return (
    <View style={[common.page, { backgroundColor: "white" }]}>
      <View style={common.form}>
        <Input
          autoCapitalize="none"
          placeholder="Email Address"
          inputMode="email"
          value={data.email}
          keyboardType="email-address"
          onChangeText={(e) => ontextChange("email", e)}
        />

        <Input
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={(e) => ontextChange("password", e)}
          value={data.password}
          secureTextEntry
        />

        <TouchableOpacity style={common.btn} onPress={login}>
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
