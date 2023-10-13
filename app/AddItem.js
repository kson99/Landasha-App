import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useState, useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "react-native-gesture-handler";
import { addItem, common } from "../styles";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";
import * as ImagePicker from "expo-image-picker";
import { uriToBlob } from "../util";
import { storage } from "../database/firebase.service";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { appContext, url } from "../grobal/context";
import uuid from "react-native-uuid";
import { Stack, useRouter } from "expo-router";
import axios from "axios";
import { HeaderBtn } from "../components";

const AddItem = () => {
  const { user, reflesh, setReflesh } = useContext(appContext);
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const categories = ["For Sale", "For Rent", "Closet"];

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      categories: categories[0],
      description: "",
      price: "",
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
      setImages((prev) => [...prev, picked.assets[0].uri]);
    } else {
      console.log("No image selected");
    }
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((img, i) => i !== index));

    console.log(images.length);
  };

  const upload = async (data) => {
    const itemId = uuid.v4();

    if (images.length === 0) {
      alert("Image required");
    } else {
      setLoading(true);
      let _images = [];

      await Promise.all(
        images.map(async (img, i) => {
          const blob = await uriToBlob(img);

          try {
            const imageRef = ref(storage, `ItemPictures/${itemId}/${i}`);
            await uploadBytes(imageRef, blob).then(async (snapshot) => {
              const imgUrl = await getDownloadURL(imageRef);
              _images.push(imgUrl);
            });
          } catch (error) {
            console.log(error);
          }
        })
      );

      await axios.post(url + "/Items/upload", {
        ...data,
        itemId,
        owner: user.userUid,
        images: JSON.stringify(_images),
      });

      setReflesh(reflesh + 1);
      setLoading(false);
      router.back();
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={addItem.page}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <HeaderBtn name="checkmark" handlePress={handleSubmit(upload)} />
          ),
        }}
      />
      <View style={addItem.form}>
        <View>
          <Text style={common.inputLabel}>Name</Text>
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Lenovo ideapad..."
                onChangeText={onChange}
                value={value}
                style={common.inputV2}
              />
            )}
          />
        </View>

        <View>
          <Text style={common.inputLabel}>Category</Text>
          <Controller
            name="category"
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Picker
                style={common.inputV2}
                selectedValue={value}
                onValueChange={onChange}
              >
                {categories.map((cat) => (
                  <Picker.Item key={cat} label={cat} value={cat} />
                ))}
              </Picker>
            )}
          />
        </View>

        <View>
          <Text style={common.inputLabel}>Images</Text>
          <View style={addItem.images}>
            {images.map((image, _i) => (
              <View key={_i} style={addItem.imageHolder}>
                <Image
                  source={{ uri: image }}
                  resizeMode="cover"
                  style={addItem.image}
                />

                <Pressable
                  onPress={() => removeImage(_i)}
                  style={addItem.remove}
                >
                  <Ionicons name="close-circle" color="red" size={20} />
                </Pressable>
              </View>
            ))}

            {images.length < 5 && (
              <Pressable onPress={imagePicker} style={addItem.upload}>
                <Ionicons
                  name="cloud-upload-outline"
                  size={30}
                  color={COLORS.grey}
                />
                <Text style={addItem.uploadText}>Add image</Text>
              </Pressable>
            )}
          </View>
        </View>

        <View>
          <Text style={common.inputLabel}>Description</Text>
          <Controller
            name="description"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Item description..."
                onChangeText={onChange}
                value={value}
                multiline={true}
                style={common.textArea}
              />
            )}
          />
        </View>

        <View>
          <Text style={common.inputLabel}>Price (in N$)</Text>
          <Controller
            name="price"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="100"
                onChangeText={onChange}
                value={value}
                style={common.inputV2}
                inputMode="numeric"
                keyboardType="number-pad"
              />
            )}
          />
        </View>
      </View>

      <View style={{ height: 60 }}></View>

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

export default AddItem;
