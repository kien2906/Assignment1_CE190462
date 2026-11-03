import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  View,
} from "react-native";
import EditProfileScreen from "../screens/EditProfileScreen";
import HomeScreen from "../screens/HomeScreen";
import InterestsScreen, {
  initialInterests,
} from "../screens/InterestsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import {
  loadProfile,
  saveProfile as persistProfile,
} from "../storage/profileStorage";
import { useSettings } from "../Context/SettingsContext";

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
            onSave={async (updatedProfile) => {
              await persistProfile(updatedProfile);
              setProfile(updatedProfile);
            }}
          />
        )}
      </ProfileStack.Screen>
    </ProfileStack.Navigator>
  );
}

function HomeStackNavigator({ profile, interests }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        options={{ headerShown: false }}
      >
        {(screenProps) => (
          <HomeScreen
            {...screenProps}
            profile={profile}
            interests={interests}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function TabBottom({ profile, setProfile, interests, setInterests }) {
  const { theme } = useSettings();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: theme ? "#1F2937" : "#FFFFFF" },
        tabBarActiveTintColor: theme ? "#FFFFFF" : "#2563EB",
        tabBarInactiveTintColor: theme ? "#9CA3AF" : "#64748B",
      }}
    >
      <Tab.Screen
        name="Home"
        options={{ tabBarLabel: "Home" }}
      >
        {() => <HomeStackNavigator profile={profile} interests={interests} />}
      </Tab.Screen>
      <Tab.Screen name="Interests" options={{ tabBarLabel: "Interests" }}>
        {() => (
          <InterestsScreen
            interests={interests}
            setInterests={setInterests}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <BottomTabIcon name="profile" color={color} />
          ),
        }}
      >
        {() => (
          <ProfileNavigator profile={profile} setProfile={setProfile} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function Navigation() {
  const { theme } = useSettings();
  const [profile, setProfile] = useState(initialProfile);
  const [interests, setInterests] = useState(initialInterests);
  const [profileLoaded, setProfileLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    loadProfile(initialProfile)
      .then((savedProfile) => {
        if (isMounted) {
          setProfile(savedProfile);
        }
      })
      .catch((error) => {
        console.error("Failed to load the saved profile.", error);
        Alert.alert(
          "Không thể tải hồ sơ",
          "Ứng dụng sẽ dùng thông tin hồ sơ mặc định.",
        );
      })
      .finally(() => {
        if (isMounted) {
          setProfileLoaded(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!profileLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Đang tải hồ sơ...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: { backgroundColor: theme ? "#1F2937" : "#FFFFFF" },
          headerStyle: { backgroundColor: theme ? "#1F2937" : "#FFFFFF" },
          headerTintColor: theme ? "#F9FAFB" : "#111827",
          drawerActiveTintColor: theme ? "#FFFFFF" : "#2563EB",
          drawerInactiveTintColor: theme ? "#D1D5DB" : "#374151",
        }}
      >
        <Drawer.Screen
          name="Home"
          options={{ headerShown: true, headerTitle: "" }}
        >
          {(screenProps) => (
            <TabBottom
              {...screenProps}
              profile={profile}
              setProfile={setProfile}
              interests={interests}
              setInterests={setInterests}
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

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8FAFC",
  },
  loadingText: {
    marginTop: 12,
    color: "#64748B",
    fontSize: 14,
  },
});
