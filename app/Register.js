import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState, useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { locations } from "../constants";
import { common } from "../styles";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../database/firebase.service";
import axios from "axios";
import { appContext, url } from "../grobal/context";
import { useRouter } from "expo-router";

const Register = () => {
  const { reflesh, setReflesh, users } = useContext(appContext);

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      shopName: "",
      username: "",
      email: "",
      location: "",
      phoneNo: "",
      password: "",
      rePassword: "",
    },
  });

  const submit = (data) => {
    let exist = users.find(
      (u) => u.username === data.username || u.phoneNo === data.phoneNo
    );
    //password match check
    if (!data.password.match(data.rePassword)) {
      console.log("re_password", "Passwords do not match!");
    } else if (exist) {
      console.log("phone number Already exists", "Username Already exist");
    } else {
      // setErrMsg("");
      setIsLoading(true);
      register(data);
    }
  };

  const register = async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      var uid = auth.currentUser.uid;

      data = {
        ...data,
        userUid: uid,
      };

      console.log(data);

      axios.post(url + "/Users/signUp", data);

      await signOut(auth);
      setIsLoading(false);
      setReflesh(reflesh + 1);
      router.push("/Login");
    } catch (error) {
      setIsLoading(false);
      var errString = error.message;

      if (errString.includes("email")) {
        console.log("email", "Email already registered");
      } else if (errString.includes("network-request-failed")) {
        console.log("button", "Network connection failed");
      }
    }
  };

  return (
    <View style={common.page}>
      <View style={common.form}>
        <Controller
          name="shopName"
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInput
              placeholder="Shop Name"
              style={common.input}
              onChangeText={onChange}
              value={value}
            />
          )}
        />

        <Controller
          name="username"
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInput
              placeholder="Username"
              style={common.input}
              onChangeText={onChange}
              value={value}
            />
          )}
        />

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
          name="location"
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Picker
              style={common.input}
              selectedValue={value}
              onValueChange={onChange}
            >
              {locations.map((_location) => (
                <Picker.Item
                  key={_location}
                  label={_location}
                  value={_location}
                />
              ))}
            </Picker>
          )}
        />

        <Controller
          name="phoneNo"
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInput
              placeholder="Phone Number"
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

        <Controller
          name="rePassword"
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <TextInput
              placeholder="Re-enter Password"
              style={common.input}
              onChangeText={onChange}
              value={value}
              secureTextEntry
            />
          )}
        />

        <TouchableOpacity style={common.btn} onPress={handleSubmit(submit)}>
          <Text style={common.btnText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
