import Button from "@/components/shared/Button";
import TextInputField from "@/components/shared/TextInputField";
import { auth } from "@/configs/FirebaseConfig";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Image, ToastAndroid } from "react-native";

function SignIn() {
  const [email, setEmail] = useState<string | undefined>("");
  const [password, setPassword] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { user, setUser } = useContext(AuthContext);

  const onSignInClick = () => {
    setLoading(true);
    if (!email || !password) {
      ToastAndroid.show(
        "Please fill all fields are required",
        ToastAndroid.BOTTOM
      );
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(async (resp) => {
        if (resp.user) {
          const result = await axios.get(
            process.env.EXPO_PUBLIC_HOST_URL + "user?email=" + resp.user.email
          );
          console.log(result.data);
          setUser(result.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        const errorMessage = "Invalid Email or Password";
        ToastAndroid.show(errorMessage, ToastAndroid.BOTTOM);
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <View style={{ display: "flex", alignItems: "center", marginTop: 25 }}>
        <Image
          source={require("./../../assets/images/welcome.png")}
          style={styles.img}
        />
        <Text style={{ fontSize: 25, fontWeight: "bold", paddingTop: 25 }}>
          Sign In To Continue
        </Text>
      </View>
      <TextInputField label="Email" onChangeText={(v: string) => setEmail(v)} />
      <TextInputField
        label="Password"
        onChangeText={(v: string) => setPassword(v)}
        password={true}
      />
      <Button
        name="Sign In"
        onPress={() => onSignInClick()}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 50,
  },
  img: {
    width: 330,
    height: 250,
    backgroundColor: "transparent",
    borderRadius: 99,
  },
});

export default SignIn;
