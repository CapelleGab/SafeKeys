import { generatePassword } from "@/utils/passwordGenerator";
import { ExternalLink, Eye, EyeOff, RefreshCw } from "lucide-react-native";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

export type InputType = "email" | "password" | "linkWebSite" | "text";

interface InputProps extends Omit<TextInputProps, "secureTextEntry"> {
  label: string;
  type?: InputType;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  onGeneratePassword?: (password: string) => void;
  onOpenLink?: (url: string) => void;
}

export default function Input({
  label,
  type = "text",
  value,
  onChangeText,
  placeholder,
  required = false,
  error,
  onGeneratePassword,
  onOpenLink,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleGeneratePassword = () => {
    const generatedPassword = generatePassword({
      length: 16,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: true,
    });
    onChangeText(generatedPassword);
    if (onGeneratePassword) {
      onGeneratePassword(generatedPassword);
    }
  };

  const handleOpenLink = () => {
    if (value && onOpenLink) {
      onOpenLink(value);
    }
  };

  const getKeyboardType = (): TextInputProps["keyboardType"] => {
    switch (type) {
      case "email":
        return "email-address";
      case "linkWebSite":
        return "url";
      default:
        return "default";
    }
  };

  const getAutoCapitalize = (): TextInputProps["autoCapitalize"] => {
    switch (type) {
      case "email":
      case "linkWebSite":
        return "none";
      default:
        return "sentences";
    }
  };

  const renderActionButtons = () => {
    const buttons = [];

    if (type === "password") {
      // Bouton générer mot de passe
      buttons.push(
        <Pressable
          key="generate"
          onPress={handleGeneratePassword}
          className="items-center justify-center w-10 h-10 mr-2 bg-gray-100 rounded-lg"
          style={({ pressed }) => ({
            opacity: pressed ? 0.7 : 1,
            backgroundColor: pressed ? "#e5e7eb" : "#f3f4f6",
          })}
        >
          <RefreshCw size={18} color="#374151" />
        </Pressable>
      );

      // Bouton voir/cacher mot de passe
      buttons.push(
        <Pressable
          key="toggle"
          onPress={() => setShowPassword(!showPassword)}
          className="items-center justify-center w-10 h-10 bg-gray-100 rounded-lg"
          style={({ pressed }) => ({
            opacity: pressed ? 0.7 : 1,
            backgroundColor: pressed ? "#e5e7eb" : "#f3f4f6",
          })}
        >
          {showPassword ? (
            <EyeOff size={18} color="#374151" />
          ) : (
            <Eye size={18} color="#374151" />
          )}
        </Pressable>
      );
    }

    if (type === "linkWebSite" && value) {
      buttons.push(
        <Pressable
          key="link"
          onPress={handleOpenLink}
          className="items-center justify-center w-10 h-10 bg-gray-100 rounded-lg"
          style={({ pressed }) => ({
            opacity: pressed ? 0.7 : 1,
            backgroundColor: pressed ? "#e5e7eb" : "#f3f4f6",
          })}
        >
          <ExternalLink size={18} color="#374151" />
        </Pressable>
      );
    }

    return buttons.length > 0 ? (
      <View className="flex-row items-center ml-3">{buttons}</View>
    ) : null;
  };

  const getBorderColor = () => {
    if (error) return "#ef4444"; // red-500
    if (isFocused) return "#3b82f6"; // blue-500
    return "#e5e7eb"; // gray-200
  };

  const getBackgroundColor = () => {
    if (error) return "#fef2f2"; // red-50
    return "#ffffff"; // white
  };

  return (
    <View>
      {/* Label */}
      <View className="flex-row items-center mb-2">
        <Text className="text-base font-semibold text-gray-900">{label}</Text>
        {required && <Text className="ml-1 text-base text-red-500">*</Text>}
      </View>

      {/* Input Container */}
      <View
        className="flex-row items-center px-4 border-2 rounded-xl"
        style={{
          borderColor: getBorderColor(),
          backgroundColor: getBackgroundColor(),
          minHeight: 56,
        }}
      >
        {/* TextInput */}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          className="flex-1 text-base text-gray-900"
          keyboardType={getKeyboardType()}
          autoCapitalize={getAutoCapitalize()}
          secureTextEntry={type === "password" && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            fontSize: 16,
            lineHeight: Platform.OS === "ios" ? 20 : 22,
            paddingVertical: Platform.OS === "ios" ? 16 : 14,
            paddingHorizontal: 0,
            margin: 0,
            textAlignVertical: "center",
          }}
          {...props}
        />

        {/* Action Buttons */}
        {renderActionButtons()}
      </View>

      {/* Error Message */}
      {error && (
        <View className="mt-2">
          <Text className="text-sm text-red-500">{error}</Text>
        </View>
      )}
    </View>
  );
}
