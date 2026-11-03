import AsyncStorage from "@react-native-async-storage/async-storage";

const PROFILE_STORAGE_KEY = "@assignment1_ce190462/profile";

export async function loadProfile(fallbackProfile) {
  const savedProfile = await AsyncStorage.getItem(PROFILE_STORAGE_KEY);

  if (savedProfile === null) {
    return fallbackProfile;
  }

  const parsedProfile = JSON.parse(savedProfile);
  if (
    typeof parsedProfile !== "object" ||
    parsedProfile === null ||
    Array.isArray(parsedProfile)
  ) {
    throw new Error("Saved profile data is invalid.");
  }

  const profile = { ...fallbackProfile };
  Object.keys(fallbackProfile).forEach((key) => {
    if (typeof parsedProfile[key] === "string") {
      profile[key] = parsedProfile[key];
    }
  });

  return profile;
}

export async function saveProfile(profile) {
  await AsyncStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
}
