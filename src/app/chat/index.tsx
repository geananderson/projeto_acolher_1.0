import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { listarEspecialistas, criarChat } from '../../services/chat';
import { getIdUsuarioLogado } from '../../services/perfil';

const COLORS = {
  principal: "#00BFA5",
  white: "#FFFFFF",
  text: "#333333",
  lightText: "#999999",
};

export default function ListaDeConversas() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [modalVisivel, setModalVisivel] = useState(false);
  const [novoNome, setNovoNome] = useState("");
  const [novoCrp, setNovoCrp] = useState("");
  const [especialistas, setEspecialistas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [usuarioId, setUsuarioId] = useState<number | null>(null);

  useEffect(() => {
    async function carregar() {
      try {
        const [lista, id] = await Promise.all([
          listarEspecialistas(),
          getIdUsuarioLogado()
        ]);
        setEspecialistas(lista);
        setUsuarioId(id);
      } catch (error) {
        console.error('Erro ao carregar especialistas', error);
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, []);

  const handleAbrirChat = async (especialistaId: number) => {
    try {
      const chat = await criarChat(usuarioId!, especialistaId);
      router.push(`/chat/chat?chatId=${chat.id}`);
    } catch (error) {
      console.error('Erro ao criar chat', error);
    }
  };

  const salvarPsicologo = () => {
    setNovoNome("");
    setNovoCrp("");
    setModalVisivel(false);
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#00BFA5" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Minhas Conversas</Text>
        <TouchableOpacity onPress={() => setModalVisivel(true)}>
          <Feather name="plus" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={especialistas}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Text style={{ color: '#999' }}>Nenhum especialista disponível.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleAbrirChat(item.id)}
          >
            <View style={[styles.avatar, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#E0F2F1' }]}>
              <Feather name="user" size={24} color="#00BFA5" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.nome}>{item.nomeCompleto}</Text>
              <Text style={styles.msg} numberOfLines={1}>
                {item.especialidade ?? 'Especialista'}
              </Text>
            </View>
            <Feather name="chevron-right" size={20} color="#CCC" />
          </TouchableOpacity>
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cadastrar Psicólogo</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome do Profissional"
              value={novoNome}
              onChangeText={setNovoNome}
            />
            <TextInput
              style={styles.input}
              placeholder="CRP (Ex: 06/12345)"
              value={novoCrp}
              onChangeText={setNovoCrp}
            />
            <View style={styles.modalBotoes}>
              <TouchableOpacity
                style={[styles.botaoModal, styles.botaoCancelar]}
                onPress={() => setModalVisivel(false)}
              >
                <Text style={styles.textoBotao}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.botaoModal, styles.botaoSalvar]}
                onPress={salvarPsicologo}
              >
                <Text style={styles.textoBotao}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={[styles.bottomNav, { height: 70 + insets.bottom, paddingBottom: insets.bottom }]}>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push("/dashboard" as any)}>
          <Feather name="home" color="#BDC3C7" size={24} />
          <Text style={styles.navLabel}>Início</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Feather name="users" color={COLORS.principal} size={24} />
          <Text style={[styles.navLabel, { color: COLORS.principal }]}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push("/apoio" as any)}>
          <Feather name="heart" color="#BDC3C7" size={24} />
          <Text style={styles.navLabel}>Apoio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => router.push("/menu" as any)}>
          <Feather name="user" color="#BDC3C7" size={24} />
          <Text style={styles.navLabel}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: "#00BFA5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
  card: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#EEE",
    marginRight: 15,
  },
  nome: { fontWeight: "bold", fontSize: 16, color: "#333" },
  msg: { color: "#666", fontSize: 14, marginTop: 2 },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", color: "#333", marginBottom: 15 },
  input: {
    width: "100%",
    height: 45,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#FAFAFA",
  },
  modalBotoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  botaoModal: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  botaoCancelar: { backgroundColor: "#999" },
  botaoSalvar: { backgroundColor: "#00BFA5" },
  textoBotao: { color: "#FFF", fontWeight: "bold" },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    width: "100%",
    backgroundColor: COLORS.white,
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  navButton: { alignItems: "center" },
  navLabel: { fontSize: 10, color: "#BDC3C7", marginTop: 4 },
});