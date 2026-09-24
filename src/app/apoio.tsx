import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const COLORS = {
  principal: "#00BFA5",
  secondary: "#E67E22",
  bg: "#F8F9FA",
  white: "#FFFFFF",
  text: "#333333",
  lightText: "#999999",
};

export default function Apoio() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Central de Apoio</Text>

        <Text style={styles.sectionHeader}>Especialistas</Text>
        <TouchableOpacity style={styles.card}>
          <View style={styles.iconCircle}>
            <Feather name="user" color={COLORS.principal} size={24} />
          </View>
          <View style={{ flex: 1, marginLeft: 15 }}>
            <Text style={styles.cardTitle}>Dra. Ana Silva</Text>
            <Text style={styles.cardSub}>
              Psicóloga - Especialista em Ansiedade
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <View style={styles.iconCircle}>
            <Feather name="user" color={COLORS.principal} size={24} />
          </View>
          <View style={{ flex: 1, marginLeft: 15 }}>
            <Text style={styles.cardTitle}>Dr. Carlos Mendes</Text>
            <Text style={styles.cardSub}>
              Psicanalista - Atendimento Online
            </Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.sectionHeader}>Emergência</Text>
        <View
          style={[
            styles.card,
            { borderLeftWidth: 6, borderLeftColor: "#FF5252" },
          ]}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>CVV - Valorização da Vida</Text>
            <Text style={styles.cardSub}>Disponível 24h - Ligue 188</Text>
          </View>
          <Feather name="phone" color="#FF5252" size={24} />
        </View>

        <Text style={styles.sectionHeader}>Recursos Úteis</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.smallCard}>
            <Feather name="book-open" color={COLORS.secondary} size={24} />
            <Text style={styles.smallCardText}>Artigos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallCard}>
            <Feather name="headphones" color={COLORS.secondary} size={24} />
            <Text style={styles.smallCardText}>Podcasts</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <NavButton
          icon={<Feather name="home" color="#BDC3C7" size={24} />}
          label="Início"
          onPress={() => router.push("/dashboard")}
        />
        <NavButton
          icon={<Feather name="users" color="#BDC3C7" size={24} />}
          label="Chat"
          onPress={() => router.push("/chat")}
        />
        <NavButton
          icon={<Feather name="heart" color={COLORS.principal} size={24} />}
          label="Apoio"
          active
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
  scroll: { padding: 25, paddingBottom: 120 },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
    marginTop: 20,
    marginBottom: 15,
  },
  card: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E0F2F1",
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: { fontWeight: "bold", fontSize: 16, color: COLORS.text },
  cardSub: { color: COLORS.lightText, fontSize: 13, marginTop: 2 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  smallCard: {
    backgroundColor: COLORS.white,
    width: "48%",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    elevation: 2,
  },
  smallCardText: { marginTop: 10, fontWeight: "600", color: COLORS.text },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    width: "100%",
    height: 70,
    backgroundColor: COLORS.white,
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  navButton: { alignItems: "center" },
  navLabel: { fontSize: 10, color: "#BDC3C7", marginTop: 4 },
});
