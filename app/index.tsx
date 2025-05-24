import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 bg-gradient-to-b from-blue-50 to-white p-6">
      <View className="flex-1 items-center justify-center">
        <View className="items-center mb-4">
          <Text className="text-6xl font-extrabold text-blue-600">
            SafeKeys
          </Text>
          <Text className="text-lg text-blue-400 font-medium">
            Votre coffre-fort numérique
          </Text>
        </View>

        <View className="max-w-md mb-5">
          <Text className="text-center text-gray-600 leading-relaxed">
            Bienvenue dans SafeKeys — la sécurité accessible à tous. Ici, pas
            besoin d&apos;être un expert pour protéger vos données personnelles.
            SafeKeys a été conçu pour guider pas à pas tous les utilisateurs,
            même les moins familiers avec la technologie, vers une gestion
            simple, claire et sécurisée de leurs identifiants.
          </Text>
        </View>

        <View className="flex justify-center items-center gap-3">
          <Link
            href="/vault/vault"
            className="bg-blue-600 px-8 py-3 rounded-full shadow-lg active:bg-blue-700"
          >
            <Text className="text-white font-semibold text-lg">
              Accéder au coffre-fort
            </Text>
          </Link>
          <Link href="/designSystemScreen">
            <Text className="text-blue-600 font-semibold text-lg">
              Design System
            </Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
