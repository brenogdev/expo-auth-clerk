import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Button,
  Pressable,
  Text,
  Alert,
} from "react-native";
import { Link, Stack } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import Spinner from "react-native-loading-spinner-overlay";

const Register = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSigUnPress() {}

  async function OnPressVerify() {

  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
      <Spinner visible={loading} />

      {!pendingVerification && (
        <>
          <TextInput
            autoCapitalize="none"
            placeholder="entre com e-mail ou username"
            value={email}
            onChangeText={setEmail}
            style={styles.inputField}
          />
          <TextInput
            placeholder="password"
            value={password}
            onChangeText={setPassword}
            style={styles.inputField}
          />
          <Button
            onPress={onSigUnPress}
            title="Criar conta"
            color={"#6c47ff"}
          ></Button>
        </>
      )}

      {pendingVerification && (
        <>
          <TextInput
            placeholder="Entre com o Código"
            value={code}
            onChangeText={setCode}
            style={styles.inputField}
          />
          <Button
            onPress={OnPressVerify}
            title="Verificar código"
            color={"#6c47ff"}
          ></Button>
        </>
      )}
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: "#6c47ff",
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  button: {
    margin: 8,
    alignItems: "center",
  },
});
