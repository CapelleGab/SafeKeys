import { Text, View } from "react-native";

interface TabsButtonProps {
  icon: React.ReactNode;
  label: string;
  focused: boolean;
  onPress?: () => void;
}

const TabsButton = ({ icon, label, focused, onPress }: TabsButtonProps) => {
  return (
    <View className="items-center justify-center min-w-[80px] px-2">
      <View className="mb-1">{icon}</View>
      <Text
        className={`text-xs font-medium text-center ${
          focused ? "text-blue-600" : "text-gray-500"
        }`}
        numberOfLines={1}
        adjustsFontSizeToFit={true}
        minimumFontScale={0.8}
      >
        {label}
      </Text>
    </View>
  );
};

export default TabsButton;
