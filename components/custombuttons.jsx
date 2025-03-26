import { StyleSheet, Text, View , TouchableOpacity } from 'react-native'
import React from 'react'


export default function CustomButtons ({title,handlePress,style,textStyle,isLoading})  {
return (
    <TouchableOpacity style={[styles.buttonstyle, style, isLoading ? { opacity: 0.5 } : {}]}
    onPress={handlePress}
    activeOpacity={0.7}
    disabled={isLoading}
    >
        <Text style = {[styles.button,textStyle]}>{title}</Text>
    </TouchableOpacity>
)
}


const styles = StyleSheet.create({
    buttonstyle: {
        backgroundColor: "#266104",
        borderRadius: 30,
        minHeight: 62,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 28, // Add padding for better button shape
        shadowColor: "#000", // Add shadow for button effect
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // For Android shadow
    },
    button: {
        color: "rgba(255,255,255,0.9)", // Slightly increase opacity for better visibility
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: "Roboto", // Professional and clean font
    }, 
})