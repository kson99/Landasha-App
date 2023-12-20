import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useContext, useLocation } from "react";
import logo from "../../assets/logo.png";
import { common } from "../../styles";
import { useRouter } from "expo-router";
import { appContext } from "../../grobal/context";
import { PlatformSafeAreaView, Profile } from "../../components";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants";

const Account = () => {
  const { loggedIn, profileOptionMenu, error } = useContext(appContext);
  const router = useRouter();

  return (
    <PlatformSafeAreaView>
      {error ? (
        <View style={styles.container}>
          <Ionicons name="wifi" size={60} color="red" />
          <Text style={styles.netErr}>Network Error !</Text>
        </View>
      ) : loggedIn ? (
        <View>
          <Profile />
        </View>
      ) : (
        <View style={common.page}>
          <View style={common.form}>
            <Image source={logo} resizeMode="contain" style={styles.image} />

            <Text style={styles.text}>
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
    </PlatformSafeAreaView>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.6,
  },

  netErr: {
    color: "red",
    fontWeight: "800",
    paddingTop: 5,
    letterSpacing: 1.5,
    opacity: 0.8,
  },

  image: {
    width: 300,
    height: 300,
  },

  text: {
    maxWidth: "70%",
    textAlign: "center",
    color: COLORS.primary,
  },
});
