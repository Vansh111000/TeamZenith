import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

export default function CustomButtons({
  title,
  handlePress,
  style,
  textStyle,
  isLoading,
}) {
  return (
    <TouchableOpacity
      style={[styles.buttonstyle, style, isLoading ? { opacity: 0.5 } : {}]}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
    >
      <Text style={[styles.button, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonstyle: {
    backgroundColor: "#266104",
    borderRadius: 30,
    minHeight: 62,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 28,
    boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)", // ✅ Replace shadow with boxShadow
    elevation: 5, // For Android shadow
  },
  button: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
});
