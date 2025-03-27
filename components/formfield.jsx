import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.container, otherStyles]}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              style={styles.icon}
              resizeMode="contain"
              tintColor="#E4EB9C" // ✅ Moved tintColor as a prop
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  title: {
    color: "#E4EB9C",
    fontSize: 20,
    textAlign: "center",
  },
  inputContainer: {
    backgroundColor: "#fff",
    height: 50,
    width: "95%",
    borderRadius: 10,
    marginTop: "1%",
    marginBottom: 10,
    borderColor: "#E4EB9C",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  input: {
    color: "#000",
    fontSize: 20,
    fontWeight: "600",
    flex: 1, // Allow TextInput to take up available space
  },
  icon: {
    width: 25,
    height: 25,
    opacity: 0.75,
  },
});
