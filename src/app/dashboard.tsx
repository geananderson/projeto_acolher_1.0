import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getNomeUsuario } from '../services/perfil';
import { logout } from '../services/auth';

const COLORS = {
  principal: "#00BFA5",
  secondary: "#E67E22",
  bg: "#F8F9FA",
  white: "#FFFFFF",
  text: "#333333",
  lightText: "#999999",
  cardBg: "#F0FFF4",
};

export default function Dashboard() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [nomeUsuario, setNomeUsuario] = useState("Usuário");

  useEffect(() => {
    async function carregarUsuario() {
      const nome = await getNomeUsuario();
      if (nome) setNomeUsuario(nome);
    }
    carregarUsuario();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View style={styles.header}>
          <Text style={styles.greeting}>Olá, {nomeUsuario}</Text>
          <Text style={styles.subGreeting}>
            Como você está se sentindo hoje?
          </Text>
          <View style={styles.moodRow}>
            <MoodItem label="Feliz" emoji="😃" />
            <MoodItem label="Triste" emoji="😥" />
            <MoodItem label="Ansioso" emoji="🤯" />
            <MoodItem label="Neutro" emoji="😐" />
          </View>
        </View>

        <TouchableOpacity style={styles.helpCard} activeOpacity={0.7}>
          <View style={styles.helpIconCircle}>
            <Feather name="help-circle" color={COLORS.secondary} size={22} />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.helpTitle}>Precisa de ajuda?</Text>
            <Text style={styles.helpSub}>Solicite apoio imediato agora</Text>
          </View>
          <Feather name="chevron-right" color="#CCC" size={20} />
        </TouchableOpacity>

        <SectionHeader title="Mensagens Motivacionais" />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalList}
        >
          <GroupCard title="Ansiedade" icon={<Feather name="zap" color="#666" size={28} />} />
          <GroupCard title="Tristeza" icon={<Feather name="frown" color="#666" size={28} />} />
          <GroupCard title="Autoestima" icon={<Feather name="heart" color="#666" size={28} />} />
        </ScrollView>

        <SectionHeader title="Destaques para você" />
        <TouchableOpacity style={styles.featuredCard} activeOpacity={0.8}>
          <View style={styles.featuredContent}>
            <View style={styles.featuredTextContent}>
              <Text style={styles.featuredTag}>MEDITAÇÃO</Text>
              <Text style={styles.featuredTitle}>Aliviando o estresse</Text>
              <Text style={styles.featuredSub}>5 minutos de relaxamento</Text>
            </View>
            <View style={styles.featuredIconContainer}>
              <Feather name="play-circle" color={COLORS.principal} size={40} />
            </View>
          </View>
        </TouchableOpacity>

        <SectionHeader title="Atividades Recomendadas" />
        <View style={styles.verticalList}>
          <ActivityItem title="Exercício de Respiração" sub="Controle sua respiração 4-7-8" icon="wind" color="#3498DB" />
          <ActivityItem title="Diário de Gratidão" sub="Escreva 3 coisas boas de hoje" icon="edit-3" color="#9B59B6" />
          <ActivityItem title="Música Relaxante" sub="Sons da natureza para focar" icon="music" color="#F1C40F" />
        </View>
      </ScrollView>

      <View style={[styles.bottomNav, { height: 70 + insets.bottom, paddingBottom: insets.bottom }]}>
        <NavButton icon={<Feather name="home" color={COLORS.principal} size={24} />} label="Início" active />
        <NavButton
          icon={<Feather name="users" color="#BDC3C7" size={24} />}
          label="Chat"
          onPress={() => router.push("/chat" as any)}
        />
        <NavButton
          icon={<Feather name="heart" color="#BDC3C7" size={24} />}
          label="Apoio"
          onPress={() => router.push("/apoio" as any)}
        />
        <NavButton
          icon={<Feather name="user" color="#BDC3C7" size={24} />}
          label="Perfil"
          onPress={() => router.push("/menu" as any)}
        />
      </View>
    </SafeAreaView>
  );
}

