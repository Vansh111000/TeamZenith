import { Image, Text, View } from "react-native";

import { icons } from "../../constants";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";


export default function Featuresroot(){
  return (
    <>
    <Stack>
        <Stack.Screen 
            name='guess'
            options={{headerShown:true}}
        />
        <Stack.Screen 
            name='workout'
            options={{headerShown:true}}
        />
        <Stack.Screen 
            name='stress'
            options={{headerShown:true}}
        />
    </Stack>
    </>
  )
}

