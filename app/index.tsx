import { router } from "expo-router";
import { Lock } from "lucide-react-native";
import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export default function Index() {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  useEffect(() => {
    // Animation d'entrée
    opacity.value = withTiming(1, { duration: 800 });
    scale.value = withSequence(
      withTiming(1.1, { duration: 400 }),
      withTiming(1, { duration: 400 })
    );

    // Navigation vers la page home après 2.5 secondes
    const timer = setTimeout(() => {
      router.replace("/home");
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <View className="items-center justify-center flex-1 bg-gradient-to-b from-blue-600 to-blue-800">
      <Animated.View style={[animatedStyle]} className="items-center">
        <Lock size={100} color="black" />
        <Text className="mt-10 mb-2 text-5xl font-extrabold text-primary">
          SafeKeys
        </Text>
        <Text className="text-lg font-medium text-secondary">
          Votre coffre-fort numérique
        </Text>
      </Animated.View>

      <View className="absolute bottom-20">
        <Text className="text-sm text-secondary">Chargement...</Text>
      </View>
    </View>
  );
}