const MoodItem = ({ label, emoji }: any) => (
  <View style={styles.moodItem}>
    <TouchableOpacity style={styles.moodCircle}>
      <Text style={{ fontSize: 20 }}>{emoji}</Text>
    </TouchableOpacity>
    <Text style={styles.moodLabel}>{label}</Text>
  </View>
);

const SectionHeader = ({ title }: any) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.seeAllText}>Ver todos</Text>
  </View>
);

const GroupCard = ({ title, icon }: any) => (
  <View style={styles.groupCard}>
    <View style={styles.groupIconContainer}>{icon}</View>
    <Text style={styles.groupCardTitle}>{title}</Text>
  </View>
);

const ActivityItem = ({ title, sub, icon, color }: any) => (
  <TouchableOpacity style={styles.activityItem} activeOpacity={0.7}>
    <View style={[styles.activityIconCircle, { backgroundColor: color + "20" }]}>
      <Feather name={icon} color={color} size={20} />
    </View>
    <View style={styles.activityTextContent}>
      <Text style={styles.activityTitle}>{title}</Text>
      <Text style={styles.activitySub}>{sub}</Text>
    </View>
    <Feather name="chevron-right" color="#EEE" size={18} />
  </TouchableOpacity>
);

const NavButton = ({ icon, label, active, onPress }: any) => (
  <TouchableOpacity style={styles.navButton} onPress={onPress}>
    {icon}
    <Text style={[styles.navLabel, active && { color: COLORS.principal }]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    backgroundColor: COLORS.principal,
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 40,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  greeting: { fontSize: 24, fontWeight: "bold", color: COLORS.white },
  subGreeting: { color: "rgba(255,255,255,0.8)", fontSize: 14, marginBottom: 20 },
  moodRow: { flexDirection: "row", justifyContent: "space-between" },
  moodItem: { alignItems: "center" },
  moodCircle: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  moodLabel: { color: COLORS.white, fontSize: 12, marginTop: 8 },
  helpCard: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    marginHorizontal: 25,
    marginTop: -25,
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    elevation: 3,
  },
  helpIconCircle: {
    width: 35,
    height: 35,
    borderRadius: 10,
    backgroundColor: "#FFF5EB",
    justifyContent: "center",
    alignItems: "center",
  },
  helpTitle: { color: COLORS.secondary, fontWeight: "bold", fontSize: 14 },
  helpSub: { color: COLORS.lightText, fontSize: 11 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    marginTop: 30,
    alignItems: "center",
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: COLORS.text },
  seeAllText: { color: COLORS.principal, fontSize: 12, fontWeight: "600" },
  horizontalList: { paddingLeft: 25, marginTop: 15 },
  groupCard: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 25,
    marginRight: 15,
    width: 150,
  },
  groupIconContainer: { marginBottom: 10 },
  groupCardTitle: { fontWeight: "bold", fontSize: 14 },
  featuredCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 25,
    marginTop: 15,
    borderRadius: 25,
    padding: 20,
    elevation: 2,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.principal,
  },
  featuredContent: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  featuredTextContent: { flex: 1 },
  featuredTag: { color: COLORS.principal, fontSize: 10, fontWeight: "bold", letterSpacing: 1, marginBottom: 4 },
  featuredTitle: { fontSize: 16, fontWeight: "bold", color: COLORS.text },
  featuredSub: { fontSize: 13, color: COLORS.lightText, marginTop: 2 },
  featuredIconContainer: { marginLeft: 15 },
  verticalList: { paddingHorizontal: 25, marginTop: 10 },
  activityItem: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    alignItems: "center",
  },
  activityIconCircle: { width: 40, height: 40, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  activityTextContent: { flex: 1, marginLeft: 15 },
  activityTitle: { fontSize: 14, fontWeight: "bold", color: COLORS.text },
  activitySub: { fontSize: 12, color: COLORS.lightText, marginTop: 2 },
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