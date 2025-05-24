import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 p-10 bg-gradient-to-b from-blue-50 to-white">
      <View className="items-center justify-center flex-1">
        <View className="items-center mb-4">
          <Text className="text-6xl font-extrabold text-blue-600">
            SafeKeys
          </Text>
          <Text className="text-lg font-medium text-blue-400">
            Votre coffre-fort numérique
          </Text>
        </View>

        <View className="max-w-md mb-5">
          <Text className="leading-relaxed text-center text-gray-600">
            Bienvenue dans SafeKeys — la sécurité accessible à tous. Ici, pas
            besoin d&apos;être un expert pour protéger vos données personnelles.
            SafeKeys a été conçu pour guider pas à pas tous les utilisateurs,
            même les moins familiers avec la technologie, vers une gestion
            simple, claire et sécurisée de leurs identifiants.
          </Text>
        </View>

        <View className="flex items-center justify-center gap-3">
          <Link
            href="/passwords"
            className="px-8 py-3 bg-blue-600 rounded-full shadow-lg active:bg-blue-700"
          >
            <Text className="text-lg font-semibold text-white">
              Accéder au coffre-fort
            </Text>
          </Link>
          <Link href="/designSystemScreen">
            <Text className="text-lg font-semibold text-blue-600">
              Design System
            </Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
