// Charger les polyfills React Native en premier
import "../polyfills";

import Input from "@/components/ui/Input";
import { passwordService } from "@/services/passwordService";
import { router } from "expo-router";
import { Lock, LogIn } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Alert, Pressable, StatusBar, Text, View } from "react-native";

export default function Index() {
  const [masterPassword, setMasterPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Vérifier si l'utilisateur est déjà connecté au démarrage
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const isInitialized = await passwordService.isServiceInitialized();
        if (isInitialized) {
          // Vérifier si on peut vraiment accéder aux données
          try {
            await passwordService.getAllPasswords();
            router.replace("/(tabs)/passwords");
            return;
          } catch (error) {
            console.log("Session expirée, redirection vers login");
            // La session a expiré, rester sur la page de login
          }
        }
      } catch (error) {
        console.error("Erreur lors de la vérification:", error);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogin = async () => {
    if (!masterPassword.trim()) {
      Alert.alert("Erreur", "Veuillez saisir votre mot de passe maître");
      return;
    }

    setIsLoading(true);
    try {
      await passwordService.initialize(masterPassword);
      router.replace("/(tabs)/passwords");
    } catch (error) {
      console.error("Erreur de connexion:", error);
      Alert.alert(
        "Erreur de connexion",
        "Mot de passe incorrect ou problème de synchronisation. Veuillez réessayer."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateVault = async () => {
    if (!masterPassword.trim()) {
      Alert.alert("Erreur", "Veuillez saisir un mot de passe maître");
      return;
    }

    if (masterPassword.length < 8) {
      Alert.alert(
        "Mot de passe trop court",
        "Le mot de passe maître doit contenir au moins 8 caractères"
      );
      return;
    }

    Alert.alert(
      "Créer un nouveau coffre-fort",
      "Êtes-vous sûr de vouloir créer un nouveau coffre-fort avec ce mot de passe maître ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Créer",
          onPress: async () => {
            setIsLoading(true);
            try {
              // Forcer un reset avant de créer un nouveau vault
              await passwordService.forceReset();
              await passwordService.initialize(masterPassword);
              router.replace("/(tabs)/passwords");
            } catch (error) {
              console.error("Erreur de création:", error);
              Alert.alert(
                "Erreur",
                "Impossible de créer le coffre-fort. Veuillez réessayer."
              );
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]
    );
  };

  const handleReset = async () => {
    Alert.alert(
      "Réinitialiser SafeKeys",
      "Cette action supprimera toutes les données locales. Êtes-vous sûr ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Réinitialiser",
          style: "destructive",
          onPress: async () => {
            try {
              await passwordService.forceReset();
              Alert.alert("Succès", "SafeKeys a été réinitialisé");
            } catch (error) {
              console.error("Erreur de reset:", error);
              Alert.alert("Erreur", "Impossible de réinitialiser");
            }
          },
        },
      ]
    );
  };

  // Afficher un écran de chargement pendant la vérification d'authentification
  if (isCheckingAuth) {
    return (
      <View className="items-center justify-center flex-1 bg-gradient-to-b from-blue-600 to-blue-800">
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <View className="items-center">
          <Lock size={100} color="white" />
          <Text className="mt-10 mb-2 text-5xl font-extrabold text-white">
            SafeKeys
          </Text>
          <Text className="text-lg font-medium text-blue-100">
            Votre coffre-fort numérique
          </Text>
        </View>

        <View className="absolute bottom-20">
          <Text className="text-sm text-blue-200">Chargement...</Text>
        </View>
      </View>
    );
  }

  // Afficher l'écran de connexion
  return (
    <View className="flex-1 p-6 bg-gradient-to-b from-blue-50 to-white">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <View className="items-center justify-center flex-1">
        {/* Header */}
        <View className="items-center mb-8">
          <Lock size={80} color="#2563eb" className="mb-4" />
          <Text className="mb-2 text-3xl font-bold text-gray-800">
            SafeKeys
          </Text>
          <Text className="text-center text-gray-500">
            Saisissez votre mot de passe maître pour accéder à votre coffre-fort
          </Text>
        </View>

        {/* Formulaire */}
        <View className="w-full max-w-sm gap-6">
          <Input
            label="Mot de passe maître"
            type="password"
            value={masterPassword}
            onChangeText={setMasterPassword}
            placeholder="Votre mot de passe maître"
            required
            autoFocus
          />

          {/* Bouton de connexion */}
          <Pressable
            onPress={handleLogin}
            disabled={isLoading}
            className={`flex-row items-center justify-center w-full px-6 py-4 rounded-2xl ${
              isLoading ? "bg-gray-400" : "bg-blue-600"
            }`}
            style={({ pressed }) => [
              {
                shadowColor: "#2563eb",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 12,
                elevation: 8,
              },
              pressed &&
                !isLoading && {
                  backgroundColor: "#1e40af",
                  transform: [{ scale: 0.98 }],
                  shadowOpacity: 0.1,
                },
            ]}
          >
            <LogIn size={24} color="white" />
            <Text className="ml-3 text-lg font-bold text-white">
              {isLoading ? "Connexion..." : "Se connecter"}
            </Text>
          </Pressable>

          {/* Bouton créer nouveau coffre */}
          <Pressable
            onPress={handleCreateVault}
            disabled={isLoading}
            className="flex-row items-center justify-center w-full px-6 py-4 border-2 border-blue-600 rounded-2xl"
            style={({ pressed }) => [
              pressed &&
                !isLoading && {
                  backgroundColor: "#dbeafe",
                  transform: [{ scale: 0.98 }],
                },
            ]}
          >
            <Lock size={24} color="#2563eb" />
            <Text className="ml-3 text-lg font-bold text-blue-600">
              Créer un nouveau coffre-fort
            </Text>
          </Pressable>
        </View>

        {/* Info sécurité */}
        <View className="p-4 mt-8 border border-blue-100 bg-blue-50 rounded-xl">
          <Text className="text-sm leading-relaxed text-center text-blue-700">
            🔒 Votre mot de passe maître est la clé de votre coffre-fort. Il
            n&apos;est jamais stocké et ne peut pas être récupéré. Assurez-vous
            de le mémoriser !
          </Text>
        </View>

        {/* Bouton de reset en cas de problème */}
        <View className="mt-4">
          <Pressable onPress={handleReset} className="px-4 py-2">
            <Text className="text-sm text-center text-gray-400 underline">
              Problème de connexion ? Réinitialiser SafeKeys
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
