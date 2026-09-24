import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "../components/Button";
import { Input } from "../components/input";

const FRASES = [
  "Respire fundo. Você está fazendo o seu melhor.",
  "Pequenos passos também levam a grandes destinos.",
  "Sua saúde mental é uma prioridade, não um luxo.",
  "Um dia de cada vez. Você consegue.",
  "Seja gentil com a sua mente hoje.",
  "Tudo bem não estar bem o tempo todo.",
  "Sua jornada importa, não importa o ritmo.",
  "Você é mais forte do que imagina.",
  "Acalme seu coração, o melhor ainda está por vir.",
  "Sua coragem inspira quem está ao seu redor.",
  "Permita-se descansar. Amanhã é um novo dia.",
  "Você não está sozinho nessa jornada.",
];

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentFrase, setCurrentFrase] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let interval: any;
    if (loading) {
      progress.setValue(0);
      Animated.timing(progress, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false,
      }).start();

      interval = setInterval(() => {
        setCurrentFrase((prev) => (prev + 1) % FRASES.length);
      }, 1800);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleLogin = async () => {
    if (email.trim() === "" || password.trim() === "") {
      Alert.alert("Aviso", "Os campos de e-mail e senha são obrigatórios.");
      return;
    }

    try {
      setLoading(true);

      const tipoSimulado = email.toLowerCase().includes("especialista")
        ? "especialista"
        : "dashboard";

      setTimeout(() => {
        setLoading(false);
        if (tipoSimulado === "especialista") {
          router.replace("/especialista");
        } else {
          router.replace("/dashboard");
        }
      }, 3000);
    } catch (error: any) {
      setLoading(false);
      if (error.response?.status === 403) {
        Alert.alert("Erro", "E-mail ou senha incorretos.");
      } else {
        Alert.alert("Erro", "Não foi possível fazer login. Tente novamente.");
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Image
          source={require("@/assets/img1.png")}
          style={styles.loadingLogo}
        />
        <View style={styles.progressBarBg}>
          <Animated.View
            style={[
              styles.progressBarFill,
              {
                width: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
          />
        </View>
        <View style={styles.fraseBox}>
          <Text style={styles.fraseText}>{FRASES[currentFrase]}</Text>
        </View>
        <Text style={styles.loadingSubText}>PREPARANDO SEU AMBIENTE</Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#00BFA5" }}
      edges={["right", "left", "bottom"]}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.select({ ios: "padding", android: "height" })}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
        >
          <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <Image
                source={require("@/assets/img1.png")}
                style={styles.illustration}
              />
              <Text style={styles.title}>Entrar</Text>
              <Text style={styles.subtitle}>
                Acesse sua conta com e-mail e senha.
              </Text>

              <View style={styles.form}>
                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  placeholderTextColor="#555"
                  value={email}
                  onChangeText={setEmail}
                />
                <Input
                  placeholder="Senha"
                  secureTextEntry
                  placeholderTextColor="#555"
                  value={password}
                  onChangeText={setPassword}
                />
                <Button
                  label="Entrar"
                  onPress={handleLogin}
                  style={styles.buttonDefault}
                />
              </View>

              <View style={styles.footer}>
                <Text style={styles.footerText}>Não tem uma conta? </Text>
                <TouchableOpacity onPress={() => router.push("/cads")}>
                  <Text style={styles.footerLink}>Cadastre-se aqui.</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#00BFA5", padding: 32 },
  illustration: {
    width: "100%",
    height: 330,
    resizeMode: "contain",
    marginTop: 62,
  },
  title: { fontSize: 32, fontWeight: "900", color: "#ffffff" },
  subtitle: { fontSize: 16 },
  form: { marginTop: 24, gap: 12 },
  buttonDefault: {
    width: "100%",
    height: 48,
    backgroundColor: "#00238e",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  footerText: { color: "#555" },
  footerLink: { color: "#032ad7", fontWeight: "700" },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  loadingLogo: {
    width: 180,
    height: 180,
    resizeMode: "contain",
    marginBottom: 40,
  },
  progressBarBg: {
    width: "100%",
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: { height: "100%", backgroundColor: "#00BFA5" },
  fraseBox: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  fraseText: {
    fontSize: 20,
    textAlign: "center",
    color: "#333",
    fontStyle: "italic",
    lineHeight: 28,
    fontWeight: "500",
  },
  loadingSubText: {
    marginTop: 60,
    color: "#BDC3C7",
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: "600",
  },
});
