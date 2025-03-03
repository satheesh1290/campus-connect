import Colors from "@/data/Colors";
import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

type TextInputProps = {
  label: string;
  onChangeText: (text: string) => void;
  password?: boolean;
};

function TextInputField({
  label,
  onChangeText,
  password = false,
}: TextInputProps) {
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ color: Colors.Gray, padding: 5 }}>{label}</Text>
      <TextInput
        placeholder={label}
        secureTextEntry={password}
        style={styles.textInput}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
});

export default TextInputField;
