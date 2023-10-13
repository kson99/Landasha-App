import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState, useContext, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { COLORS, locations } from "../constants";
import { common } from "../styles";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../database/firebase.service";
import axios from "axios";
import { appContext, url } from "../grobal/context";
import { useRouter } from "expo-router";

const Register = () => {
  const { reflesh, setReflesh, users } = useContext(appContext);

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const shopNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const phoneNoRef = useRef();
  const passwordRef = useRef();
  const rePasswordRef = useRef();

  const { control, handleSubmit, errors } = useForm({
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
      alert("Passwords do not match!");
    } else if (exist) {
      alert("phone number Already exists", "Username Already exist");
    } else {
      setLoading(true);
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

  return (
    <View style={common.page}>
      <View style={common.form}>
        <Controller
          name="shopName"
          rules={{ required: true }}
          control={control}
          onFocus={() => shopNameRef.current.focus()}
          render={(props) => (
            <TextInput
              {...props}
              ref={shopNameRef}
              placeholder="Shop Name"
              style={common.input}
              onChangeText={(value) => props.onChange(value)}
            />
          )}
        />

        <Controller
          name="username"
          rules={{ required: true }}
          control={control}
          onFocus={() => usernameRef.current.focus()}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              ref={usernameRef}
              onBlur={onBlur}
              placeholder="Username"
              style={common.input}
              onChangeText={onChange}
              value={value}
            />
          )}
        />

        <Controller
          name="email"
          rules={{ required: true }}
          control={control}
          onFocus={() => emailRef.current.focus()}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              ref={emailRef}
              onBlur={onBlur}
              placeholder="Email Address"
              style={common.input}
              onChangeText={onChange}
              value={value}
              inputMode="email"
              keyboardType="email-address"
            />
          )}
        />

        <Controller
          name="location"
          rules={{ required: true }}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Picker
              onBlur={onBlur}
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
          rules={{ required: true }}
          control={control}
          onFocus={() => phoneNoRef.current.focus()}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              ref={phoneNoRef}
              onBlur={onBlur}
              placeholder="Phone Number"
              style={common.input}
              onChangeText={onChange}
              value={value}
              inputMode="numeric"
              keyboardType="number-pad"
            />
          )}
        />

        <Controller
          name="password"
          rules={{ required: true }}
          control={control}
          onFocus={() => passwordRef.current.focus()}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              ref={passwordRef}
              onBlur={onBlur}
              placeholder="Password"
              style={common.input}
              onChangeText={onChange}
              autoCapitalize="none"
              value={value}
              secureTextEntry
            />
          )}
        />

        <Controller
          name="rePassword"
          rules={{ required: true }}
          control={control}
          onFocus={() => rePasswordRef.current.focus()}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              ref={rePasswordRef}
              onFocus={() => {}}
              onBlur={onBlur}
              placeholder="Re-enter Password"
              style={common.input}
              onChangeText={onChange}
              autoCapitalize="none"
              value={value}
              secureTextEntry
            />
          )}
        />

        <TouchableOpacity style={common.btn} onPress={handleSubmit(submit)}>
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
