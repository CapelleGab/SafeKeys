import { Stack } from "expo-router";
import "./globals.css";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen
        name="add-password"
        options={{ title: "Ajouter un mot de passe" }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, title: "Back" }}
      />
      <Stack.Screen
        name="designSystemScreen"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="password/[id]" options={{ headerShown: false }} />
    </Stack>
  );
}
