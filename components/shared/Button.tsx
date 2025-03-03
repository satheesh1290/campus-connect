import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Colors from "@/data/Colors";

type ButtonProps = {
  name: string;
  onPress: () => void;
  loading?: boolean;
};

function Button({ name, onPress, loading }: ButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btn}>
      {loading ? (
        <ActivityIndicator color={Colors.WHITE} />
      ) : (
        <Text style={styles.btnText}>{name}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
  btnText: {
    fontSize: 18,
    color: Colors.WHITE,
  },
});

export default Button;
