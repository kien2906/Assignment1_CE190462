import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useState } from "react";
import EditProfileScreen from "../screens/EditProfileScreen";
import HomeScreen from "../screens/HomeScreen";
import InterestsScreen from "../screens/InterestsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const initialProfile = {
  name: "Kien Trinh",
  bio: "Frontend Developer",
  email: "KienTTCE190462@gmail.com",
  location: "Cần THơ, Vietnam",
  occupation: "Student",
  studentId: "CE190462",
  avatar: "",
};

function ProfileNavigator({ profile, setProfile }) {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileHome">
        {(screenProps) => (
          <ProfileScreen
            {...screenProps}
            profile={profile}
          />
        )}
      </ProfileStack.Screen>
      <ProfileStack.Screen name="EditProfile">
        {(screenProps) => (
          <EditProfileScreen
            {...screenProps}
            profile={profile}
            onSave={(updatedProfile) => {
              setProfile(updatedProfile);
              screenProps.navigation.goBack();
            }}
          />
        )}
      </ProfileStack.Screen>
    </ProfileStack.Navigator>
  );
}

function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="InterestsScreen" component={InterestsScreen} />
      <Stack.Screen name="Setting" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

function TabBottom({ profile, setProfile }) {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{ tabBarLabel: "Home" }}
      />
      <Tab.Screen
        name="Interests"
        component={InterestsScreen}
        options={{ tabBarLabel: "Interests" }}
      />
      <Tab.Screen
        name="Profile"
        options={{ tabBarLabel: "Profile" }}
      >
        {() => (
          <ProfileNavigator profile={profile} setProfile={setProfile} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function Navigation() {
  const [profile, setProfile] = useState(initialProfile);

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name="Home"
          options={{ headerShown: true, headerTitle: "" }}
        >
          {(screenProps) => (
            <TabBottom
              {...screenProps}
              profile={profile}
              setProfile={setProfile}
            />
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="Setting"
          component={SettingsScreen}
          options={{ headerShown: true, headerTitle: "" }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
