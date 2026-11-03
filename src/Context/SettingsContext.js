import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";

const THEME_KEY = "@assignment1_ce190462/theme";
const FONT_SIZE_KEY = "@assignment1_ce190462/font-size";

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [theme, setTheme] = useState(false);
  const [fontSize, setFontSize] = useState("Medium");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;

    Promise.all([
      AsyncStorage.getItem(THEME_KEY),
      AsyncStorage.getItem(FONT_SIZE_KEY),
    ])
      .then(([savedTheme, savedFontSize]) => {
        if (!active) {
          return;
        }

        if (savedTheme !== null) {
          setTheme(savedTheme === "true");
        }
        if (["Small", "Medium", "Large"].includes(savedFontSize)) {
          setFontSize(savedFontSize);
        }
      })
      .catch((error) => {
        console.error("Failed to load app settings.", error);
        Alert.alert(
          "Không thể tải cài đặt",
          "Ứng dụng sẽ dùng giao diện mặc định.",
        );
      })
      .finally(() => {
        if (active) {
          setReady(true);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const handleTheme = async (enabled) => {
    try {
      await AsyncStorage.setItem(THEME_KEY, String(enabled));
      setTheme(enabled);
    } catch (error) {
      console.error("Failed to save the theme setting.", error);
      Alert.alert("Không thể lưu cài đặt", "Không thể lưu chế độ giao diện.");
    }
  };

  const changeFontSize = async (size) => {
    if (!["Small", "Medium", "Large"].includes(size)) {
      return;
    }

    try {
      await AsyncStorage.setItem(FONT_SIZE_KEY, size);
      setFontSize(size);
    } catch (error) {
      console.error("Failed to save the font-size setting.", error);
      Alert.alert("Không thể lưu cài đặt", "Không thể lưu cỡ chữ.");
    }
  };

  if (!ready) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Đang tải cài đặt...</Text>
      </View>
    );
  }

  return (
    <SettingsContext.Provider
      value={{ theme, handleTheme, fontSize, changeFontSize }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const settings = useContext(SettingsContext);
  if (settings === null) {
    throw new Error("useSettings must be used within SettingsProvider.");
  }
  return settings;
}

export function getScaledFontSize(fontSize, baseSize) {
  const scale = fontSize === "Small" ? 0.875 : fontSize === "Large" ? 1.125 : 1;
  return Math.round(baseSize * scale);
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
