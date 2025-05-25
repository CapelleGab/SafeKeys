import { Link, router } from "expo-router";
import { Pressable, StatusBar, Text, View } from "react-native";

export default function Home() {
  return (
    <View className="flex-1 p-10 bg-gradient-to-b from-blue-50 to-white">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
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
          <Pressable
            onPress={() => router.replace("/(tabs)/passwords")}
            className="flex items-center justify-center w-full px-8 py-3 bg-blue-600 rounded-full shadow-lg"
            style={({ pressed }) => [
              { minHeight: 48 },
              pressed
                ? {
                    backgroundColor: "#1e40af",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.1,
                    elevation: 2,
                  }
                : {
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    elevation: 8,
                  },
            ]}
          >
            <Text
              className="text-lg font-semibold text-white"
              selectable={false}
            >
              Accéder au coffre-fort
            </Text>
          </Pressable>
          <Link href="/designSystemScreen" asChild>
            <Pressable
              className="flex items-center justify-center w-full px-8 py-3 border border-blue-600 rounded-full"
              style={({ pressed }) => [
                { minHeight: 48 },
                pressed
                  ? {
                      backgroundColor: "#dbeafe",
                      borderColor: "#1e40af",
                      borderWidth: 2,
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.1,
                      elevation: 2,
                    }
                  : {
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.1,
                      elevation: 3,
                    },
              ]}
            >
              <Text
                className="text-lg font-semibold text-blue-600"
                selectable={false}
              >
                Design System
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}
