import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";

import { icons } from "../../constants";
import { StatusBar } from "expo-status-bar";


const TabIcon = ({ icon, color, name, focused }) => {
    return (
      <View style={{ flex:1 ,items:"center", justify : "Center" ,  gap:2, marginHorizontal: "-35" , textAlign: "center" }}>
        <Image
          source={icon}
          resizeMode="contain"
          style={{ tintColor: color, width: 24, height: 24, justify : "Center" , alignItems: "Center" ,marginHorizontal: "auto" }}
        />
        <Text
          style={{
            color: color,
            flexDirection: "row",
            fontFamily: focused ? "Poppins-SemiBold" : "Poppins-Regular",
            fontSize: 12,
            margin: "0",
            padding: 0,
            
            
          }}
        >
          {name}
        </Text>
      </View>
    );
  };

  const TabLayout = () => {
  
    return (
      <>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: "#93CCEA",
            tabBarInactiveTintColor: "#9d9dc2",
            tabBarShowLabel: false,
            tabBarStyle: {
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
            }
            
          }}
        >
          <Tabs.Screen
            name="home"
            options={{
              
              title: "Home",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.home}
                  color={color}
                  name="Home"
                  focused={focused}
                />
              ),
            }}
          />
          
          <Tabs.Screen
            name="searchbar"
            options={{
              
              title: "Search",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.search}
                  color={color}
                  name="Search"
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              
              title: "Profile",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.profile}
                  color={color}
                  name="profile"
                  focused={focused}
                />
              ),
            }}
          />

          
          
          <StatusBar backgroundColor ="#92D293" style='blue'/>
        </Tabs>
      </>
    );
  };

export default TabLayout