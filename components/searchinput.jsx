import { StyleSheet, Text, View ,TextInput,TouchableOpacity,Image} from 'react-native'
import React from 'react'
import { useState } from 'react'

import { icons } from "../constants";

const SearchInput = ({title,value,placeholder,handleChangeText,otherStyles, ...props}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    

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

        <TouchableOpacity>
            <Image 
            source={ icons.search }
            style={{height: 20, width: 20}}
            resizeMode='contain'
            />
        </TouchableOpacity>
        
      </View>
  )
}

export default SearchInput

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