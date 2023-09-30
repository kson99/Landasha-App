import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "react-native-gesture-handler";
import { addItem, common } from "../styles";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";

const AddItem = () => {
  const [images, setImages] = useState([]);
  const categories = ["For Sale", "For Rent", "Closet"];
  const { control, handleSubmit } = useForm({ defaultValues: {} });

  const upload = async (data) => {
    console.log(data);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={addItem.page}>
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
            name="location"
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
              <Image
                source={image}
                resizeMode="contain"
                style={addItem.image}
              />
            ))}

            <View style={addItem.upload}>
              <Ionicons
                name="cloud-upload-outline"
                size={30}
                color={COLORS.grey}
              />
              <Text style={addItem.uploadText}>Add image</Text>
            </View>
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
              />
            )}
          />
        </View>

        <TouchableOpacity style={common.btn} onPress={handleSubmit(upload)}>
          <Text style={common.btnText}>Upload</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 60 }}></View>
    </ScrollView>
  );
};

export default AddItem;
