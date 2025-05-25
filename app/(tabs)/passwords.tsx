import Password from "@/types/passwordType";
import { router } from "expo-router";
import { Plus } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, ScrollView, StatusBar, Text, View } from "react-native";

const PasswordScreen = () => {
  const [passwords, setPasswords] = useState<Password[]>([]);

  const handleAddPassword = () => {
    router.push("/add-password");
  };

  return (
    <View className="flex-1 bg-gradient-to-b from-blue-50 to-white">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <ScrollView className="flex-1">
        <View className="flex-1 p-6">
          {passwords.length === 0 ? (
            <View className="flex-1">
              {/* Bouton d'ajout en haut quand aucun mot de passe */}
              <View>
                <Pressable
                  onPress={handleAddPassword}
                  className="flex-row items-center justify-center w-full px-6 py-4 bg-blue-600 shadow-lg rounded-xl"
                  style={({ pressed }) => [
                    pressed && {
                      backgroundColor: "#1e40af",
                      transform: [{ scale: 0.98 }],
                    },
                  ]}
                >
                  <Plus size={24} color="white" className="mr-2" />
                  <Text className="ml-2 text-lg font-semibold text-white">
                    Créer votre premier mot de passe
                  </Text>
                </Pressable>
              </View>

              {/* Message d'état vide */}
              <View className="items-center justify-center flex-1 mt-10">
                <View className="items-center p-8 bg-white shadow-sm rounded-2xl">
                  <Text className="mb-4 text-6xl">🔒</Text>
                  <Text className="mb-2 text-xl font-semibold text-gray-800">
                    Votre coffre-fort est vide
                  </Text>
                  <Text className="leading-relaxed text-center text-gray-500">
                    Commencez par ajouter votre premier mot de passe pour
                    sécuriser vos comptes
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <View className="flex-1">
              {passwords.map((password, index) => {
                const typeConfig = {
                  email: {
                    emoji: "📧",
                    label: "Email",
                    color: "bg-blue-100 text-blue-800",
                  },
                  bank: {
                    emoji: "🏦",
                    label: "Banque",
                    color: "bg-green-100 text-green-800",
                  },
                  social: {
                    emoji: "📱",
                    label: "Réseaux sociaux",
                    color: "bg-purple-100 text-purple-800",
                  },
                  other: {
                    emoji: "🔧",
                    label: "Autre",
                    color: "bg-gray-100 text-gray-800",
                  },
                };

                const config = typeConfig[password.type];

                return (
                  <View
                    key={password.id || index}
                    className="p-4 mb-4 bg-white shadow-sm rounded-xl"
                  >
                    <View className="flex-row items-center justify-between mb-2">
                      <View className="flex-row items-center">
                        <View
                          className={`px-2 py-1 rounded-full ${config.color} mr-2`}
                        >
                          <Text className="text-xs font-medium">
                            {config.emoji} {config.label}
                          </Text>
                        </View>
                        {password.isFavorite && (
                          <Text className="text-lg text-yellow-500">⭐</Text>
                        )}
                      </View>
                    </View>
                    <Text className="mb-1 text-lg font-semibold text-gray-800">
                      {password.email}
                    </Text>
                    <Text className="mb-2 text-gray-500">••••••••</Text>
                    <Text className="text-xs text-gray-400">
                      Créé le{" "}
                      {new Date(password.createdAt).toLocaleDateString("fr-FR")}
                    </Text>
                  </View>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bouton flottant quand il y a des mots de passe */}
      {passwords.length > 0 && (
        <View className="absolute bottom-6 right-6">
          <Pressable
            onPress={handleAddPassword}
            className="items-center justify-center bg-blue-600 rounded-full shadow-lg w-14 h-14"
            style={({ pressed }) => [
              {
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              },
              pressed && {
                backgroundColor: "#1e40af",
                transform: [{ scale: 0.95 }],
                shadowOpacity: 0.1,
                elevation: 4,
              },
            ]}
          >
            <Plus size={28} color="white" />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default PasswordScreen;
