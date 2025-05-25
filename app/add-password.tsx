import Input from "@/components/ui/Input";
import { passwordService } from "@/services/passwordService";
import { router } from "expo-router";
import { Lock, Save, Shuffle } from "lucide-react-native";
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";

export default function AddPassword() {
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("email");
  const [isLoading, setIsLoading] = useState(false);

  const categoryOptions = [
    {
      value: "email",
      label: "📧 Email",
      color: "bg-white text-gray-700",
      selectedColor: "bg-blue-600 text-white",
    },
    {
      value: "bank",
      label: "🏦 Banque",
      color: "bg-white text-gray-700",
      selectedColor: "bg-blue-600 text-white",
    },
    {
      value: "social",
      label: "📱 Réseaux sociaux",
      color: "bg-white text-gray-700",
      selectedColor: "bg-blue-600 text-white",
    },
    {
      value: "work",
      label: "💼 Travail",
      color: "bg-white text-gray-700",
      selectedColor: "bg-blue-600 text-white",
    },
    {
      value: "other",
      label: "🔧 Autre",
      color: "bg-white text-gray-700",
      selectedColor: "bg-blue-600 text-white",
    },
  ] as const;

  const generatePassword = () => {
    try {
      const generatedPassword = passwordService.generatePassword();
      setPassword(generatedPassword);
    } catch (error) {
      console.error("Erreur génération mot de passe:", error);
      Alert.alert("Erreur", "Impossible de générer un mot de passe");
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !username.trim() || !password.trim()) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs obligatoires");
      return;
    }

    setIsLoading(true);
    try {
      await passwordService.addPassword({
        title: title.trim(),
        username: username.trim(),
        password: password.trim(),
        url: url.trim() || undefined,
        category: category,
      });

      // Retourner directement à la page précédente sans alerte
      router.back();
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      Alert.alert("Erreur", "Impossible de sauvegarder le mot de passe");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-gradient-to-b from-blue-50 to-white">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="gap-6 pt-8">
          {/* Header */}
          <View className="items-center mb-4">
            <Text className="mb-2 text-2xl font-bold text-gray-800">
              Nouveau mot de passe
            </Text>
            <Text className="text-center text-gray-500">
              Ajoutez un nouveau compte à votre coffre-fort
            </Text>
          </View>

          {/* Title Input */}
          <Input
            label="Titre / Nom du service"
            type="text"
            value={title}
            onChangeText={setTitle}
            placeholder="Ex: Gmail, Facebook, Banque..."
            required
          />

          {/* Username Input */}
          <Input
            label="Nom d'utilisateur / Email"
            type="email"
            value={username}
            onChangeText={setUsername}
            placeholder="exemple@email.com"
            required
          />

          {/* Password Input avec générateur */}
          <View>
            <Input
              label="Mot de passe"
              type="password"
              value={password}
              onChangeText={setPassword}
              placeholder="Votre mot de passe"
              required
            />
            <Pressable
              onPress={generatePassword}
              className="flex-row items-center justify-center w-full px-4 py-2 mt-2 border border-blue-300 rounded-lg bg-blue-50"
              style={({ pressed }) => [
                pressed && {
                  backgroundColor: "#dbeafe",
                  transform: [{ scale: 0.98 }],
                },
              ]}
            >
              <Shuffle size={16} color="#2563eb" />
              <Text className="ml-2 text-sm font-medium text-blue-600">
                Générer un mot de passe sécurisé
              </Text>
            </Pressable>
          </View>

          {/* URL Input */}
          <Input
            label="Site web (optionnel)"
            type="text"
            value={url}
            onChangeText={setUrl}
            placeholder="https://example.com"
          />

          {/* Catégorie avec tags */}
          <View>
            <Text className="mb-4 text-lg font-semibold text-gray-800">
              Catégorie
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="flex-row"
              contentContainerStyle={{ paddingRight: 20 }}
            >
              {categoryOptions.map((option, index) => (
                <Pressable
                  key={option.value}
                  onPress={() => setCategory(option.value)}
                  className={`px-4 py-2 rounded-full border-2 ${
                    category === option.value
                      ? `bg-blue-600 border-blue-600`
                      : `bg-white border-gray-300`
                  } ${index > 0 ? "ml-3" : ""}`}
                  style={({ pressed }) => [
                    pressed && {
                      transform: [{ scale: 0.95 }],
                    },
                  ]}
                >
                  <Text
                    className={`font-medium ${
                      category === option.value ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* Section d'explication sur la sécurité */}
          <View className="p-4 mb-2 border border-blue-100 bg-blue-50 rounded-xl">
            <View className="flex-row items-center gap-2 mb-2">
              <Lock size={16} color="#4F46E5" />
              <Text className="text-base font-semibold text-primary">
                Comment vos mots de passe sont sécurisés
              </Text>
            </View>
            <Text className="text-sm leading-relaxed text-blue-700">
              Vos mots de passe sont chiffrés localement sur votre appareil
              avant d&apos;être stockés. Nous utilisons un chiffrement de bout
              en bout, ce qui signifie que même nous ne pouvons pas accéder à
              vos données. Chaque mot de passe est protégé par une clé unique et
              votre mot de passe maître.
            </Text>
          </View>

          {/* Bouton de sauvegarde */}
          <View className="bg-gradient-to-t from-white via-white to-transparent">
            <Pressable
              onPress={handleSave}
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
              <Save size={24} color="white" />
              <Text className="ml-3 text-lg font-bold text-white">
                {isLoading ? "Sauvegarde..." : "Sauvegarder"}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
