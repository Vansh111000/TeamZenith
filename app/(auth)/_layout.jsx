import { StyleSheet,Text,View } from "react-native";
import { Redirect, Slot,Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { useGlobalContext } from "@/context/globalprovider";

const AuthLayout = () => {
    const { loading, isLogged } = useGlobalContext();

    // console.log(loading);
    // console.log(isLogged);
    if (!loading && isLogged) return <Redirect href="/home" />;
    return (
    <>
        
        <Stack>
            <Stack.Screen 
            name='sign-in'
            options={{headerShown:false}}
            />
            <Stack.Screen 
            name='sign-up'
            options={{headerShown:false}}
            />
        </Stack>
        <StatusBar backgroundColor ="#92D293" style='dark'/>
       
    </>
    )
}

export default AuthLayout;