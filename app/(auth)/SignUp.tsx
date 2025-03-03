import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/data/Colors";
import TextInputField from "@/components/shared/TextInputField";
import Button from "@/components/shared/Button";
import * as ImagePicker from "expo-image-picker";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/configs/FirebaseConfig";
import { upload } from "cloudinary-react-native";
import { cld, options } from "@/configs/CloudinaryConfig";
import axios from "axios";

function SignUp() {
  const [fullName, setFullName] = useState<string | undefined>("");
  const [email, setEmail] = useState<string | undefined>("");
  const [password, setPassword] = useState<string | undefined>("");
  const [profileImage, setProfileImage] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onsubmit = () => {
    setLoading(true);
    if (!fullName || !email || !password) {
      ToastAndroid.show(
        "Please fill all fields are required",
        ToastAndroid.BOTTOM
      );
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await upload(cld, {
          file: profileImage,
          options: options,
          callback: async (error: any, response: any) => {
            if (error) {
              console.log(error);
            } else {
              console.log(response?.url);
              const result = await axios.post(
                process.env.EXPO_PUBLIC_HOST_URL + "user",
                {
                  name: fullName,
                  email: email,
                  image: response?.url,
                }
              );
            }
          },
        });
        setLoading(false);
      })
      .catch((err) => {
        const errMsg = err.message;
        ToastAndroid.show(errMsg, ToastAndroid.BOTTOM);
        setLoading(false);
      });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView>
      <View style={{ paddingTop: 60, padding: 20 }}>
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>
          Create New Account
        </Text>
        <View style={{ display: "flex", alignItems: "center" }}>
          <TouchableOpacity onPress={pickImage}>
            <View>
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  style={styles.profileImage}
                />
              ) : (
                <Image
                  source={require("./../../assets/images/profile.png")}
                  style={styles.profileImage}
                />
              )}
              <Ionicons
                name="camera"
                size={24}
                color={Colors.PRIMARY}
                style={{ position: "absolute", bottom: 0, right: 0 }}
              />
            </View>
          </TouchableOpacity>
        </View>
        <TextInputField
          label="Full Name"
          onChangeText={(v: string) => setFullName(v)}
        />
        <TextInputField
          label="Email"
          onChangeText={(v: string) => setEmail(v)}
        />
        <TextInputField
          label="Password"
          onChangeText={(v: string) => setPassword(v)}
          password={true}
        />

        <Button
          name="Create Account"
          onPress={() => onsubmit()}
          loading={loading}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 99,
    marginTop: 20,
  },
});

export default SignUp;
