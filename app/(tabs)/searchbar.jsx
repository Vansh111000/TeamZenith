import { Ionicons } from '@expo/vector-icons';
import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useState } from 'react';
import {
  Alert,
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const DiseaseInfo = () => {
  const [diseaseName, setDiseaseName] = useState('');
  const [diseaseInfo, setDiseaseInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDiseaseInfo = async () => {
    if (!diseaseName.trim()) {
      Alert.alert('Error', 'Please enter a disease name');
      return;
    }

    setIsLoading(true);
    try {
      const genAI = new GoogleGenerativeAI("AIzaSyCVfROeh2ecAP14R9-8rw7MzEAwMRWxWWo");
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `Provide a brief and simple explanation of ${diseaseName} for a general audience. 
      \n- Disease: [Name]\n- Overview: [Short explanation]\n- Symptoms: [Key symptoms]\n- Treatment: [Basic treatment]\n- Prevention: [Prevention tips]\n\nKeep it short and easy to understand.`;

      const result = await model.generateContent(prompt);
      const response = await result.response.text();

      setDiseaseInfo(response);
    } catch (error) {
      console.error('Disease Info Fetch Error:', error);
      Alert.alert('Error', 'Unable to fetch disease information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#E0ECFF' }}>
      {/* Header */}
      <LinearGradient colors={['#3B82F6', '#1E3A8A']} style={{ padding: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white', textAlign: 'center', marginTop: 20 }}>
          Disease Info
        </Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }} keyboardShouldPersistTaps="handled">
        {/* Input Box */}
        <View style={{ backgroundColor: 'white', borderRadius: 15, padding: 20, elevation: 5, shadowColor: '#000' }}>
          <TextInput 
            placeholder="Enter a disease name (e.g., Diabetes, Malaria)"
            placeholderTextColor="#888"
            style={{
              height: 50,
              borderColor: '#3B82F6',
              borderWidth: 1,
              borderRadius: 10,
              padding: 15,
              fontSize: 16,
              marginBottom: 20
            }}
            value={diseaseName}
            onChangeText={setDiseaseName}
          />

          {/* Fetch Button */}
          <TouchableOpacity 
            onPress={fetchDiseaseInfo}
            disabled={isLoading}
            style={{
              backgroundColor: isLoading ? '#A0A0A0' : '#3B82F6',
              padding: 15,
              borderRadius: 10,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center'
            }}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Ionicons name="search" size={24} color="white" />  
                <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 10 }}>
                  Get Info
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Disease Information */}
        {diseaseInfo && (
          <View style={{
            marginTop: 20,
            backgroundColor: 'white',
            borderRadius: 15,
            padding: 20,
            elevation: 5,
            shadowColor: '#000'
          }}>
            <Text style={{
              fontSize: 20, 
              fontWeight: 'bold', 
              color: '#3B82F6',
              marginBottom: 15
            }}>
              Disease Details
            </Text>
            <Text style={{
              fontSize: 16,
              lineHeight: 24
            }}>
              {diseaseInfo}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DiseaseInfo;
