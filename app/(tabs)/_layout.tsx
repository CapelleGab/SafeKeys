import TabsButton from "@/components/tabsButton";
import { Tabs } from "expo-router";
import { CreditCard, Lock, Notebook, Settings } from "lucide-react-native";
import React from "react";

const _Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#e5e7eb",
          paddingTop: 15,
          paddingHorizontal: 10,
        },
      }}
    >
      <Tabs.Screen
        name="passwords"
        options={{
          title: "Mot de passe",
          tabBarIcon: ({ focused }) => (
            <TabsButton
              icon={<Lock color={focused ? "#2563eb" : "#6b7280"} size={24} />}
              label="Mot de passe"
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="cards"
        options={{
          title: "Cartes bancaires",
          tabBarIcon: ({ focused }) => (
            <TabsButton
              icon={
                <CreditCard color={focused ? "#2563eb" : "#6b7280"} size={24} />
              }
              label="Carte bancaire"
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="notes"
        options={{
          title: "Notes",
          tabBarIcon: ({ focused }) => (
            <TabsButton
              icon={
                <Notebook color={focused ? "#2563eb" : "#6b7280"} size={24} />
              }
              label="Notes"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Paramètres",
          tabBarIcon: ({ focused }) => (
            <TabsButton
              icon={
                <Settings color={focused ? "#2563eb" : "#6b7280"} size={24} />
              }
              label="Paramètres"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _Layout;
