import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState, useContext, useRef } from "react";
import { Picker } from "@react-native-picker/picker";
import { COLORS, locations } from "../constants";
import { common } from "../styles";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../database/firebase.service";
import axios from "axios";
import { appContext, url } from "../grobal/context";
import { useRouter } from "expo-router";
import { Input } from "../components";

const Register = () => {
  const { reflesh, setReflesh, users } = useContext(appContext);

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    shopName: "",
    username: "",
    email: "",
    location: "",
    phoneNo: "",
    password: "",
    rePassword: "",
  });

  const submit = () => {
    let exist = users.find(
      (u) => u.username === data.username || u.phoneNo === data.phoneNo
    );
    //password match check
    if (!data.password.match(data.rePassword)) {
      alert("Passwords do not match!");
    } else if (exist) {
      alert("phone number Already exists", "Username Already exist");
    } else {
      setLoading(true);
      register();
    }
  };

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      var uid = auth.currentUser.uid;
      data = {
        ...data,
        userUid: uid,
      };
      axios.post(url + "/Users/signUp", data);
      await signOut(auth);
      setLoading(false);
      setReflesh(reflesh + 1);
      router.push("/Login");
    } catch (error) {
      setLoading(false);
      var errString = error.message;
      if (errString.includes("email")) {
        alert("Email already registered");
      } else if (errString.includes("network-request-failed")) {
        alert("Network connection failed");
      } else {
        alert(errString);
      }
    }
  };

  const onChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

  return (
    <View style={[common.page, { backgroundColor: "white" }]}>
      <View style={common.form}>
        <Input
          placeholder="Shop Name"
          value={data.shopName}
          onChangeText={(e) => onChange("shopName", e)}
        />

        <Input
          placeholder="Username"
          onChangeText={(e) => onChange("username", e)}
          value={data.username}
        />

        <Input
          autoCapitalize="none"
          placeholder="Email Address"
          onChangeText={(e) => onChange("email", e)}
          value={data.email}
          inputMode="email"
          keyboardType="email-address"
        />

        <View style={common.outline}>
          <Picker
            style={[common.input, { backgroundColor: COLORS.grey_100 }]}
            selectedValue={data.location}
            onValueChange={(e) => onChange("location", e)}
          >
            {locations.map((_location) => (
              <Picker.Item
                key={_location}
                label={_location}
                value={_location}
              />
            ))}
          </Picker>
        </View>

        <Input
          placeholder="Phone Number"
          onChangeText={(e) => onChange("phoneNo", e)}
          value={data.phoneNo}
          inputMode="numeric"
          keyboardType="number-pad"
        />

        <Input
          placeholder="Password"
          onChangeText={(e) => onChange("password", e)}
          autoCapitalize="none"
          value={data.password}
          secureTextEntry
        />

        <Input
          placeholder="Re-enter Password"
          onChangeText={(e) => onChange("rePassword", e)}
          autoCapitalize="none"
          value={data.rePassword}
          secureTextEntry
        />

        <TouchableOpacity style={common.btn} onPress={submit}>
          {loading ? (
            <ActivityIndicator color={COLORS.white} size="small" />
          ) : (
            <Text style={common.btnText}>Register</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
