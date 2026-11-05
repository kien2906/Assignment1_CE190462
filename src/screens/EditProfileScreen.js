import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
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
import {
  getScaledFontSize,
  useSettings,
} from "../Context/SettingsContext";

export default function EditProfileScreen({ profile, navigation, onSave }) {
  const { theme, fontSize } = useSettings();
  const colors = {
    background: theme ? "#111827" : "#F8FAFC",
    input: theme ? "#1F2937" : "#FFFFFF",
    muted: theme ? "#D1D5DB" : "#64748B",
    text: theme ? "#F9FAFB" : "#0F172A",
    border: theme ? "#4B5563" : "#CBD5E1",
  };
  const scaledFontSize = (size) => getScaledFontSize(fontSize, size);
  const [draft, setDraft] = useState({ ...profile });
  const [saving, setSaving] = useState(false);
  const [pickingImage, setPickingImage] = useState(false);
  const initial = draft.name.trim().charAt(0).toUpperCase() || "?";

  const pickImage = async () => {
    setPickingImage(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setDraft((currentDraft) => ({
          ...currentDraft,
          avatar: result.assets[0].uri,
        }));
      }
    } catch (error) {
      console.error("Failed to pick a profile photo.", error);
      Alert.alert(
        "Không thể chọn ảnh",
        "Đã xảy ra lỗi khi mở thư viện ảnh. Vui lòng thử lại.",
      );
    } finally {
      setPickingImage(false);
    }
  };

  const saveProfile = async () => {
    const name = draft.name.trim();
    if (!name) {
      Alert.alert("Thiếu tên", "Vui lòng nhập tên của bạn.");
      return;
    }

    setSaving(true);
    try {
      await onSave({
        ...draft,
        name,
        bio: draft.bio.trim(),
        email: draft.email.trim(),
        location: draft.location.trim(),
        occupation: draft.occupation.trim(),
        avatar: draft.avatar.trim(),
      });
      navigation.goBack();
    } catch (error) {
      console.error("Failed to save the profile.", error);
      Alert.alert(
        "Không thể lưu hồ sơ",
        "Đã xảy ra lỗi khi lưu. Vui lòng thử lại.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={[styles.pageTitle, { color: colors.text, fontSize: scaledFontSize(24) }]}>
        Chỉnh sửa hồ sơ
      </Text>

      <View style={styles.avatarPreview}>
        {draft.avatar ? (
          <Image source={{ uri: draft.avatar }} style={styles.avatarImage} />
        ) : (
          <Text style={[styles.avatarInitials, { fontSize: scaledFontSize(40) }]}>{initial}</Text>
        )}
      </View>

      <TouchableOpacity
        style={[
          styles.pickImageButton,
          { backgroundColor: colors.input, borderColor: colors.border },
          pickingImage && styles.disabledButton,
        ]}
        onPress={pickImage}
        disabled={pickingImage}
        accessibilityRole="button"
        accessibilityLabel="Chọn ảnh đại diện từ thư viện ảnh"
      >
        <Text style={styles.pickImageIcon}>+</Text>
        <Text
          style={[
            styles.pickImageText,
            { color: colors.text, fontSize: scaledFontSize(15) },
          ]}
        >
          {pickingImage ? "Đang mở thư viện ảnh..." : "Thêm ảnh từ thư viện"}
        </Text>
      </TouchableOpacity>

      <Text style={[styles.label, { color: colors.text, fontSize: scaledFontSize(14) }]}>Đường dẫn ảnh đại diện</Text>
      <TextInput
        value={draft.avatar}
        onChangeText={(avatar) => setDraft({ ...draft, avatar })}
        style={[styles.input, { backgroundColor: colors.input, borderColor: colors.border, color: colors.text, fontSize: scaledFontSize(16) }]}
        placeholder="https://example.com/avatar.jpg"
        placeholderTextColor={colors.muted}
        autoCapitalize="none"
        keyboardType="url"
      />

      <Text style={[styles.label, { color: colors.text, fontSize: scaledFontSize(14) }]}>Tên</Text>
      <TextInput
        value={draft.name}
        onChangeText={(name) => setDraft({ ...draft, name })}
        style={[styles.input, { backgroundColor: colors.input, borderColor: colors.border, color: colors.text, fontSize: scaledFontSize(16) }]}
        placeholder="Nhập tên của bạn"
        placeholderTextColor={colors.muted}
        maxLength={60}
      />

      <Text style={[styles.label, { color: colors.text, fontSize: scaledFontSize(14) }]}>Bio</Text>
      <TextInput
        value={draft.bio}
        onChangeText={(bio) => setDraft({ ...draft, bio })}
        style={[styles.input, styles.bioInput, { backgroundColor: colors.input, borderColor: colors.border, color: colors.text, fontSize: scaledFontSize(16) }]}
        placeholder="Giới thiệu ngắn về bạn"
        placeholderTextColor={colors.muted}
        multiline
        maxLength={160}
      />

      <Text style={[styles.label, { color: colors.text, fontSize: scaledFontSize(14) }]}>Email</Text>
      <TextInput
        value={draft.email}
        onChangeText={(email) => setDraft({ ...draft, email })}
        style={[styles.input, { backgroundColor: colors.input, borderColor: colors.border, color: colors.text, fontSize: scaledFontSize(16) }]}
        placeholder="Nhập email của bạn"
        placeholderTextColor={colors.muted}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Text style={[styles.label, { color: colors.text, fontSize: scaledFontSize(14) }]}>Địa điểm</Text>
      <TextInput
        value={draft.location}
        onChangeText={(location) => setDraft({ ...draft, location })}
        style={[styles.input, { backgroundColor: colors.input, borderColor: colors.border, color: colors.text, fontSize: scaledFontSize(16) }]}
        placeholder="Nhập địa điểm của bạn"
        placeholderTextColor={colors.muted}
      />

      <Text style={[styles.label, { color: colors.text, fontSize: scaledFontSize(14) }]}>Nghề nghiệp</Text>
      <TextInput
        value={draft.occupation}
        onChangeText={(occupation) => setDraft({ ...draft, occupation })}
        style={[styles.input, { backgroundColor: colors.input, borderColor: colors.border, color: colors.text, fontSize: scaledFontSize(16) }]}
        placeholder="Nhập nghề nghiệp của bạn"
        placeholderTextColor={colors.muted}
      />

      <Text style={[styles.label, { color: colors.text, fontSize: scaledFontSize(14) }]}>Mã sinh viên</Text>
      <View style={[styles.readOnlyInput, { backgroundColor: theme ? "#374151" : "#F8FAFC", borderColor: colors.border }]}>
        <Text style={[styles.readOnlyText, { color: colors.muted, fontSize: scaledFontSize(16) }]}>
          {draft.studentId || "Chưa cập nhật"}
        </Text>
        <Text style={[styles.readOnlyHint, { color: colors.muted, fontSize: scaledFontSize(12) }]}>Không thể chỉnh sửa</Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.cancelButton,
            { backgroundColor: colors.input, borderColor: colors.border },
          ]}
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
        >
          <Text style={[styles.cancelButtonText, { color: colors.text, fontSize: scaledFontSize(16) }]}>Hủy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.saveButton, saving && styles.disabledButton]}
          onPress={saveProfile}
          disabled={saving}
          accessibilityRole="button"
        >
          <Text style={[styles.saveButtonText, { fontSize: scaledFontSize(16) }]}>
            {saving ? "Đang lưu..." : "Lưu thay đổi"}
          </Text>
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
  pickImageButton: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  pickImageIcon: {
    marginRight: 9,
    color: "#2563EB",
    fontWeight: "700",
  },
  pickImageText: {
    fontWeight: "600",
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
  readOnlyInput: {
    minHeight: 50,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
  },
  readOnlyText: {
    color: "#475569",
    fontSize: 16,
  },
  readOnlyHint: {
    color: "#94A3B8",
    fontSize: 12,
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
  disabledButton: {
    opacity: 0.6,
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
