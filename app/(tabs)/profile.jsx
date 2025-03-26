import { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import useAppwrite from "../../lib/useAppwrite";
import { getUserPosts, signOut } from "../../lib/appwrite";
import { useGlobalContext } from "@/context/globalprovider";
import { icons } from "@/constants";
import { StyleSheet } from "react-native";
import EmptyState from "@/components/EmptyState";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));
  // const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  const Logout = () => {

  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Text>
            hello
          </Text>
        )}
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <TouchableOpacity
            style={styles.logoutButton}
              onPress={Logout}   
            >
              {/* //fuction to logout */}
              <Image 
                source={icons.logout} 
                resizeMode="contain"
                style={styles.logoutIcon} 
              />
            </TouchableOpacity>

          <View style = {styles.avatarContainer}>
          <Image
                source={{ uri: user?.avatar }}
                style={{
                  width: "90%",
                  height: "90%",
                  borderRadius: 8,
                }}               
                resizeMode="cover"
              />
          </View>

          </View>
        )}
  //       ListEmptyComponent={() => (
  //         <EmptyState
  //           title="No Videos Found"
  //           subtitle="No videos found for this search query"
  //         />
  //       )}
      />
    </SafeAreaView>
  );
};

// Ensure styles are defined after the component
const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#primaryColor",
    flex: 1,
  },
  headerContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 48,
    paddingHorizontal: 16,
  },
  logoutButton: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  logoutIcon: {
    width: 24,
    height: 24,
  },
  avatarContainer:{
      width: 64,
      height: 64,
      borderWidth: 1,
      borderColor: "orange",
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
  }
});

export default Profile;
