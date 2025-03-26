import { StyleSheet, Text, View ,TextInput,TouchableOpacity,Image} from 'react-native'
import React from 'react'
import { useState } from 'react'

import { icons } from "../constants";

const FormField = ({title,value,placeholder,handleChangeText,otherStyles, ...props}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View style={[{ justifyContent: "center", alignItems: "center", width: "100%" }, otherStyles]}>
      <Text style={{ color: "#E4EB9C", fontSize: 20, textAlign: "center" }}>{title}</Text>

      <View style={[styles.importbox, { justifyContent: "center", alignItems: "center" ,borderColor: "#E4EB9C", borderWidth: 1,}]}>
        <TextInput
          style={{
            color: "#000",
            width: "100%",
            fontSize: 20,
            fontWeight: "600",
            textAlign: "center",
          }}
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
              style={{
                width: 25,
                height: 25,
                opacity: 0.75,
                tintColor: "#E4EB9C",
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField

const styles = StyleSheet.create({
  importbox: {
    backgroundColor: '#fff',
    height: 50,
    width: "95%",
    borderRadius: 10,
    marginTop: "1%",
    marginBottom: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
})