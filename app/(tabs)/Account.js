import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useLocation } from "react";
import logo from "../../assets/logo.png";
import { account, common } from "../../styles";
import { useRouter } from "expo-router";
import { appContext } from "../../grobal/context";
import { Profile } from "../../components";

const Account = () => {
  const { loggedIn } = useContext(appContext);
  const router = useRouter();

  return (
    <SafeAreaView style={common.safeArea}>
      {loggedIn ? (
        <Profile />
      ) : (
        <View style={common.page}>
          <View style={common.form}>
            <Image source={logo} resizeMode="contain" style={account.image} />

            <Text style={account.text}>
              {" "}
              If you're a store owner or representative, want to create a store.
              Click on the respective button below.
            </Text>

            <TouchableOpacity
              style={common.btn}
              onPress={() => router.push("/Login")}
            >
              <Text style={common.btnText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={common.btn}
              onPress={() => router.push("/Register")}
            >
              <Text style={common.btnText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Account;
