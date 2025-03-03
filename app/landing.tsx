import Button from "@/components/shared/Button";
import Colors from "@/data/Colors";
import { router } from "expo-router";
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  Pressable,
} from "react-native";

export default function LandingScreen() {
  return (
    <View>
      <Image
        source={require("./../assets/images/landing.jpg")}
        style={styles.img}
      />
      <View style={{ padding: 20 }}>
        <Text style={styles.heading}>Welcome to College Campus</Text>
        <Text style={styles.description}>
          Experience the ultimate social hub for college students! Create and
          join vibrant communities, and stay connected with everything happening
          on campus—all in one interactive app.
        </Text>
        <Button
          name="Get Started"
          onPress={() => {
            router.push("/SignUp");
          }}
        />
        <Pressable
          onPress={() => {
            router.push("/SignIn");
          }}
        >
          <Text style={styles.signIn}>
            Already have an account? Sign In here
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: 460,
  },
  heading: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 17,
    textAlign: "center",
    marginTop: 10,
    color: Colors.Gray,
  },
  signIn: {
    fontSize: 17,
    textAlign: "center",
    color: Colors.Gray,
    marginTop: 7,
  },
});
