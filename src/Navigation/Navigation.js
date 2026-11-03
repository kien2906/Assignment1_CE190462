import { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import EditProfileScreen from "../screens/EditProfileScreen";
import ProfileScreen from "../screens/ProfileScreen";

const initialProfile = {
  name: "Kien Trinh",
  bio: "Frontend Developer",
  avatar: "",
};

export default function Navigation() {
  const [profile, setProfile] = useState(initialProfile);
  const [currentScreen, setCurrentScreen] = useState("Profile");

  const navigation = {
    navigate: (screen) => setCurrentScreen(screen),
    goBack: () => setCurrentScreen("Profile"),
  };

  const saveProfile = (updatedProfile) => {
    setProfile(updatedProfile);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      {currentScreen === "EditProfile" ? (
        <EditProfileScreen
          profile={profile}
          navigation={navigation}
          onSave={saveProfile}
        />
      ) : (
        <ProfileScreen profile={profile} navigation={navigation} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },
});
