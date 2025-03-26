import { View, Text, ScrollView, StyleSheet, Alert } from "react-native";
import React from "react";
import {
  SafeAreaFrameContext,
  SafeAreaView,
} from "react-native-safe-area-context";
import FormField from "../../components/formfield";
import { useState } from "react";
import CustomButtons from "@/components/custombuttons";
import { Link, router } from "expo-router";
import { getCurrentUser, signIn } from "@/lib/appwrite";
import { accounts } from "@/lib/appwrite"; 
import { useGlobalContext } from "@/context/globalprovider";

const SignIn = () => {
    const { setUser, setIsLogged } = useGlobalContext();
    const [isSubmitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
      email: "",
      password: "",
    });
  
    const submit = async () => {
      if (form.email === "" || form.password === "") {
        Alert.alert("Error", "Please fill in all fields");
      }
  
      setSubmitting(true);
  
      try {
        await signIn(form.email, form.password);
        const result = await getCurrentUser();
        setUser(result);
        setIsLogged(true);
  
        Alert.alert("Success", "User signed in successfully");
        router.replace("/home");
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setSubmitting(false);
      }
    };

  return (
    <SafeAreaView style={{ height: "100%", backgroundColor: "#92D293" }}>
      <ScrollView>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            Height: "100%",
            paddingHorizontal: 4,
            marginVertical: 39,
          }}
        >
          <Text style={styles.logo}>ZENITH</Text>

          <Text style={styles.logintozenithtext}>Login to Zenith</Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles={{ marginVertical: 6 }}
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles={{ marginVertical: 6 }}
          />

          <CustomButtons
            title="Sign In"
            handlePress={submit}
            style={{ marginVertical: 6 }}
            textStyle={{ color: "#E4EB9C" }}
            isLoading={isSubmitting}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 50,
              width: "100%",
            }}
          >
            <Text style={{ color: "white" }}>Don't have an account? </Text>
            <Link href="/sign-up" style={{ textDecorationLine: "underline" }}>
              <Text
                style={{
                  color: "#E4EB9C",
                  fontWeight: "bold",
                  marginHorizontal: 15,
                  fontSize: 20,
                }}
              >
                Sign Up
              </Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logo: {
    fontSize: 60,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 5,
  },
  logintozenithtext: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    marginVertical: 50,
  },
});

export default SignIn;
