import Input from "@/components/ui/Input";
import { passwordService } from "@/services/passwordService";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, Save, Shuffle, Trash2 } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { PasswordEntry } from "safekeys-core/dist/adapters";

export default function EditPassword() {
  const { passwordId } = useLocalSearchParams<{ passwordId: string }>();
  const [password, setPassword] = useState<PasswordEntry | null>(null);
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("email");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

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

  // Charger les données du mot de passe
  useEffect(() => {
    const loadPasswordData = async () => {
      if (!passwordId) {
        router.back();
        return;
      }

      try {
        const passwords = await passwordService.getAllPasswords();
        const foundPassword = passwords.find((p) => p.id === passwordId);

        if (!foundPassword) {
          Alert.alert("Erreur", "Mot de passe introuvable", [
            { text: "OK", onPress: () => router.back() },
          ]);
          return;
        }

        setPassword(foundPassword);
        setTitle(foundPassword.title);
        setUsername(foundPassword.username);
        setPasswordValue(foundPassword.password);
        setUrl(foundPassword.url || "");
        setCategory(foundPassword.category || "email");
      } catch (error) {
        console.error("Erreur lors du chargement:", error);
        Alert.alert("Erreur", "Impossible de charger le mot de passe", [
          { text: "OK", onPress: () => router.back() },
        ]);
      } finally {
        setIsLoadingData(false);
      }
    };

    loadPasswordData();
  }, [passwordId]);

  const generatePassword = () => {
    try {
      const generatedPassword = passwordService.generatePassword();
      setPasswordValue(generatedPassword);
    } catch (error) {
      console.error("Erreur génération mot de passe:", error);
      Alert.alert("Erreur", "Impossible de générer un mot de passe");
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !username.trim() || !passwordValue.trim()) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (!passwordId) return;

    setIsLoading(true);
    try {
      await passwordService.updatePassword(passwordId, {
        title: title.trim(),
        username: username.trim(),
        password: passwordValue.trim(),
        url: url.trim() || undefined,
        category: category,
      });

      router.back();
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      Alert.alert("Erreur", "Impossible de sauvegarder les modifications");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!passwordId) return;

    Alert.alert(
      "Supprimer le mot de passe",
      "Êtes-vous sûr de vouloir supprimer ce mot de passe ? Cette action est irréversible.",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            try {
              await passwordService.deletePassword(passwordId);
              router.back();
            } catch (error) {
              console.error("Erreur lors de la suppression:", error);
              Alert.alert("Erreur", "Impossible de supprimer le mot de passe");
            }
          },
        },
      ]
    );
  };

  if (isLoadingData) {
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

      {/* Header avec bouton retour */}
      <View className="flex-row items-center justify-between p-4 pt-12">
        <Pressable
          onPress={() => router.back()}
          className="flex-row items-center"
        >
          <ArrowLeft size={24} color="#374151" />
          <Text className="ml-2 text-lg font-medium text-gray-700">Retour</Text>
        </Pressable>

        <Pressable
          onPress={handleDelete}
          className="p-2 bg-red-100 rounded-full"
        >
          <Trash2 size={20} color="#DC2626" />
        </Pressable>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="gap-6 pt-4">
          {/* Header */}
          <View className="items-center mb-4">
            <Text className="mb-2 text-2xl font-bold text-gray-800">
              Modifier le mot de passe
            </Text>
            <Text className="text-center text-gray-500">
              Modifiez les informations de votre compte
            </Text>
            {password && (
              <Text className="mt-2 text-xs text-gray-400">
                Dernière modification :{" "}
                {new Date(
                  password.lastModifiedAt || password.createdAt
                ).toLocaleDateString("fr-FR")}
              </Text>
            )}
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
              value={passwordValue}
              onChangeText={setPasswordValue}
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
                Générer un nouveau mot de passe
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

          {/* Boutons d'action */}
          <View className="gap-4 pb-8">
            {/* Bouton de sauvegarde */}
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
                {isLoading ? "Sauvegarde..." : "Sauvegarder les modifications"}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
