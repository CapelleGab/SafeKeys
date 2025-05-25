import { passwordService } from "@/services/passwordService";
import { useFocusEffect } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import { router } from "expo-router";
import {
  Edit3,
  Eye,
  EyeOff,
  LogOut,
  Plus,
  RefreshCw,
} from "lucide-react-native";
import React, { useCallback, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { PasswordEntry } from "safekeys-core/dist/adapters";

const PasswordScreen = () => {
  const [passwords, setPasswords] = useState<PasswordEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [visiblePasswords, setVisiblePasswords] = useState<Set<string>>(
    new Set()
  );

  // Charger les mots de passe au montage du composant et à chaque fois qu'on revient sur la page
  useFocusEffect(
    useCallback(() => {
      loadPasswords();
    }, [])
  );

  const loadPasswords = async () => {
    try {
      setIsLoading(true);
      const allPasswords = await passwordService.getAllPasswords();
      setPasswords(allPasswords);
    } catch (error) {
      console.error("Erreur lors du chargement:", error);

      // Si c'est une erreur de session expirée, rediriger vers login
      if (error instanceof Error && error.message.includes("Session expirée")) {
        Alert.alert("Session expirée", "Veuillez vous reconnecter", [
          {
            text: "OK",
            onPress: () => router.replace("/"),
          },
        ]);
        return;
      }

      Alert.alert("Erreur", "Impossible de charger les mots de passe");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      await passwordService.sync();
      await loadPasswords();
      Alert.alert("Succès", "Synchronisation terminée");
    } catch (error) {
      console.error("Erreur de synchronisation:", error);
      Alert.alert("Erreur", "Échec de la synchronisation");
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert("Déconnexion", "Êtes-vous sûr de vouloir vous déconnecter ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Déconnexion",
        style: "destructive",
        onPress: async () => {
          await passwordService.logout();
          router.replace("/");
        },
      },
    ]);
  };

  const handleAddPassword = () => {
    router.push("/add-password");
  };

  const togglePasswordVisibility = (passwordId: string) => {
    const newVisible = new Set(visiblePasswords);
    if (newVisible.has(passwordId)) {
      newVisible.delete(passwordId);
    } else {
      newVisible.add(passwordId);
    }
    setVisiblePasswords(newVisible);
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await Clipboard.setStringAsync(text);
      Alert.alert("✅ Copié", `${type} copié dans le presse-papiers`);
    } catch (error) {
      console.error("Erreur de copie:", error);
      Alert.alert("❌ Erreur", "Impossible de copier dans le presse-papiers");
    }
  };

  const handleEditPassword = (password: PasswordEntry) => {
    router.push(`/edit-password?passwordId=${password.id}`);
  };

  const getCategoryConfig = (category?: string) => {
    const configs = {
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
      work: {
        emoji: "💼",
        label: "Travail",
        color: "bg-orange-100 text-orange-800",
      },
      other: {
        emoji: "🔧",
        label: "Autre",
        color: "bg-gray-100 text-gray-800",
      },
    };

    return configs[category as keyof typeof configs] || configs.other;
  };

  if (isLoading) {
    return (
      <View className="items-center justify-center flex-1 bg-gradient-to-b from-blue-50 to-white">
        <Text className="text-lg text-gray-600">Chargement...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gradient-to-b from-blue-50 to-white">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Header avec boutons d'action */}
      <View className="flex-row items-center justify-between p-4 pt-12">
        <Text className="text-2xl font-bold text-gray-800">
          Mes mots de passe
        </Text>
        <View className="flex-row gap-2">
          <Pressable
            onPress={handleRefresh}
            disabled={isRefreshing}
            className={`p-2 rounded-full ${
              isRefreshing ? "bg-gray-300" : "bg-blue-100"
            }`}
          >
            <RefreshCw
              size={20}
              color={isRefreshing ? "#9CA3AF" : "#2563eb"}
              className={isRefreshing ? "animate-spin" : ""}
            />
          </Pressable>
          <Pressable
            onPress={handleLogout}
            className="p-2 bg-red-100 rounded-full"
          >
            <LogOut size={20} color="#DC2626" />
          </Pressable>
        </View>
      </View>

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
              {passwords.map((password) => {
                const config = getCategoryConfig(password.category);
                const isVisible = visiblePasswords.has(password.id);

                return (
                  <View
                    key={password.id}
                    className="p-4 mb-4 bg-white shadow-sm rounded-xl"
                    style={{ minHeight: 100 }}
                  >
                    {/* Header avec catégorie et bouton éditer */}
                    <View className="flex-row items-center justify-between mb-3">
                      <View
                        className={`px-3 py-1 rounded-full ${config.color}`}
                      >
                        <Text className="text-xs font-medium">
                          {config.emoji} {config.label}
                        </Text>
                      </View>
                      <Pressable
                        onPress={() => handleEditPassword(password)}
                        className="p-2 bg-gray-100 rounded-full"
                      >
                        <Edit3 size={16} color="#6B7280" />
                      </Pressable>
                    </View>

                    {/* Titre */}
                    <Text className="mb-3 text-lg font-semibold text-gray-800">
                      {password.title}
                    </Text>

                    {/* Email/Username avec bouton copier */}
                    <View className="flex-row items-center justify-between mb-3">
                      <View className="flex-1">
                        <Text className="mb-1 text-xs text-gray-500">
                          Email/Utilisateur
                        </Text>
                        <Text
                          className="font-medium text-gray-700"
                          numberOfLines={1}
                        >
                          {password.username}
                        </Text>
                      </View>
                      <Pressable
                        onPress={() =>
                          copyToClipboard(password.username, "Email")
                        }
                        className="px-3 py-1 ml-2 rounded-lg bg-blue-50"
                      >
                        <Text className="text-xs font-medium text-blue-600">
                          Copier
                        </Text>
                      </Pressable>
                    </View>

                    {/* Mot de passe avec boutons voir/copier */}
                    <View className="flex-row items-start justify-between mb-3">
                      <View className="flex-1">
                        <Text className="mb-1 text-xs text-gray-500">
                          Mot de passe
                        </Text>
                        <Text
                          className="font-mono text-gray-700"
                          numberOfLines={1}
                        >
                          {isVisible ? password.password : "••••••••••••"}
                        </Text>
                      </View>
                      <View className="flex-row items-center mt-4 ml-2">
                        <Pressable
                          onPress={() => togglePasswordVisibility(password.id)}
                          className="p-2 mr-1 rounded-lg bg-gray-50"
                        >
                          {isVisible ? (
                            <EyeOff size={16} color="#6B7280" />
                          ) : (
                            <Eye size={16} color="#6B7280" />
                          )}
                        </Pressable>
                        <Pressable
                          onPress={() =>
                            copyToClipboard(password.password, "Mot de passe")
                          }
                          className="px-3 py-1 rounded-lg bg-blue-50"
                        >
                          <Text className="text-xs font-medium text-blue-600">
                            Copier
                          </Text>
                        </Pressable>
                      </View>
                    </View>

                    {/* URL optionnelle */}
                    {password.url && (
                      <View className="mb-3">
                        <Text className="mb-1 text-xs text-gray-500">
                          Site web
                        </Text>
                        <Text
                          className="text-sm text-blue-600"
                          numberOfLines={1}
                        >
                          {password.url}
                        </Text>
                      </View>
                    )}

                    {/* Footer avec dates */}
                    <View className="flex-row items-center justify-between pt-2 border-t border-gray-100">
                      <Text className="text-xs text-gray-400">
                        Créé le{" "}
                        {new Date(password.createdAt).toLocaleDateString(
                          "fr-FR"
                        )}
                      </Text>
                      {password.lastModifiedAt &&
                        new Date(password.lastModifiedAt).getTime() !==
                          new Date(password.createdAt).getTime() && (
                          <Text className="text-xs text-gray-400">
                            Modifié le{" "}
                            {new Date(
                              password.lastModifiedAt
                            ).toLocaleDateString("fr-FR")}
                          </Text>
                        )}
                    </View>
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
