import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useState } from "react";
import styles from "./register.style";
import { Controller, useForm } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { locations } from "../../constants";

const Register = () => {
  const [location, setLocation] = useState("");
  const { control, handleSubmit } = useForm({
    defaultValues: {
      shopName: "",
      username: "",
      email: "",
      phoneNo: "",
      password: "",
    },
  });

  const register = (data) => {
    console.log(data);
  };

  return (
    <View style={styles.page}>
      <View style={styles.form}>
        <Text>Register</Text>

        <Controller
          name="shopName"
          control={control}
          render={() => (
            <TextInput placeholder="Shop Name" style={styles.input} />
          )}
        />

        <Controller
          name="username"
          control={control}
          render={() => (
            <TextInput placeholder="Username" style={styles.input} />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={() => (
            <TextInput placeholder="Email Address" style={styles.input} />
          )}
        />

        <Picker
          style={styles.input}
          selectedValue={location}
          onValueChange={(value, index) => setLocation(value)}
        >
          {locations.map((_location) => (
            <Picker.Item key={_location} label={_location} value={_location} />
          ))}
        </Picker>

        <Controller
          name="phoneNo"
          control={control}
          render={() => (
            <TextInput placeholder="Phone Number" style={styles.input} />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={() => (
            <TextInput placeholder="Password" style={styles.input} />
          )}
        />

        <TouchableOpacity style={styles.btn} onPress={handleSubmit(register)}>
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.registerTxt}>
            Already have an account {"->"} Login{" "}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
