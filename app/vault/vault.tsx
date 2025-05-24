import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Vault = () => {
  return (
    <View>
      <Text>Vault</Text>
      <Link href="/vault/password/gmail.com">
        <Text>Password</Text>
      </Link>
    </View>
  );
};

export default Vault;

const styles = StyleSheet.create({});
