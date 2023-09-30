import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { appContext } from "../grobal/context";
import { common } from "../styles";
import { Picker } from "@react-native-picker/picker";
import { COLORS, locations } from "../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const EditStore = () => {
  const { user } = useContext(appContext);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      shopName: user.shopName,
      username: user.username,
      location: user.location,
      phoneNo: user.phoneNo,
    },
  });

  const saveChanges = (data) => {
    console.log(data);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={common.pageV2}>
      <View style={common.formV2}>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            paddingBottom: 20,
          }}
        >
          <View>
            {user?.imageUrl ? (
              <Image
                source={{ uri: user.imageUrl }}
                resizeMode="cover"
                // style={styles.image}
              />
            ) : (
              <View>
                <MaterialCommunityIcons
                  name="storefront"
                  size={100}
                  color={COLORS.grey}
                />
              </View>
            )}
          </View>

          <Text style={{ fontSize: 12, color: "blue", paddingTop: 5 }}>
            Change Shop Picture or Avatar
          </Text>
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

        <TouchableOpacity
          style={common.btn}
          onPress={handleSubmit(saveChanges)}
        >
          <Text style={common.btnText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditStore;
