import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native";
import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { appContext, url } from "../grobal/context";
import { common, editStore } from "../styles";
import { Picker } from "@react-native-picker/picker";
import { COLORS, locations } from "../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { HeaderBtn } from "../components";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../database/firebase.service";

const EditStore = () => {
  const { user } = useContext(appContext);
  const [image, setImage] = useState(null);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      shopName: user.shopName,
      username: user.username,
      location: user.location,
      phoneNo: user.phoneNo,
    },
  });

  const imagePicker = async () => {
    let picked = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      aspect: [1, 1],
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!picked.canceled) {
      console.log(picked);
      setImage(picked.assets[0].uri);
    } else {
      console.log("No image selected");
    }
  };

  const saveChanges = async (data) => {
    const imgData = await fetch(image);
    const blob = imgData.blob();
    try {
      // let imageUrl = "";
      const imageRef = ref(
        storage,
        `ProfilePictures/${user.userUid}.${image.split(".")[1]}`
      );

      await uploadBytes(imageRef, blob).then((res) => {
        console.log("done: ", res);
      });
      // await axios.post(url + "/Users/update", { ...data, imageUrl });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={common.pageV2}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <HeaderBtn
              name="checkmark"
              handlePress={handleSubmit(saveChanges)}
            />
          ),
        }}
      />

      <View style={common.formV2}>
        <View style={editStore.form}>
          <Pressable onPress={imagePicker} style={editStore.imageHolder}>
            <View>
              {image ? (
                <Image
                  source={{ uri: image }}
                  resizeMode="contain"
                  style={editStore.image}
                />
              ) : user?.imageUrl ? (
                <Image
                  source={{ uri: user.imageUrl }}
                  resizeMode="cover"
                  style={editStore.image}
                />
              ) : (
                <View>
                  <MaterialCommunityIcons
                    name="storefront"
                    size={180}
                    color={COLORS.grey}
                  />
                </View>
              )}
            </View>

            <Text style={{ fontSize: 12, color: "blue", paddingTop: 5 }}>
              Change Shop Picture or Avatar
            </Text>
          </Pressable>
        </View>

        <View>
          <Text style={common.inputLabelV2}>Shop Name</Text>
          <Controller
            name="shopName"
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                value={value}
                onChange={onChange}
                style={common.inputV3}
              />
            )}
          />
        </View>

        <View>
          <Text style={common.inputLabelV2}>Username</Text>
          <Controller
            name="username"
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                value={value}
                onChange={onChange}
                style={common.inputV3}
              />
            )}
          />
        </View>

        <View>
          <Text style={common.inputLabelV2}>Location</Text>
          <Controller
            name="location"
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Picker
                style={common.select}
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
        </View>

        <View>
          <Text style={common.inputLabelV2}>Phone Number</Text>
          <Controller
            name="phoneNo"
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextInput
                value={value}
                onChange={onChange}
                style={common.inputV3}
              />
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditStore;
