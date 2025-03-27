import { useEffect } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { router } from "expo-router";

// import InfoBox from "@/components/infoBox";
import InfoBox from "@/components/Infobox";
import { icons } from "@/constants";
import { useGlobalContext } from "@/context/globalprovider";
import { getUserPosts, signOut } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import EmptyState from "@/components/EmptyState";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();

  const { data: posts = [] } = useAppwrite(() => getUserPosts(user?.$id));  // Ensure posts is always an array

  useEffect(() => {
    if (!user) {
      console.log("User is null, redirecting to sign-in...");
      router.replace('/(auth)/sign-in');  // Ensure navigation updates
    }
  }, [user]);

  const Logout = async () => {
    console.log("Logging out...");

    try {
      await signOut();
      console.log("Signed out successfully");

      setUser(null);
      setIsLogged(false);

      setTimeout(() => {
        console.log("Redirecting to sign-in page...");
        router.replace('/(auth)/sign-in');
      }, 200);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        ListEmptyComponent={() =>
          (!posts) && user ? (
            <EmptyState title="No Videos Found" subtitle="No videos found for this search query" />
          ) : null
        }
        renderItem={({ item }) => <Text>hello</Text>}
        ListHeaderComponent={() => (
          <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.logoutButton} onPress={Logout}>
              <Image source={icons.logout} resizeMode="contain" style={styles.logoutIcon} />
            </TouchableOpacity>

            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: user?.avatar }}
                style={{ width: "90%", height: "90%", borderRadius: 8 }}
                resizeMode="cover"
              />
            </View>
            {user?.username && (
              <InfoBox 
                title="Username" 
                subtitle={user.username} 
                containerstyle={{ marginTop: 5 }} 
              />
            )}

            <InfoBox 
              title="Email"
              subtitle={user?.email} 
              containerstyle={{ marginTop: 5, marginRight: 5 }} 
            />
            {/* <View style = {styles.container}>
                  <Text >Email</Text>
                  <Text >{user?.email  || "N/A"}</Text>
                </View> */}
          </View>
        )}
      />
    </SafeAreaView>
  );
};

// Styles
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
  avatarContainer: {
    width: 64,
    height: 64,
    borderWidth: 1,
    borderColor: "orange",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4169E1",
  },
});

export default Profile;
