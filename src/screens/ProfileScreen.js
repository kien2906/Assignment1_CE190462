import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  getScaledFontSize,
  useSettings,
} from "../Context/SettingsContext";

export default function ProfileScreen({ profile, navigation }) {
  const { theme, fontSize } = useSettings();
  const colors = {
    background: theme ? "#111827" : "#F8FAFC",
    card: theme ? "#1F2937" : "#FFFFFF",
    text: theme ? "#F9FAFB" : "#0F172A",
    muted: theme ? "#D1D5DB" : "#64748B",
    divider: theme ? "#374151" : "#F1F5F9",
  };
  const scaledFontSize = (size) => getScaledFontSize(fontSize, size);
  const initial = profile.name.trim().charAt(0).toUpperCase();
  const details = [
    { label: "Email", value: profile.email },
    { label: "Địa điểm", value: profile.location },
    { label: "Nghề nghiệp", value: profile.occupation },
    { label: "Mã sinh viên", value: profile.studentId },
  ];

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.content}
    >
      <Text
        style={[
          styles.pageTitle,
          { color: colors.text, fontSize: scaledFontSize(24) },
        ]}
      >
        Hồ sơ cá nhân
      </Text>
      <View style={[styles.profileCard, { backgroundColor: colors.card }]}>
        <View style={styles.avatar}>
          {profile.avatar ? (
            <Image source={{ uri: profile.avatar }} style={styles.avatarImage} />
          ) : (
            <Text style={styles.avatarInitials}>{initial}</Text>
          )}
        </View>
        <Text
          style={[
            styles.name,
            { color: colors.text, fontSize: scaledFontSize(24) },
          ]}
        >
          {profile.name}
        </Text>
        <Text
          style={[
            styles.bio,
            { color: colors.muted, fontSize: scaledFontSize(16) },
          ]}
        >
          {profile.bio || "Chưa có bio. Hãy thêm vài dòng giới thiệu về bạn."}
        </Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("EditProfile")}
          accessibilityRole="button"
          accessibilityLabel="Chỉnh sửa hồ sơ"
        >
          <Text
            style={[
              styles.editButtonText,
              { fontSize: scaledFontSize(16) },
            ]}
          >
            Chỉnh sửa hồ sơ
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.detailsCard, { backgroundColor: colors.card }]}>
        <Text
          style={[
            styles.detailsTitle,
            { color: colors.text, fontSize: scaledFontSize(17) },
          ]}
        >
          Thông tin cá nhân
        </Text>
        {details.map(({ label, value }) => (
          <View
            key={label}
            style={[styles.detailRow, { borderTopColor: colors.divider }]}
          >
            <Text
              style={[
                styles.detailLabel,
                { color: colors.muted, fontSize: scaledFontSize(14) },
              ]}
            >
              {label}
            </Text>
            <Text
              style={[
                styles.detailValue,
                { color: colors.text, fontSize: scaledFontSize(14) },
              ]}
            >
              {value || "Chưa cập nhật"}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
  },
  pageTitle: {
    marginBottom: 28,
    color: "#0F172A",
    fontSize: 24,
    fontWeight: "700",
  },
  profileCard: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 36,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
  },
  avatar: {
    width: 112,
    height: 112,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 56,
    backgroundColor: "#DBEAFE",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  avatarInitials: {
    color: "#2563EB",
    fontSize: 40,
    fontWeight: "700",
  },
  name: {
    color: "#0F172A",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  bio: {
    marginTop: 10,
    color: "#64748B",
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
  editButton: {
    width: "100%",
    minHeight: 50,
    marginTop: 28,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: "#2563EB",
  },
  editButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  detailsCard: {
    marginTop: 24,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  detailsTitle: {
    paddingVertical: 14,
    color: "#0F172A",
    fontSize: 17,
    fontWeight: "700",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },
  detailLabel: {
    color: "#64748B",
    fontSize: 14,
  },
  detailValue: {
    flexShrink: 1,
    color: "#0F172A",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "right",
  },
});
