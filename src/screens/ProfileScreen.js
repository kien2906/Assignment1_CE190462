import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen({ profile, navigation }) {
  const initial = profile.name.trim().charAt(0).toUpperCase();
  const details = [
    { label: "Email", value: profile.email },
    { label: "Địa điểm", value: profile.location },
    { label: "Nghề nghiệp", value: profile.occupation },
    { label: "Mã sinh viên", value: profile.studentId },
  ];

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.pageTitle}>Hồ sơ cá nhân</Text>
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          {profile.avatar ? (
            <Image source={{ uri: profile.avatar }} style={styles.avatarImage} />
          ) : (
            <Text style={styles.avatarInitials}>{initial}</Text>
          )}
        </View>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.bio}>
          {profile.bio || "Chưa có bio. Hãy thêm vài dòng giới thiệu về bạn."}
        </Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("EditProfile")}
          accessibilityRole="button"
          accessibilityLabel="Chỉnh sửa hồ sơ"
        >
          <Text style={styles.editButtonText}>Chỉnh sửa hồ sơ</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.detailsCard}>
        <Text style={styles.detailsTitle}>Thông tin cá nhân</Text>
        {details.map(({ label, value }) => (
          <View key={label} style={styles.detailRow}>
            <Text style={styles.detailLabel}>{label}</Text>
            <Text style={styles.detailValue}>{value || "Chưa cập nhật"}</Text>
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
