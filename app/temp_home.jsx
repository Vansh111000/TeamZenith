import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,Pressable,
} from 'react-native';

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Common health tips
  const healthTips = [
    {
      id: '1',
      title: 'Stay Hydrated',
      description: 'Drink at least 8 glasses of water daily to maintain proper hydration.',
      category: 'General',
      icon: 'water-outline'
    },
    {
      id: '2',
      title: 'Regular Exercise',
      description: 'Aim for at least 30 minutes of moderate exercise 5 days a week.',
      category: 'Fitness',
      icon: 'fitness-outline'
    },
    {
      id: '3',
      title: 'Balanced Diet',
      description: 'Include fruits, vegetables, whole grains, and lean proteins in your meals.',
      category: 'Nutrition',
      icon: 'nutrition-outline'
    },
    {
      id: '4',
      title: 'Adequate Sleep',
      description: 'Get 7-9 hours of quality sleep every night for optimal health.',
      category: 'Rest',
      icon: 'bed-outline'
    },
    {
      id: '5',
      title: 'Stress Management',
      description: 'Practice meditation, deep breathing, or yoga to reduce stress levels.',
      category: 'Mental Health',
      icon: 'brain-outline'
    }
  ];

  // Common diseases information
  const commonDiseases = [
    {
      id: '1',
      name: 'Hypertension',
      symptoms: 'Headaches, shortness of breath, nosebleeds',
      category: 'Cardiovascular'
    },
    {
      id: '2',
      name: 'Type 2 Diabetes',
      symptoms: 'Increased thirst, frequent urination, unexplained weight loss',
      category: 'Endocrine'
    },
    {
      id: '3',
      name: 'Common Cold',
      symptoms: 'Runny nose, sore throat, cough, congestion',
      category: 'Respiratory'
    },
    {
      id: '4',
      name: 'Anxiety Disorder',
      symptoms: 'Excessive worry, restlessness, fatigue, difficulty concentrating',
      category: 'Mental Health'
    }
  ];

  // Categories for filtering
  const categories = ['All', 'General', 'Fitness', 'Nutrition', 'Rest', 'Mental Health'];

  const filteredTips = selectedCategory === 'All' 
    ? healthTips 
    : healthTips.filter(tip => tip.category === selectedCategory);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header with gradient background */}
      <LinearGradient
        colors={['#4b6cb7', '#182848']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.appName}>Zenith Healthcare</Text>
          <Ionicons name="notifications-outline" size={24} color="white" />
        </View>
        
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>
            Welcome to Zenith Health Care app, we will help you find the health problems or disease you are currently facing
          </Text>
        </View>
      </LinearGradient>

      {/* Main content */}
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Health Assessment Card */}
        <TouchableOpacity style={styles.assessmentCard}>
          <LinearGradient
            colors={['#43cea2', '#185a9d']}
            style={styles.assessmentCardGradient}
          >
            <View style={styles.assessmentCardContent}>
              <View>
                <Text style={styles.assessmentCardTitle}>Health Assessment</Text>
                <Text style={styles.assessmentCardSubtitle}>
                  Take a quick assessment to identify potential health issues
                </Text>
              </View>
              <Ionicons name="arrow-forward-circle" size={40} color="white" />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategoryButton
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category && styles.selectedCategoryButtonText
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Health Tips */}
        <Text style={styles.sectionTitle}>Health Tips</Text>
        <View style={styles.tipsContainer}>
          {filteredTips.map((tip) => (
            <View key={tip.id} style={styles.tipCard}>
              <View style={styles.tipIconContainer}>
                <Ionicons name={tip.icon} size={30} color="#4b6cb7" />
              </View>
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipDescription}>{tip.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Common Diseases */}
        <Text style={styles.sectionTitle}>Common Diseases</Text>
        <View style={styles.diseasesContainer}>
          {commonDiseases.map((disease) => (
            <TouchableOpacity key={disease.id} style={styles.diseaseCard}>
              <View style={styles.diseaseCardHeader}>
                <Text style={styles.diseaseName}>{disease.name}</Text>
                <View style={styles.categoryTag}>
                  <Text style={styles.categoryTagText}>{disease.category}</Text>
                </View>
              </View>
              <Text style={styles.diseaseSymptoms}>
                <Text style={styles.symptomsLabel}>Symptoms: </Text>
                {disease.symptoms}
              </Text>
              <Text style={styles.learnMore}>Learn more →</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#4b6cb7" />
          <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
        </TouchableOpacity>
        
            <Link href={'/guess'}  asChild >
            <Pressable style={styles.navItem}>
        <MaterialIcons name="health-and-safety" size={30} color="#888" />
          <Text style={[styles.navText, styles.activeNavText, {color: '#888',} ]}>Guess</Text>
          </Pressable>
          </Link>
        
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="search" size={24} color="#888" />
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="medkit" size={24} color="#888" />
          <Text style={styles.navText}>Diseases</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person" size={24} color="#888" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    paddingTop: 40,
  },
  welcomeContainer: {
    marginTop: 20,
  },
  welcomeText: {
    fontSize: 16,
    color: 'white',
    lineHeight: 24,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  assessmentCard: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  assessmentCardGradient: {
    padding: 20,
  },
  assessmentCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  assessmentCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  assessmentCardSubtitle: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
    maxWidth: '80%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 15,
    color: '#333',
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#e9ecef',
  },
  selectedCategoryButton: {
    backgroundColor: '#4b6cb7',
  },
  categoryButtonText: {
    color: '#555',
    fontWeight: '500',
  },
  selectedCategoryButtonText: {
    color: 'white',
  },
  tipsContainer: {
    marginBottom: 20,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  tipIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e9f5ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  tipDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  diseasesContainer: {
    marginBottom: 80,
  },
  diseaseCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  diseaseCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  diseaseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  categoryTag: {
    backgroundColor: '#e9ecef',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  categoryTagText: {
    fontSize: 12,
    color: '#4b6cb7',
  },
  diseaseSymptoms: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 10,
  },
  symptomsLabel: {
    fontWeight: '500',
  },
  learnMore: {
    fontSize: 14,
    color: '#4b6cb7',
    fontWeight: '500',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  navText: {
    fontSize: 12,
    marginTop: 3,
    color: '#888',
  },
  activeNavText: {
    color: '#4b6cb7',
  },
});

export default HomeScreen;