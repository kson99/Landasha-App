import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { common } from "../styles";
import { signOut } from "firebase/auth";
import { auth } from "../database/firebase.service";
import { useRouter } from "expo-router";

const ProfileMenu = ({ close }) => {
  const router = useRouter();

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <View>
      <TouchableOpacity
        style={common.modalMenuOption}
        onPress={() => {
          close(false);
          router.push("/EditStore");
        }}
      >
        <MaterialCommunityIcons name="store-edit-outline" size={23} />
        <Text style={common.modalMenuOptionText}>Edit Store</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={common.modalMenuOption}
        onPress={() => {
          close(false);
          router.push("/AddItem");
        }}
      >
        <MaterialCommunityIcons name="plus-box-outline" size={23} />
        <Text style={common.modalMenuOptionText}>Add Item</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={common.modalMenuOption}
        onPress={() => {
          close(false);
          router.push("/ManageItems");
        }}
      >
        <MaterialCommunityIcons name="archive-edit-outline" size={23} />
        <Text style={common.modalMenuOptionText}>Manage My Items</Text>
      </TouchableOpacity>

      <TouchableOpacity style={common.modalMenuOption} onPress={logout}>
        <MaterialCommunityIcons name="logout" size={23} />
        <Text style={common.modalMenuOptionText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileMenu;
