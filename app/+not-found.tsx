import { Stack } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="items-center justify-center flex-1 p-5">
        <Text className="text-xl font-bold">Cette page n&apos;existe pas.</Text>
      </View>
    </>
  );
}
