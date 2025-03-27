import { Ionicons } from '@expo/vector-icons';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
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
      const genAI = new GoogleGenerativeAI("AIzaSyCckJqoHEUlJmOUDstkiTPG0p-0Xru9Xyo");
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  
      const prompt = `Provide a structured, easy-to-understand explanation of ${diseaseName}.
      Format it as follows:
      Overview: (Brief description)
      Symptoms: (Comma-separated list)
      Treatment: (Short explanation)
      Prevention: (Comma-separated list)`;
  
      const result = await model.generateContent(prompt);
      const response = await result.response.text();
  
      let info = { raw: response };

      // Extract structured data from response
      const lines = response.split("\n").map(line => line.trim());
      lines.forEach(line => {
        if (line.startsWith("Overview:")) {
          info.overview = line.replace("Overview:", "").trim();
        } else if (line.startsWith("Symptoms:")) {
          info.symptoms = line.replace("Symptoms:", "").split(",").map(s => s.trim());
        } else if (line.startsWith("Treatment:")) {
          info.treatment = line.replace("Treatment:", "").trim();
        } else if (line.startsWith("Prevention:")) {
          info.prevention = line.replace("Prevention:", "").split(",").map(p => p.trim());
        }
      });

      setDiseaseInfo(info);
    } catch (error) {
      console.error("Disease Info Fetch Error:", error);
      Alert.alert("Error", "Unable to fetch disease information. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#3B82F6', '#1E3A8A']} style={styles.header}>
        <Text style={styles.headerText}>Disease Info</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        {/* Input Box */}
        <View style={styles.inputContainer}>
          <TextInput 
            placeholder="Enter a disease name (e.g., Diabetes, Malaria)"
            placeholderTextColor="#888"
            style={styles.inputBox}
            value={diseaseName}
            onChangeText={setDiseaseName}
          />

          {/* Fetch Button */}
          <TouchableOpacity 
            onPress={fetchDiseaseInfo}
            disabled={isLoading}
            style={[styles.button, isLoading && styles.buttonDisabled]}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Ionicons name="search" size={24} color="white" />  
                <Text style={styles.buttonText}>Get Info</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Disease Information */}
        {diseaseInfo && (
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Disease Details</Text>

            {diseaseInfo.overview ? (
              <>
                <View style={styles.infoSection}>
                  <Text style={styles.sectionTitle}>🩺 Overview</Text>
                  <Text style={styles.infoText}>{diseaseInfo.overview}</Text>
                </View>

                <View style={styles.infoSection}>
                  <Text style={styles.sectionTitle}>⚠️ Symptoms</Text>
                  {diseaseInfo.symptoms.map((symptom, index) => (
                    <Text key={index} style={styles.bulletPoint}>• {symptom}</Text>
                  ))}
                </View>

                <View style={styles.infoSection}>
                  <Text style={styles.sectionTitle}>💊 Treatment</Text>
                  <Text style={styles.infoText}>{diseaseInfo.treatment}</Text>
                </View>

                <View style={styles.infoSection}>
                  <Text style={styles.sectionTitle}>✅ Prevention</Text>
                  {diseaseInfo.prevention.map((tip, index) => (
                    <Text key={index} style={styles.bulletPoint}>• {tip}</Text>
                  ))}
                </View>
              </>
            ) : (
              <Text style={styles.infoText}>{diseaseInfo.raw}</Text>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0ECFF',
  },
  header: {
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
  },
  inputBox: {
    height: 50,
    borderColor: '#3B82F6',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3B82F6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#A0A0A0',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  infoContainer: {
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
  },
  infoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 15,
    textAlign: 'center',
  },
  infoSection: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#444',
  },
  bulletPoint: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    lineHeight: 24,
  },
});

export default DiseaseInfo;
