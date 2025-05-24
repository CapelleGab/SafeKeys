import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Password = () => {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Password : {id}</Text>
    </View>
  );
};

export default Password;

const styles = StyleSheet.create({});
