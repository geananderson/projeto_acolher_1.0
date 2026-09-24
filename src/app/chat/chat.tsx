import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const MENSAGENS_INICIAIS: {
  id: string;
  text: string;
  fromMe: boolean;
}[] = [];

export default function Chat() {
  const router = useRouter();
  const { chatId, nome, foto } = useLocalSearchParams();
  const [mensagens, setMensagens] = useState(MENSAGENS_INICIAIS);
  const [texto, setTexto] = useState("");
  const [etapa, setEtapa] = useState(1);
  const [usuarioId, setUsuarioId] = useState<number | null>(null);

  useEffect(() => {
    async function carregarUsuario() {
      setUsuarioId(1);
    }
    carregarUsuario();

    setMensagens([
      {
        id: "boas_vidas",
        text: "Olá! Seja muito bem-vindo. 😊\nQual é o seu nome?",
        fromMe: false,
      },
    ]);
  }, []);

  const handleEnviarMensagem = async () => {
    if (texto.trim() === "") return;

    const novaMensagem = {
      id: Math.random().toString(),
      text: texto,
      fromMe: true,
    };

    setMensagens((atual) => [...atual, novaMensagem]);
    const textoEnviado = texto;
    setTexto("");

    if (etapa === 1) {
      const respostaRobo = {
        id: Math.random().toString(),
        text:
          "Prazer em te conhecer, " +
          textoEnviado +
          "! Como você está se sentindo hoje?",
        fromMe: false,
      };
      setMensagens((atual) => [...atual, respostaRobo]);
      setEtapa(2);
    } else if (etapa === 2) {
      const respuestaRobo = {
        id: Math.random().toString(),
        text: "Entendi perfeitamente. Obrigado por compartilhar isso comigo. ❤️\n\nVocê gostaria de conversar com um de nossos especialistas agora para ter um apoio mais direcionado?",
        fromMe: false,
      };
      setMensagens((atual) => [...atual, respuestaRobo]);
      setEtapa(3);
    } else if (etapa === 3) {
      const respostaUsuario = textoEnviado.toLowerCase();
      let textoRobo = "";

      if (
        respostaUsuario.includes("sim") ||
        respostaUsuario.includes("quero") ||
        respostaUsuario.includes("vms")
      ) {
        textoRobo =
          "Perfeito! Estou transferindo você para um de nossos especialistas humanos agora mesmo. Por favor, aguarde um momento. 👩‍⚕️👨‍⚕️";
      } else {
        textoRobo =
          "Entendido! Se precisar de qualquer coisa no futuro, estarei aqui. Cuide-se bem! E lembre-se: você não está sozinho(a) ❤️";
      }

      setMensagens((atual) => [
        ...atual,
        {
          id: Math.random().toString(),
          text: textoRobo,
          fromMe: false,
        },
      ]);
      setEtapa(4);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={1}
    >
      <View style={styles.header}>
        <View style={styles.headerLeftContainer}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ marginRight: 12 }}
          >
            <Feather name="arrow-left" size={24} color="#333" />
          </TouchableOpacity>

          {foto ? (
            <Image
              source={{ uri: foto as string }}
              style={styles.headerAvatar}
            />
          ) : (
            <View style={styles.headerAvatarPlaceholder}>
              <Text style={styles.headerAvatarPlaceholderText}>
                {nome ? (nome as string).charAt(0).toUpperCase() : "P"}
              </Text>
            </View>
          )}

          <Text style={styles.headerTitle} numberOfLines={1}>
            {nome ? (nome as string) : "Apoio Humanizado"}
          </Text>
        </View>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={mensagens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.balao,
              item.fromMe ? styles.minhaMsg : styles.outraMsg,
            ]}
          >
            <Text
              style={[
                styles.textoMsg,
                item.fromMe ? styles.textoBranco : styles.textoPreto,
              ]}
            >
              {item.text}
            </Text>
          </View>
        )}
        contentContainerStyle={styles.listaConteudo}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua mensagem..."
          value={texto}
          onChangeText={setTexto}
        />
        <TouchableOpacity
          style={styles.botaoEnviar}
          onPress={handleEnviarMensagem}
        >
          <Feather name="send" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
    paddingTop: 50,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
  },
  headerLeftContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  headerAvatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E0F2F1",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  headerAvatarPlaceholderText: {
    color: "#00BFA5",
    fontWeight: "bold",
    fontSize: 16,
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#333", flex: 1 },
  listaConteudo: { padding: 20 },
  balao: { padding: 12, borderRadius: 15, marginBottom: 10, maxWidth: "80%" },
  minhaMsg: { alignSelf: "flex-end", backgroundColor: "#00BFA5" },
  outraMsg: { alignSelf: "flex-start", backgroundColor: "#E0E0E0" },
  textoMsg: { fontSize: 16 },
  textoBranco: { color: "#FFF" },
  textoPreto: { color: "#333" },
  inputContainer: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#FFF",
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
    marginRight: 10,
  },
  botaoEnviar: {
    backgroundColor: "#00BFA5",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
