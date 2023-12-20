import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Image,
  Modal,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { appContext, url } from "../grobal/context";
import { common } from "../styles";
import { Picker } from "@react-native-picker/picker";
import { COLORS, locations } from "../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { HeaderBtn } from "../components";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../database/firebase.service";
import { uriToBlob } from "../util";

const EditStore = () => {
  const { user, reflesh, setReflesh } = useContext(appContext);
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
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
      quality: 0.5,
      aspect: [1, 1],
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!picked.canceled) {
      setImage(picked.assets[0].uri);
    } else {
      console.log("No image selected");
    }
  };

  const saveChanges = async (data) => {
    setLoading(true);
    const blob = await uriToBlob(image);

    try {
      const imageRef = ref(storage, `ProfilePictures/${user.userUid}`);

      await uploadBytes(imageRef, blob).then(async (snapshot) => {
        const imageUrl = await getDownloadURL(imageRef);
        await axios.post(url + "/Users/update", {
          ...data,
          imageUrl,
          userUid: user.userUid,
        });
      });

      setReflesh(reflesh + 1);
      setLoading(false);
      router.back();
    } catch (error) {
      setLoading(false);
      alert("Something went wrong, Try again.");
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
        <View style={styles.form}>
          <Pressable onPress={imagePicker} style={styles.imageHolder}>
            <View>
              {image ? (
                <Image
                  source={{ uri: image }}
                  resizeMode="contain"
                  style={styles.image}
                />
              ) : user?.imageUrl ? (
                <Image
                  source={{ uri: user.imageUrl }}
                  resizeMode="cover"
                  style={styles.image}
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
            render={({ field: { onChange, value, onBlur, ref } }) => (
              <TextInput
                ref={ref}
                value={value}
                onChangeText={onChange}
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
                onChangeText={onChange}
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
                onChangeText={onChange}
                style={common.inputV3}
                inputMode="numeric"
                keyboardType="number-pad"
              />
            )}
          />
        </View>
      </View>

      {/* Loading screen */}
      <Modal
        visible={loading}
        animationType="fade"
        onRequestClose={() => setIsMenu(false)}
        transparent
      >
        <View style={common.modalLoading}>
          <ActivityIndicator color="white" size="large" />
        </View>
      </Modal>
    </ScrollView>
  );
};

export default EditStore;

const styles = StyleSheet.create({
  form: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    paddingBottom: 20,
  },

  imageHolder: {
    flexDirection: "column",
    alignItems: "center",
  },

  image: {
    width: 180,
    height: 180,
    backgroundColor: COLORS.lightGrey,
  },
});
