import { useSettings, getScaledFontSize } from "../Context/SettingsContext";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const fontOptions = ["Small", "Medium", "Large"];

export default function SettingsScreen() {
  const { theme, handleTheme, fontSize, changeFontSize } = useSettings();
  const colors = {
    background: theme ? "#111827" : "#F3F4F6",
    card: theme ? "#1F2937" : "#FFFFFF",
    text: theme ? "#F9FAFB" : "#111827",
    muted: theme ? "#D1D5DB" : "#6B7280",
    divider: theme ? "#374151" : "#E5E7EB",
  };
  const scaledFontSize = (size) => getScaledFontSize(fontSize, size);

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Text
        style={[
          styles.headerTitle,
          { color: colors.text, fontSize: scaledFontSize(28) },
        ]}
      >
        Cài đặt
      </Text>

      <Text
        style={[
          styles.sectionTitle,
          { color: colors.muted, fontSize: scaledFontSize(13) },
        ]}
      >
        GIAO DIỆN
      </Text>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <View style={[styles.darkModeRow, { borderBottomColor: colors.divider }]}>
          <View style={styles.settingLabel}>
            <Text style={styles.settingIcon}>☾</Text>
            <Text
              style={[
                styles.settingText,
                { color: colors.text, fontSize: scaledFontSize(16) },
              ]}
            >
              Chế độ tối
            </Text>
          </View>
          <Switch
            value={theme}
            onValueChange={handleTheme}
            trackColor={{ false: "#D1D5DB", true: "#93C5FD" }}
            thumbColor={theme ? "#2563EB" : "#F9FAFB"}
            accessibilityLabel="Bật hoặc tắt chế độ tối"
          />
        </View>

        <View style={styles.fontSection}>
          <Text
            style={[
              styles.settingText,
              { color: colors.text, fontSize: scaledFontSize(16) },
            ]}
          >
            Cỡ chữ
          </Text>
          <View style={styles.fontButtons}>
            {fontOptions.map((option) => {
              const selected = fontSize === option;
              return (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.fontButton,
                    { borderColor: selected ? "#2563EB" : colors.divider },
                    selected && styles.selectedFontButton,
                  ]}
                  onPress={() => changeFontSize(option)}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                >
                  <Text
                    style={[
                      styles.fontButtonText,
                      {
                        color: selected ? "#FFFFFF" : colors.text,
                        fontSize: scaledFontSize(14),
                      },
                    ]}
                  >
                    {option === "Small"
                      ? "Nhỏ"
                      : option === "Large"
                        ? "Lớn"
                        : "Vừa"}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text
            style={[
              styles.sampleText,
              { color: colors.muted, fontSize: scaledFontSize(15) },
            ]}
          >
            Đây là ví dụ về cỡ chữ đang chọn.
          </Text>
        </View>
      </View>

      <Text
        style={[
          styles.sectionTitle,
          { color: colors.muted, fontSize: scaledFontSize(13) },
        ]}
      >
        THÔNG TIN ỨNG DỤNG
      </Text>
      <View style={[styles.card, styles.aboutCard, { backgroundColor: colors.card }]}>
        <Text
          style={[
            styles.settingText,
            { color: colors.text, fontSize: scaledFontSize(16) },
          ]}
        >
          Ứng dụng
        </Text>
        <Text
          style={[
            styles.versionText,
            { color: colors.muted, fontSize: scaledFontSize(14) },
          ]}
        >
          Assignment 1 · Phiên bản 1.0.0
        </Text>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() =>
          Alert.alert("Thông báo", "Chức năng đăng xuất chưa được thiết lập.")
        }
        accessibilityRole="button"
      >
        <Text
          style={[
            styles.logoutButtonText,
            { fontSize: scaledFontSize(16) },
          ]}
        >
          Đăng xuất
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  headerTitle: {
    marginBottom: 28,
    fontWeight: "700",
  },
  sectionTitle: {
    marginBottom: 10,
    fontWeight: "600",
  },
  card: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
  },
  darkModeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  settingLabel: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingIcon: {
    width: 24,
    color: "#2563EB",
    fontSize: 22,
  },
  settingText: {
    marginLeft: 10,
    fontWeight: "500",
  },
  fontSection: {
    paddingTop: 14,
  },
  fontButtons: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  fontButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
  selectedFontButton: {
    backgroundColor: "#2563EB",
  },
  fontButtonText: {
    fontWeight: "600",
  },
  sampleText: {
    marginTop: 16,
  },
  aboutCard: {
    marginBottom: 32,
  },
  versionText: {
    marginTop: 6,
  },
  logoutButton: {
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: "#2563EB",
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
