import {
  View,
  Text,
  ScrollView,
  TextInput,
  Modal,
  ActivityIndicator,
  Pressable,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { appContext, url } from "../../grobal/context";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import axios from "axios";
import { HeaderBtn } from "../../components";
import { addItem, common } from "../../styles";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { COLORS } from "../../constants";
import { storage } from "../../database/firebase.service";
import { uriToBlob } from "../../util";

const EditItem = () => {
  const { items, user, reflesh, setReflesh } = useContext(appContext);
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const categories = ["For Sale", "For Rent", "Closet"];
  const { _id } = useLocalSearchParams();

  const _item = items?.find(({ id }) => {
    return `${id}` === _id;
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: _item?.name,
      category: _item?.category,
      description: _item?.description,
      price: `${_item?.price}`,
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
  };

  const update = async (data) => {
    if (images.length === 0) {
      alert("Image required");
    } else {
      setLoading(true);
      let _images = [];
      await Promise.all(
        images.map(async (img, i) => {
          if (img.includes("https")) {
            _images.push(img);
          } else {
            const blob = await uriToBlob(img);

            try {
              const imageRef = ref(
                storage,
                `ItemPictures/${_item.itemId}/${i}`
              );
              await uploadBytes(imageRef, blob).then(async (snapshot) => {
                const imgUrl = await getDownloadURL(imageRef);
                _images.push(imgUrl);
              });
            } catch (error) {
              console.log(error);
            }
          }
        })
      );
      await axios.post(url + "/Items/update", {
        ...data,
        itemId: _item.itemId,
        owner: items.owner,
        images: JSON.stringify(_images),
      });
      setReflesh(reflesh + 1);
      setLoading(false);
      router.back();
    }
  };

  useEffect(() => {
    let _images = _item ? eval(_item.images) : [];
    setImages(_images);
  }, [_item]);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={addItem.page}>
      <Stack.Screen
        options={{
          title: "Edit Item",
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
          headerRight: () => (
            <HeaderBtn name="checkmark" handlePress={handleSubmit(update)} />
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

export default EditItem;
