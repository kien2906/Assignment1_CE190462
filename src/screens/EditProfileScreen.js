import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function EditProfileScreen({ profile, navigation, onSave }) {
  const [draft, setDraft] = useState({ ...profile });
  const initial = draft.name.trim().charAt(0).toUpperCase() || "?";

  const saveProfile = () => {
    const name = draft.name.trim();
    if (!name) {
      Alert.alert("Thiếu tên", "Vui lòng nhập tên của bạn.");
      return;
    }

    onSave({ ...draft, name, bio: draft.bio.trim(), avatar: draft.avatar.trim() });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.pageTitle}>Chỉnh sửa hồ sơ</Text>

      <View style={styles.avatarPreview}>
        {draft.avatar ? (
          <Image source={{ uri: draft.avatar }} style={styles.avatarImage} />
        ) : (
          <Text style={styles.avatarInitials}>{initial}</Text>
        )}
      </View>

      <Text style={styles.label}>Đường dẫn ảnh đại diện</Text>
      <TextInput
        value={draft.avatar}
        onChangeText={(avatar) => setDraft({ ...draft, avatar })}
        style={styles.input}
        placeholder="https://example.com/avatar.jpg"
        placeholderTextColor="#94A3B8"
        autoCapitalize="none"
        keyboardType="url"
      />

      <Text style={styles.label}>Tên</Text>
      <TextInput
        value={draft.name}
        onChangeText={(name) => setDraft({ ...draft, name })}
        style={styles.input}
        placeholder="Nhập tên của bạn"
        placeholderTextColor="#94A3B8"
        maxLength={60}
      />

      <Text style={styles.label}>Bio</Text>
      <TextInput
        value={draft.bio}
        onChangeText={(bio) => setDraft({ ...draft, bio })}
        style={[styles.input, styles.bioInput]}
        placeholder="Giới thiệu ngắn về bạn"
        placeholderTextColor="#94A3B8"
        multiline
        maxLength={160}
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
        >
          <Text style={styles.cancelButtonText}>Hủy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.saveButton]}
          onPress={saveProfile}
          accessibilityRole="button"
        >
          <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
        </TouchableOpacity>
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
  avatarPreview: {
    width: 96,
    height: 96,
    marginBottom: 24,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 48,
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
  label: {
    marginBottom: 8,
    color: "#334155",
    fontSize: 14,
    fontWeight: "600",
  },
  input: {
    minHeight: 50,
    marginBottom: 20,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    color: "#0F172A",
    fontSize: 16,
  },
  bioInput: {
    minHeight: 112,
    paddingTop: 14,
    textAlignVertical: "top",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  button: {
    flex: 1,
    minHeight: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
  },
  saveButton: {
    backgroundColor: "#2563EB",
  },
  cancelButtonText: {
    color: "#334155",
    fontSize: 16,
    fontWeight: "600",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
