
import { LinearGradient } from 'expo-linear-gradient';
import { Redirect,router } from 'expo-router';
import React, { useState } from 'react';
import {
  Animated,
  Dimensions,
  ImageBackground,
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import onboarding from "@/assets/images/onboarding.png";
import CustomButtons from "@/components/custombuttons";

import { useGlobalContext } from "@/context/globalprovider";


const App = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  const [fadeAnim] = useState(new Animated.Value(0));
  
  // Fade in animation when component mounts
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLoginPress = () => {
    // For web compatibility with href
    Linking.openURL('/login');
  };

  return (
    <SafeAreaView style={{ height:"100%" ,backgroundColor:"black"}}>
      <ImageBackground 
        source={{ uri: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80' }}
        style={styles.backgroundImage}
        blurRadius={3}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)']}
          style={styles.overlay}
        >
    <ScrollView 
     showsVerticalScrollIndicator={false} // Hides the vertical scrollbar
     showsHorizontalScrollIndicator={false} 
     style={{ height: "100%"}}
     contentContainerStyle={{flexGrow: 1}}
     >
    <View style={styles.container}>
          <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
            <View style={styles.logoContainer}>
              <Text style={styles.logo}>ZENITH</Text>
            </View>

              <Image source={onboarding} style={{width: "260", height: "160",paddingVertical:"60" , resizeMode : "contain"}}/>
              <Text style={styles.tagline}>A healing touch can mend wounds that medicine alone cannot reach</Text>

            <CustomButtons
            title = "Continue with Email"
            handlePress={() => router.push("/sign-in")}
            style = {{width: "100%",marginTop: "20"}}
            textStyle={{color: "white"}}
            />
            
              
              
          </Animated.View>
    </View>
    </ScrollView>
        </LinearGradient>
      </ImageBackground>
          <StatusBar translucent backgroundColor="transparent" />
      {/* <StatusBar backgroundColor={"#BB8653"} style = "light" /> */}
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  
  container: {
    width : "100%",
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: "80vh",
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 100,
    minHeight: "100vh",
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 5,
  },
  tagline: {
    
    color: '#e0e0e0',
    fontSize: 16,
    marginTop: 10,
    letterSpacing: 1,
    textAlign: 'center',
  },

});

export default App; 

/*

const { width, height } = Dimensions.get('window');

export default function App() {

  const [fadeAnim] = useState(new Animated.Value(0));
  
  // Fade in animation when component mounts
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);


  const handleLoginPress = () => {
    // For web compatibility with href
    Linking.openURL('/login');
  };

  return (
    <SafeAreaView >
      <ScrollView style={[styles.backgroundImage, {  width: '100%',
          height: '100%', flex: 1,}]}>
      <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      
      <ImageBackground 
        source={{ uri: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80' }}
        
        blurRadius={3}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)']}
          style={styles.overlay}
        >
    // {/* <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}> */
//     <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
//             <View style={styles.logoContainer}>
//               <Text style={styles.logo}>ZENITH</Text>
//               <image source={onboarding} style={{width: 100, height: 100}}/>
//               <Text style={styles.tagline}>A healing touch can mend wounds that medicine alone cannot reach</Text>
//             </View>
//       <Text style = {{ text : "3xl", fontFamily : "Poppins-black"}}>Zenith</Text>
//       <Link href="/home" style = {{color:"blue"}}>Go to home</Link>
//       <StatusBar style="auto" />

//       <View style={styles.buttonContainer}>
//               <Link href='/login'
//               style={styles.primaryButton}
//               onPress={handleLoginPress} asChild
// >
//                 <Text style={styles.primaryButtonText}>Login</Text>
//                 </Link>
              
//                 <Link href='/signup'
//               style={styles.secondaryButton} asChild
              
// >
//             <Text style={styles.secondaryButtonText}>Sign Up</Text> 
//                 </Link >
//                 <Link href='/home'
//               style={[styles.secondaryButton, { marginTop: 15 }]}
//               asChild
// >
//             <Text style={styles.secondaryButtonText}>Home page</Text> 
//                 </Link>
//             </View>
//     {/* </View> */}
//     </Animated.View>
//     </LinearGradient>
//     </ImageBackground>
//     </View>
//     </ScrollView>
//     </SafeAreaView>
//   );
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,

//   },
//   backgroundImage: {
//     flex: 1,
//     width: "100%",
//     height: "100%",
//     margin:"0",
//   },
//   overlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   contentContainer: {
//     width: '100%',
//     height: '100%',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 100,
//   },
//   logoContainer: {
//     alignItems: 'center',
//   },
//   logo: {
//     fontSize: 60,
//     fontWeight: 'bold',
//     color: 'white',
//     letterSpacing: 5,
//   },
//   tagline: {
//     color: '#e0e0e0',
//     fontSize: 16,
//     marginTop: 10,
//     letterSpacing: 1,
//     textAlign: 'center',
//   },
//   buttonContainer: {
//     width: '80%',
//     marginBottom: 50,
//   },
//   primaryButton: {
//     backgroundColor: '#6C63FF',
//     paddingVertical: 15,
//     borderRadius: 30,
//     alignItems: 'center',
//     textAlign: 'center',
//     marginBottom: 15,
//     shadowColor: '#6C63FF',
//     shadowOffset: {
//       width: 0,
//       height: 6,
//     },
//     shadowOpacity: 0.5,
//     shadowRadius: 10,
//     elevation: 10,
//   },
//   primaryButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//     letterSpacing: 1,
//   },
//   secondaryButton: {
//     borderWidth: 1,
//     borderColor: 'white',
//     paddingVertical: 15,
//     borderRadius: 30,
//     alignItems: 'center',
//     textAlign: 'center',
//   },
//   secondaryButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//     letterSpacing: 1,
//   },
// })

