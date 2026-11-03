import { useMemo, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const initialInterests = [
  {
    id: "coding",
    name: "Lập trình",
    category: "Công nghệ",
    description: "Tìm hiểu công nghệ và xây dựng ứng dụng mới.",
    icon: "</>",
    favorite: true,
  },
  {
    id: "badminton",
    name: "Cầu lông",
    category: "Thể thao",
    description: "Rèn luyện sức khỏe và chơi cùng bạn bè.",
    icon: "🏸",
    favorite: false,
  },
  {
    id: "ui-design",
    name: "Thiết kế UI/UX",
    category: "Sáng tạo",
    description: "Thiết kế giao diện dễ dùng và đẹp mắt.",
    icon: "✎",
    favorite: false,
  },
  {
    id: "reading",
    name: "Đọc sách",
    category: "Giải trí",
    description: "Khám phá kiến thức và những câu chuyện mới.",
    icon: "▤",
    favorite: false,
  },
  {
    id: "photography",
    name: "Chụp ảnh",
    category: "Sáng tạo",
    description: "Ghi lại khoảnh khắc qua ống kính.",
    icon: "◎",
    favorite: false,
  },
  {
    id: "music",
    name: "Âm nhạc",
    category: "Giải trí",
    description: "Thư giãn và khám phá những giai điệu yêu thích.",
    icon: "♫",
    favorite: false,
  },
];

function normalizeText(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
}

export default function InterestsScreen() {
  const [interests, setInterests] = useState(initialInterests);
  const [searchText, setSearchText] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const categories = useMemo(
    () => [...new Set(interests.map((interest) => interest.category))],
    [interests],
  );
  const visibleInterests = useMemo(() => {
    const query = normalizeText(searchText.trim());

    return interests.filter((interest) => {
      const matchesFilter =
        activeFilter === "all" ||
        (activeFilter === "favorites"
          ? interest.favorite
          : interest.category === activeFilter.slice("category:".length));
      const searchableText = normalizeText(
        `${interest.name} ${interest.category} ${interest.description}`,
      );

      return matchesFilter && searchableText.includes(query);
    });
  }, [activeFilter, interests, searchText]);
  const favoriteCount = interests.filter((interest) => interest.favorite).length;

  const toggleFavorite = (id) => {
    setInterests((current) =>
      current.map((interest) =>
        interest.id === id
          ? { ...interest, favorite: !interest.favorite }
          : interest,
      ),
    );
  };

  const addInterest = () => {
    const name = newName.trim();
    const category = newCategory.trim();

    if (!name || !category) {
      Alert.alert("Thiếu thông tin", "Vui lòng nhập tên và danh mục sở thích.");
      return;
    }

    setInterests((current) => [
      ...current,
      {
        id: `interest-${Date.now()}`,
        name,
        category,
        description: `Sở thích thuộc danh mục ${category}.`,
        icon: "✦",
        favorite: false,
      },
    ]);
    setNewName("");
    setNewCategory("");
    setShowForm(false);
    setActiveFilter("all");
    setSearchText("");
  };

  const filters = [
    { id: "all", label: "Tất cả" },
    { id: "favorites", label: `Yêu thích (${favoriteCount})` },
    ...categories.map((category) => ({
      id: `category:${category}`,
      label: category,
    })),
  ];

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.titleRow}>
        <View style={styles.titleContent}>
          <Text style={styles.pageTitle}>Sở thích của tôi</Text>
          <Text style={styles.subtitle}>
            {interests.length} sở thích · {favoriteCount} yêu thích
          </Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowForm((visible) => !visible)}
          accessibilityRole="button"
          accessibilityLabel={showForm ? "Đóng biểu mẫu" : "Thêm sở thích"}
        >
          <Text style={styles.addButtonText}>{showForm ? "×" : "+"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
          placeholder="Tìm sở thích..."
          placeholderTextColor="#94A3B8"
          returnKeyType="search"
          accessibilityLabel="Tìm kiếm sở thích"
        />
        {searchText.length > 0 && (
          <TouchableOpacity
            onPress={() => setSearchText("")}
            accessibilityRole="button"
            accessibilityLabel="Xóa nội dung tìm kiếm"
          >
            <Text style={styles.clearSearch}>×</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterList}
      >
        {filters.map((filter) => {
          const selected = activeFilter === filter.id;

          return (
            <TouchableOpacity
              key={filter.id}
              style={[styles.filterButton, selected && styles.activeFilterButton]}
              onPress={() => setActiveFilter(filter.id)}
              accessibilityRole="button"
              accessibilityState={{ selected }}
            >
              <Text
                style={[styles.filterText, selected && styles.activeFilterText]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {showForm && (
        <View style={styles.form}>
          <Text style={styles.formTitle}>Thêm sở thích mới</Text>
          <TextInput
            value={newName}
            onChangeText={setNewName}
            style={styles.input}
            placeholder="Tên sở thích"
            placeholderTextColor="#94A3B8"
            maxLength={60}
            returnKeyType="next"
          />
          <TextInput
            value={newCategory}
            onChangeText={setNewCategory}
            style={styles.input}
            placeholder="Danh mục (ví dụ: Thể thao)"
            placeholderTextColor="#94A3B8"
            maxLength={40}
            onSubmitEditing={addInterest}
            returnKeyType="done"
          />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={addInterest}
            accessibilityRole="button"
          >
            <Text style={styles.saveButtonText}>Thêm sở thích</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsTitle}>Danh sách sở thích</Text>
        <Text style={styles.resultsCount}>{visibleInterests.length} mục</Text>
      </View>

      {visibleInterests.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Không tìm thấy sở thích</Text>
          <Text style={styles.emptyText}>
            Thử từ khóa khác hoặc chọn một bộ lọc khác.
          </Text>
        </View>
      ) : (
        visibleInterests.map((interest) => (
          <View key={interest.id} style={styles.interestCard}>
            <View style={styles.cardTopRow}>
              <View style={styles.interestIconBox}>
                <Text style={styles.interestIcon}>{interest.icon}</Text>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.interestName}>{interest.name}</Text>
                <Text style={styles.categoryBadge}>{interest.category}</Text>
                <Text style={styles.description}>{interest.description}</Text>
              </View>
              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => toggleFavorite(interest.id)}
                accessibilityRole="button"
                accessibilityLabel={
                  interest.favorite
                    ? `Bỏ yêu thích ${interest.name}`
                    : `Thêm ${interest.name} vào yêu thích`
                }
                accessibilityState={{ selected: interest.favorite }}
              >
                <Text
                  style={[
                    styles.favoriteIcon,
                    interest.favorite && styles.favoriteIconActive,
                  ]}
                >
                  {interest.favorite ? "★" : "☆"}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.cardFooter}>
              <Text
                style={[
                  styles.favoriteStatus,
                  interest.favorite && styles.favoriteStatusActive,
                ]}
              >
                {interest.favorite ? "♥ Đã yêu thích" : "♡ Chưa yêu thích"}
              </Text>
              <Text style={styles.categoryFooter}>{interest.category}</Text>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  content: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 32,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  titleContent: {
    flex: 1,
    marginRight: 12,
  },
  pageTitle: {
    color: "#0F172A",
    fontSize: 24,
    fontWeight: "700",
  },
  subtitle: {
    marginTop: 5,
    color: "#64748B",
    fontSize: 14,
  },
  addButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 22,
    backgroundColor: "#DBEAFE",
  },
  addButtonText: {
    color: "#2563EB",
    fontSize: 30,
    lineHeight: 34,
    fontWeight: "500",
  },
  searchBar: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
  },
  searchIcon: {
    color: "#64748B",
    fontSize: 25,
    lineHeight: 30,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    paddingVertical: 10,
    color: "#0F172A",
    fontSize: 15,
  },
  clearSearch: {
    paddingHorizontal: 4,
    color: "#64748B",
    fontSize: 23,
  },
  filterScroll: {
    height: 42,
    flexGrow: 0,
    flexShrink: 0,
  },
  filterList: {
    height: 42,
    alignItems: "center",
    gap: 8,
  },
  filterButton: {
    height: 38,
    minWidth: 82,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
    paddingVertical: 0,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
  },
  activeFilterButton: {
    borderColor: "#2563EB",
    backgroundColor: "#2563EB",
  },
  filterText: {
    color: "#475569",
    fontSize: 13,
    fontWeight: "600",
  },
  activeFilterText: {
    color: "#FFFFFF",
  },
  form: {
    marginBottom: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
  },
  formTitle: {
    marginBottom: 14,
    color: "#0F172A",
    fontSize: 17,
    fontWeight: "700",
  },
  input: {
    minHeight: 48,
    marginBottom: 12,
    paddingHorizontal: 13,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    color: "#0F172A",
    fontSize: 15,
  },
  saveButton: {
    minHeight: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#2563EB",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  resultsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  resultsTitle: {
    color: "#0F172A",
    fontSize: 18,
    fontWeight: "700",
  },
  resultsCount: {
    color: "#64748B",
    fontSize: 13,
  },
  interestCard: {
    marginBottom: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    elevation: 1,
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  interestIconBox: {
    width: 46,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "#EFF6FF",
  },
  interestIcon: {
    color: "#2563EB",
    fontSize: 21,
    fontWeight: "700",
  },
  cardContent: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  interestName: {
    color: "#0F172A",
    fontSize: 16,
    fontWeight: "700",
  },
  categoryBadge: {
    alignSelf: "flex-start",
    overflow: "hidden",
    marginTop: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: "#F1F5F9",
    color: "#475569",
    fontSize: 11,
    fontWeight: "600",
  },
  description: {
    marginTop: 7,
    color: "#64748B",
    fontSize: 13,
    lineHeight: 19,
  },
  favoriteButton: {
    minWidth: 36,
    minHeight: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  favoriteIcon: {
    color: "#94A3B8",
    fontSize: 27,
  },
  favoriteIconActive: {
    color: "#F59E0B",
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 13,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },
  favoriteStatus: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "600",
  },
  favoriteStatusActive: {
    color: "#DC2626",
  },
  categoryFooter: {
    color: "#94A3B8",
    fontSize: 12,
  },
  emptyState: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 36,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
  },
  emptyTitle: {
    color: "#0F172A",
    fontSize: 16,
    fontWeight: "700",
  },
  emptyText: {
    marginTop: 8,
    color: "#64748B",
    fontSize: 14,
    textAlign: "center",
  },
});
