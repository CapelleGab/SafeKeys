import Input from "@/components/ui/Input";
import Password from "@/types/passwordType";
import { router } from "expo-router";
import { Lock, Save } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, StatusBar, Text, View } from "react-native";

export default function AddPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState<"email" | "bank" | "social" | "other">(
    "email"
  );

  const typeOptions = [
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
      value: "other",
      label: "🔧 Autre",
      color: "bg-white text-gray-700",
      selectedColor: "bg-blue-600 text-white",
    },
  ] as const;

  const handleSave = () => {
    if (!email.trim() || !password.trim()) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const newPassword: Omit<Password, "id" | "createdAt" | "updatedAt"> = {
      email: email.trim(),
      password: password.trim(),
      type,
      isFavorite: false, // Par défaut, pas en favori
    };

    console.log("Nouveau mot de passe:", {
      ...newPassword,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    router.back();
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

          {/* Email Input */}
          <Input
            label="Email / Identifiant"
            type="email"
            value={email}
            onChangeText={setEmail}
            placeholder="exemple@email.com"
            required
          />

          {/* Password Input */}
          <Input
            label="Mot de passe"
            type="password"
            value={password}
            onChangeText={setPassword}
            placeholder="Votre mot de passe"
            required
          />

          {/* Type de compte avec tags */}
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
              {typeOptions.map((option, index) => (
                <Pressable
                  key={option.value}
                  onPress={() => setType(option.value)}
                  className={`px-4 py-2 rounded-full border-2 ${
                    type === option.value
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
                      type === option.value ? "text-white" : "text-gray-700"
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
              votre authentification biométrique.
            </Text>
          </View>

          {/* Bouton de sauvegarde */}
          <View className="bg-gradient-to-t from-white via-white to-transparent">
            <Pressable
              onPress={handleSave}
              className="flex-row items-center justify-center w-full px-6 py-4 bg-blue-600 rounded-2xl"
              style={({ pressed }) => [
                {
                  shadowColor: "#2563eb",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 12,
                  elevation: 8,
                },
                pressed && {
                  backgroundColor: "#1e40af",
                  transform: [{ scale: 0.98 }],
                  shadowOpacity: 0.1,
                },
              ]}
            >
              <Save size={24} color="white" />
              <Text className="ml-3 text-lg font-bold text-white">
                Sauvegarder
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
