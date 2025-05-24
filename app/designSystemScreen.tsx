import { ScrollView, Text, View } from "react-native";

const colors = [
  { name: "Primary", className: "bg-primary", text: "#4F46E5" },
  { name: "Primary Light", className: "bg-primary-light", text: "#6366F1" },
  { name: "Primary Dark", className: "bg-primary-dark", text: "#3730A3" },
  { name: "Background", className: "bg-background", text: "#F9FAFB" },
  { name: "Surface", className: "bg-surface", text: "#FFFFFF", border: true },
  { name: "Text", className: "bg-text", text: "#111827", textLight: true },
  {
    name: "Text Secondary",
    className: "bg-text-secondary",
    text: "#6B7280",
    textLight: true,
  },
  { name: "Border", className: "bg-border", text: "#E5E7EB" },
  { name: "Success", className: "bg-success", text: "#10B981" },
  { name: "Warning", className: "bg-warning", text: "#FBBF24" },
  { name: "Danger", className: "bg-danger", text: "#EF4444" },
  {
    name: "Danger Dark",
    className: "bg-danger-dark",
    text: "#B91C1C",
    textLight: true,
  },
];

export default function DesignSystemScreen() {
  return (
    <ScrollView className="bg-background px-4 py-6">
      <Text className="text-2xl font-bold text-text mb-6">
        🎨 Design System — SafeKeys
      </Text>
      {colors.map((color, i) => (
        <View
          key={i}
          className={`mb-4 rounded-lg p-4 ${color.className} ${
            color.border ? "border border-border" : ""
          }`}
        >
          <Text
            className={`text-lg font-semibold ${
              color.textLight ? "text-white" : "text-black"
            }`}
          >
            {color.name} – {color.text}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}
