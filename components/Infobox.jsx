import { View, Text } from "react-native";
import React from "react";

const InfoBox = ({ title, subtitle, containerstyle }) => {
  return (
    <View style={[styles.container, containerstyle]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle || "N/A"}</Text>
    </View>
  );
};

const styles = {
  container: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4169E1",
  },
};

export default InfoBox;
