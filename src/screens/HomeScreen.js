import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const quickActions = [
  {
    title: "Hồ sơ cá nhân",
    description: "Xem thông tin và liên hệ của bạn",
    icon: "●",
    screen: "Profile",
  },
  {
    title: "Sở thích",
    description: "Quản lý các sở thích của bạn",
    icon: "✦",
    screen: "Interests",
  },
  {
    title: "Cài đặt",
    description: "Tùy chỉnh ứng dụng",
    icon: "⚙",
    screen: "Setting",
  },
];

export default function HomeScreen({ profile, interests = [], navigation }) {
  const navigateTo = (screen) => {
    if (screen === "Setting") {
      navigation.getParent()?.getParent()?.navigate(screen);
      return;
    }

    navigation.getParent()?.navigate(screen);
  };
  const previewInterests = interests.slice(0, 4);
  const initial = profile?.name?.trim()?.charAt(0)?.toUpperCase() || "?";

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>CHÀO MỪNG TRỞ LẠI</Text>
            <Text style={styles.headerName}>{profile?.name || "Bạn"}</Text>
          </View>
          <View style={styles.headerAvatar}>
            {profile?.avatar ? (
              <Image
                source={{ uri: profile.avatar }}
                style={styles.avatarImage}
              />
            ) : (
              <Text style={styles.avatarInitial}>{initial}</Text>
            )}
          </View>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.profileSummary}>
            <View style={styles.profileAvatar}>
              {profile?.avatar ? (
                <Image
                  source={{ uri: profile.avatar }}
                  style={styles.avatarImage}
                />
              ) : (
                <Text style={styles.profileInitial}>{initial}</Text>
              )}
            </View>
            <View style={styles.profileText}>
              <Text style={styles.profileName}>{profile?.name || "Bạn"}</Text>
              <Text style={styles.profileBio}>
                {profile?.bio || "Thêm vài dòng giới thiệu về bạn."}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigateTo("Profile")}
            accessibilityRole="button"
          >
            <Text style={styles.profileButtonText}>Xem hồ sơ</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Sở thích của tôi</Text>
          <TouchableOpacity
            onPress={() => navigateTo("Interests")}
            accessibilityRole="button"
          >
            <Text style={styles.viewAllText}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>

        {previewInterests.length > 0 ? (
          <View style={styles.interestsContainer}>
            {previewInterests.map((interest) => (
              <View key={interest.id} style={styles.interestBadge}>
                <Text style={styles.interestText}>{interest.name}</Text>
              </View>
            ))}
          </View>
        ) : (
          <TouchableOpacity
            style={styles.emptyInterests}
            onPress={() => navigateTo("Interests")}
            accessibilityRole="button"
          >
            <Text style={styles.emptyInterestsText}>
              Thêm sở thích đầu tiên của bạn
            </Text>
          </TouchableOpacity>
        )}

        <Text style={styles.quickActionsTitle}>Truy cập nhanh</Text>
        {quickActions.map((action) => (
          <TouchableOpacity
            key={action.screen}
            style={styles.actionCard}
            onPress={() => navigateTo(action.screen)}
            accessibilityRole="button"
          >
            <View style={styles.actionIcon}>
              <Text style={styles.actionIconText}>{action.icon}</Text>
            </View>
            <View style={styles.actionText}>
              <Text style={styles.actionTitle}>{action.title}</Text>
              <Text style={styles.actionDescription}>{action.description}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  content: {
    padding: 22,
    paddingTop: 24,
    paddingBottom: 36,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 26,
  },
  greeting: {
    marginBottom: 5,
    color: "#64748B",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.6,
  },
  headerName: {
    color: "#0F172A",
    fontSize: 26,
    fontWeight: "700",
  },
  headerAvatar: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 24,
    backgroundColor: "#DBEAFE",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  avatarInitial: {
    color: "#2563EB",
    fontSize: 21,
    fontWeight: "700",
  },
  profileCard: {
    marginBottom: 28,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  profileSummary: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  profileAvatar: {
    width: 58,
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginRight: 14,
    borderRadius: 29,
    backgroundColor: "#DBEAFE",
  },
  profileInitial: {
    color: "#2563EB",
    fontSize: 25,
    fontWeight: "700",
  },
  profileText: {
    flex: 1,
  },
  profileName: {
    color: "#0F172A",
    fontSize: 19,
    fontWeight: "700",
  },
  profileBio: {
    marginTop: 5,
    color: "#64748B",
    fontSize: 14,
    lineHeight: 20,
  },
  profileButton: {
    alignItems: "center",
    paddingVertical: 13,
    borderRadius: 11,
    backgroundColor: "#EEF2FF",
  },
  profileButtonText: {
    color: "#2563EB",
    fontSize: 15,
    fontWeight: "700",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  sectionTitle: {
    color: "#0F172A",
    fontSize: 17,
    fontWeight: "700",
  },
  viewAllText: {
    color: "#2563EB",
    fontSize: 14,
    fontWeight: "600",
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  interestBadge: {
    marginRight: 9,
    marginBottom: 9,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  interestText: {
    color: "#334155",
    fontSize: 14,
    fontWeight: "600",
  },
  emptyInterests: {
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
  },
  emptyInterestsText: {
    color: "#2563EB",
    fontSize: 14,
    fontWeight: "600",
  },
  quickActionsTitle: {
    marginTop: 18,
    marginBottom: 14,
    color: "#0F172A",
    fontSize: 17,
    fontWeight: "700",
  },
  actionCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    padding: 15,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  actionIcon: {
    width: 46,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
    borderRadius: 14,
    backgroundColor: "#EEF2FF",
  },
  actionIconText: {
    color: "#2563EB",
    fontSize: 22,
    fontWeight: "700",
  },
  actionText: {
    flex: 1,
  },
  actionTitle: {
    color: "#0F172A",
    fontSize: 15,
    fontWeight: "700",
  },
  actionDescription: {
    marginTop: 4,
    color: "#64748B",
    fontSize: 12,
  },
  chevron: {
    marginLeft: 8,
    color: "#64748B",
    fontSize: 25,
  },
});
