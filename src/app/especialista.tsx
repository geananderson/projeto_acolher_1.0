import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  LayoutAnimation,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  UIManager,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { logout } from "../services/auth";
import { getNomeUsuario } from "../services/perfil";
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const BASE_COMPLETA_PACIENTES = [
  {
    id: "1",
    paciente: "Adriano Silva",
    idade: "34 anos",
    horario: "08:00",
    tipo: "Sessão de Terapia",
    status: "Confirmado",
    queixa: "Dificuldade de organização no trabalho.",
    historicoClinico:
      "Paciente relata cansaço mental. Iniciamos o mapeamento de rotinas produtivas.",
    foto: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "2",
    paciente: "Amanda Costa",
    idade: "27 anos",
    horario: "09:00",
    tipo: "Primeira Consulta",
    status: "Confirmado",
    queixa: "Insegurança em relacionamentos interpessoais.",
    historicoClinico:
      "Fase de acolhimento inicial. Estabelecendo vínculo terapêutico seguro.",
    foto: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: "3",
    paciente: "Bruno Melo",
    idade: "31 anos",
    horario: "10:00",
    tipo: "Retorno",
    status: "Confirmado",
    queixa: "Ansiedade moderada e oscilações de humor.",
    historicoClinico:
      "Trabalhando técnicas de regulação emocional e identificação de gatilhos.",
    foto: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: "4",
    paciente: "Carlos Eduardo",
    idade: "29 anos",
    horario: "11:00",
    tipo: "Sessão de Terapia",
    status: "Confirmado",
    queixa: "Cobrança excessiva por performance.",
    historicoClinico:
      "Discussão sobre autocompaixão e reestruturação de crenças limitantes.",
    foto: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    id: "5",
    paciente: "Daniela Freitas",
    idade: "25 anos",
    horario: "13:00",
    tipo: "Retorno",
    status: "Pendente",
    queixa: "Medo de falar em público.",
    historicoClinico:
      "Prática de respiração diafragmática. Planejando exposições graduais.",
    foto: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    id: "6",
    paciente: "Diego Antunes",
    idade: "33 anos",
    horario: "14:00",
    tipo: "Sessão de Terapia",
    status: "Confirmado",
    queixa: "Estresse elevado no ambiente corporativo.",
    historicoClinico:
      "Alinhamento de limites profissionais e técnicas de relaxamento progressivo.",
    foto: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    id: "7",
    paciente: "Eduardo Rocha",
    idade: "42 anos",
    horario: "15:00",
    tipo: "Sessão de Terapia",
    status: "Confirmado",
    queixa: "Conflitos familiares recorrentes.",
    historicoClinico:
      "Análise de padrões de comunicação. Treino de assertividade parental.",
    foto: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    id: "8",
    paciente: "Fernanda Lima",
    idade: "28 anos",
    horario: "16:00",
    tipo: "Retorno",
    status: "Confirmado",
    queixa: "Sintomas depressivos leves.",
    historicoClinico:
      "Acompanhamento de ativação compartilhamental. Apresenta melhora gradual.",
    foto: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    id: "9",
    paciente: "Gabriel Jesus",
    idade: "24 anos",
    horario: "17:00",
    tipo: "Primeira Consulta",
    status: "Pendente",
    queixa: "Orientação profissional.",
    historicoClinico:
      "Entrevista inicial focada em histórico acadêmico e inclinações profissionais.",
    foto: "https://randomuser.me/api/portraits/men/9.jpg",
  },
  {
    id: "10",
    paciente: "Gean Anderson",
    idade: "22 anos",
    horario: "08:00",
    tipo: "Primeira Consulta",
    status: "Confirmado",
    queixa: "Ansiedade com entregas da faculdade.",
    historicoClinico:
      "Paciente relata estresse com prazos acadêmicos. Apresenta boa evolução com técnicas de respiração.",
    foto: "https://randomuser.me/api/portraits/men/10.jpg",
  },

].sort((a, b) => a.paciente.localeCompare(b.paciente));

const AGENDA_COMPLETA = [
  {
    id: "1",
    horario: "08:00",
    tipo: "Primeira Consulta",
    status: "Confirmado",
  },
  { id: "2", horario: "09:00", tipo: "Retorno", status: "Confirmado" },
  {
    id: "3",
    horario: "10:00",
    tipo: "Sessão de Terapia",
    status: "Confirmado",
  },
  { id: "4", horario: "11:00", tipo: "Sessão de Terapia", status: "Pendente" },
  { id: "5", horario: "13:00", tipo: "Retorno", status: "Confirmado" },
  { id: "6", horario: "14:00", tipo: "Primeira Consulta", status: "Pendente" },
  {
    id: "7",
    horario: "15:00",
    tipo: "Sessão de Terapia",
    status: "Confirmado",
  },
  { id: "8", horario: "16:00", tipo: "Retorno", status: "Confirmado" },
  {
    id: "9",
    horario: "17:00",
    tipo: "Sessão de Terapia",
    status: "Confirmado",
  },
  { id: "10", horario: "18:00", tipo: "Retorno", status: "Pendente" },
].map((item) => {
  const nomesAleatorios = [...BASE_COMPLETA_PACIENTES].sort(
    () => Math.random() - 0.5,
  );
  const pacienteAleatorio = nomesAleatorios[0];
  return {
    ...item,
    paciente: pacienteAleatorio.paciente,
    idade: pacienteAleatorio.idade,
    queixa: pacienteAleatorio.queixa,
    historicoClinico: pacienteAleatorio.historicoClinico,
    foto: pacienteAleatorio.foto,
  };
});

const AGENDAS_POR_DIA = {
  Amanhã: [
    { id: "h1", hora: "08:00", status: "Ocupado", paciente: "Gean Anderson" },
    {
      id: "h2",
      hora: "09:00",
      status: "Ocupado",
      paciente: "Guilherme Santos",
    },
    {
      id: "h3",
      hora: "10:00",
      status: "Ocupado",
      paciente: "Gustavo Henrique",
    },
    { id: "h4", hora: "11:00", status: "Ocupado", paciente: "Igor Miranda" },
    {
      id: "h5",
      hora: "12:00",
      status: "Bloqueado",
      paciente: "Almoço Clínico",
    },
    { id: "h6", hora: "13:00", status: "Ocupado", paciente: "José Matheus" },
    { id: "h7", hora: "14:00", status: "Ocupado", paciente: "Juliana Paiva" },
    { id: "h8", hora: "15:00", status: "Ocupado", paciente: "Larissa Manoela" },
    { id: "h9", hora: "16:00", status: "Ocupado", paciente: "Lucas Almeida" },
    { id: "h10", hora: "17:00", status: "Ocupado", paciente: "Marcos Gabriel" },
  ],
  Seg: [
    {
      id: "h1",
      hora: "08:00",
      status: "Bloqueado",
      paciente: "Reunião de Equipe",
    },
    { id: "h2", hora: "09:00", status: "Ocupado", paciente: "Maycon Mizael" },
    { id: "h3", hora: "10:00", status: "Ocupado", paciente: "Mariana Souza" },
    { id: "h4", hora: "11:00", status: "Ocupado", paciente: "Mateus Oliveira" },
    { id: "h5", hora: "12:00", status: "Ocupado", paciente: "Otávio Augusto" },
    { id: "h6", hora: "13:00", status: "Ocupado", paciente: "Pedro Carvalho" },
    { id: "h7", hora: "14:00", status: "Ocupado", paciente: "Rafael Ribeiro" },
    { id: "h8", hora: "15:00", status: "Ocupado", paciente: "Rodrigo Faro" },
    { id: "h9", hora: "16:00", status: "Ocupado", paciente: "Tássio Ivanil" },
    { id: "h10", hora: "17:00", status: "Ocupado", paciente: "Thiago Neves" },
  ],
  Ter: [
    { id: "h1", hora: "08:00", status: "Ocupado", paciente: "Victor Rennan" },
    {
      id: "h2",
      hora: "09:00",
      status: "Ocupado",
      paciente: "Vinicius Albuquerque",
    },
    { id: "h3", hora: "10:00", status: "Ocupado", paciente: "Wesley Oliveira" },
    { id: "h4", hora: "11:00", status: "Ocupado", paciente: "William Santos" },
    { id: "h5", hora: "12:00", status: "Ocupado", paciente: "Yago Bezerra" },
    { id: "h6", hora: "13:00", status: "Bloqueado", paciente: "Supervisão" },
    { id: "h7", hora: "14:00", status: "Ocupado", paciente: "Adriano Silva" },
    { id: "h8", hora: "15:00", status: "Ocupado", paciente: "Amanda Costa" },
    { id: "h9", hora: "16:00", status: "Ocupado", paciente: "Bruno Melo" },
    { id: "h10", hora: "17:00", status: "Ocupado", paciente: "Carlos Eduardo" },
  ],
  Qua: [
    { id: "h1", hora: "08:00", status: "Ocupado", paciente: "Daniela Freitas" },
    { id: "h2", hora: "09:00", status: "Ocupado", paciente: "Diego Antunes" },
    { id: "h3", hora: "10:00", status: "Ocupado", paciente: "Eduardo Rocha" },
    { id: "h4", hora: "11:00", status: "Ocupado", paciente: "Fernanda Lima" },
    { id: "h5", hora: "12:00", status: "Ocupado", paciente: "Gabriel Jesus" },
    { id: "h6", hora: "13:00", status: "Ocupado", paciente: "Gean Anderson" },
    {
      id: "h7",
      hora: "14:00",
      status: "Ocupado",
      paciente: "Guilherme Santos",
    },
    {
      id: "h8",
      hora: "15:00",
      status: "Ocupado",
      paciente: "Gustavo Henrique",
    },
    { id: "h9", hora: "16:00", status: "Disponível", paciente: "" },
    { id: "h10", hora: "17:00", status: "Ocupado", paciente: "Igor Miranda" },
  ],
};

const HISTORICO_FINANCEIRO = [
  {
    id: "f1",
    paciente: "Gean Anderson",
    data: "Hoje, 08:00",
    valor: "R$ 150,00",
    tipo: "Pix",
    status: "Recebido",
  },
  {
    id: "f2",
    paciente: "José Matheus",
    data: "Hoje, 09:00",
    valor: "R$ 120,00",
    tipo: "Cartão",
    status: "Recebido",
  },
  {
    id: "f3",
    paciente: "Marcos Gabriel",
    data: "Hoje, 10:00",
    valor: "R$ 120,00",
    tipo: "Pix",
    status: "Recebido",
  },
  {
    id: "f4",
    paciente: "Tássio Ivanil",
    data: "Hoje, 13:00",
    valor: "R$ 120,00",
    tipo: "Convênio",
    status: "Recebido",
  },
  {
    id: "f5",
    paciente: "Vinicius Albuquerque",
    data: "Ontem",
    valor: "R$ 120,00",
    tipo: "Pix",
    status: "Recebido",
  },
  {
    id: "f6",
    paciente: "Wesley Oliveira",
    data: "Ontem",
    valor: "R$ 120,00",
    tipo: "Cartão",
    status: "Recebido",
  },
  {
    id: "f7",
    paciente: "William Santos",
    data: "20 Mai",
    valor: "R$ 120,00",
    tipo: "Pix",
    status: "Recebido",
  },
];

export default function DashboardEspecialista() {
  const router = useRouter();

  useEffect(() => {
    if (Platform.OS === "android") {
      try {
        const NavigationBar = require("expo-navigation-bar");
        NavigationBar.setButtonStyleAsync("dark");
      } catch (e) {
        console.log("Erro ao carregar os modulos de navegacao");
      }
    }
  }, []);

  const [nomeEspecialista, setNomeEspecialista] = useState("Dr(a).");

  useEffect(() => {
    async function carregarEspecialista() {
      const nome = await getNomeUsuario();
      if (nome) setNomeEspecialista(nome);
    }
    carregarEspecialista();
  }, []);

  const [telaAtiva, setTelaAtiva] = useState<
    | "home"
    | "pacientes"
    | "presenca"
    | "prontuarios"
    | "horarios"
    | "financas"
    | "chats"
  >("home");
  const [expandido, setExpandido] = useState(false);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [pacienteSelecionado, setPacienteSelecionado] = useState<any>(null);
  const [modalMetricaVisivel, setModalMetricaVisivel] = useState(false);
  const [pesquisaProntuario, setPesquisaProntuario] = useState("");
  const [verHistoricoProntuario, setVerHistoricoProntuario] =
    useState<any>(null);
  const [diaSelecionado, setDiaSelecionado] = useState<
    "Amanhã" | "Seg" | "Ter" | "Qua"
  >("Amanhã");
  const [gradeHorarios, setGradeHorarios] = useState<any>(AGENDAS_POR_DIA);
  const [listaPresenca, setListaPresenca] = useState<any>(
    BASE_COMPLETA_PACIENTES,
  );

  const [pesquisaChat, setPesquisaChat] = useState("");

  const dadosAgenda = expandido ? AGENDA_COMPLETA : AGENDA_COMPLETA.slice(0, 3);
  const prontuariosFiltrados = BASE_COMPLETA_PACIENTES.filter((p) =>
    p.paciente.toLowerCase().includes(pesquisaProntuario.toLowerCase()),
  );

  const chatsFiltrados = BASE_COMPLETA_PACIENTES.filter((p) =>
    p.paciente.toLowerCase().includes(pesquisaChat.toLowerCase()),
  );

  const toggleExpandir = (valor: boolean) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandido(valor);
  };

  const handleTogglePresenca = (id: string) => {
    setListaPresenca((prev: any) =>
      prev.map((item: any) => {
        if (item.id === id) {
          return {
            ...item,
            status: item.status === "Confirmado" ? "Pendente" : "Confirmado",
          };
        }
        return item;
      }),
    );
  };

  const handleToggleHorario = (id: string) => {
    setGradeHorarios((prev: any) => ({
      ...prev,
      [diaSelecionado]: prev[diaSelecionado].map((item: any) => {
        if (item.id === id) {
          if (item.status === "Disponível") {
            return {
              ...item,
              status: "Bloqueado",
              paciente: "Intervalo Clínico",
            };
          } else if (item.status === "Bloqueado") {
            return { ...item, status: "Disponível", paciente: "" };
          }
        }
        return item;
      }),
    }));
  };

  const horariosExibidos = gradeHorarios[diaSelecionado] || [];

  return (
    <View style={styles.masterContainer}>
      <StatusBar style="light" backgroundColor="#000000" />

      <SafeAreaView
        style={styles.container}
        edges={["right", "left"]}
      >
        <View style={styles.header}>
          {telaAtiva === "home" ? (
            <View>
              <Text style={styles.welcomeText}>Olá, {nomeEspecialista}</Text>
              <Text style={styles.doctorName}>Painel Clínico</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.backHeaderButton}
              onPress={() => setTelaAtiva("home")}
            >
              <Feather name="arrow-left" size={24} color="#FFFFFF" />
              <Text style={styles.doctorNameHeader}>
                {telaAtiva === "pacientes" && "Meus Pacientes"}
                {telaAtiva === "presenca" && "Controle de Presença"}
                {telaAtiva === "prontuarios" && "Prontuários"}
                {telaAtiva === "horarios" && "Meus Horários"}
                {telaAtiva === "financas" && "Finanças Clínicas"}
                {telaAtiva === "chats" && "Conversas"}
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={async () => {
              Alert.alert("Confirmar saída", "Deseja realmente sair?", [
                { text: "Cancelar", style: "cancel" },
                {
                  text: "Sim",
                  onPress: async () => {
                    await logout();
                    router.replace("/");
                  },
                },
              ]);
            }}
          >
            <Feather name="log-out" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {telaAtiva === "home" && (
            <>
              <View style={styles.metricsContainer}>
                <TouchableOpacity
                  style={styles.metricCard}
                  onPress={() => setModalMetricaVisivel(true)}
                  activeOpacity={0.7}
                >
                  <Feather name="calendar" size={20} color="#00BFA5" />
                  <Text style={styles.metricValue}>
                    {AGENDA_COMPLETA.length}
                  </Text>
                  <Text style={styles.metricLabel}>Sessões de hoje</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.metricCard}
                  onPress={() => setTelaAtiva("pacientes")}
                  activeOpacity={0.7}
                >
                  <Feather name="users" size={20} color="#00238e" />
                  <Text style={styles.metricValue}>
                    {BASE_COMPLETA_PACIENTES.length}
                  </Text>
                  <Text style={styles.metricLabel}>Pacientes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.metricCard}
                  onPress={() => setTelaAtiva("presenca")}
                  activeOpacity={0.7}
                >
                  <Feather name="trending-up" size={20} color="#FF9100" />
                  <Text style={styles.metricValue}>96%</Text>
                  <Text style={styles.metricLabel}>Presença</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.sectionTitle}>Ações Rápidas</Text>
              <View style={styles.actionsGrid}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => setTelaAtiva("prontuarios")}
                >
                  <View
                    style={[styles.iconCircle, { backgroundColor: "#E0F2F1" }]}
                  >
                    <Feather name="file-text" size={20} color="#00BFA5" />
                  </View>
                  <Text style={styles.actionText}>Prontuários</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => setTelaAtiva("horarios")}
                >
                  <View
                    style={[styles.iconCircle, { backgroundColor: "#E8EAF6" }]}
                  >
                    <Feather name="clock" size={20} color="#00238e" />
                  </View>
                  <Text style={styles.actionText}>Meus Horários</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => setTelaAtiva("financas")}
                >
                  <View
                    style={[styles.iconCircle, { backgroundColor: "#FFF3E0" }]}
                  >
                    <Feather name="dollar-sign" size={20} color="#FF9100" />
                  </View>
                  <Text style={styles.actionText}>Finanças</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.agendaWrapper}>
                <View style={styles.agendaHeader}>
                  <Text style={styles.agendaSectionTitle}>Agenda de Hoje</Text>
                  <View style={styles.countBadge}>
                    <Text style={styles.countIndicator}>
                      {dadosAgenda.length}/{AGENDA_COMPLETA.length}
                    </Text>
                  </View>
                </View>
                <FlatList
                  data={dadosAgenda}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingBottom: 48,
                  }}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.appointmentCard}
                      onPress={() => {
                        setPacienteSelecionado(item);
                        setModalVisivel(true);
                      }}
                      activeOpacity={0.7}
                    >
                      <View style={styles.cardHeaderRow}>
                        <View style={styles.appointmentInfo}>
                          <Feather
                            name="clock"
                            size={15}
                            color="#00BFA5"
                            style={{ marginRight: 6 }}
                          />
                          <Text style={styles.appointmentTime}>
                            {item.horario}
                          </Text>
                          <Text style={styles.appointmentPatient}>
                            {" "}
                            - {item.paciente}
                          </Text>
                        </View>
                        <View
                          style={[
                            styles.statusTag,
                            {
                              backgroundColor:
                                item.status === "Confirmado"
                                  ? "#E0F2F1"
                                  : "#FFEBEE",
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.statusText,
                              {
                                color:
                                  item.status === "Confirmado"
                                    ? "#00BFA5"
                                    : "#D32F2F",
                              },
                            ]}
                          >
                            {item.status}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.appointmentType}>{item.tipo}</Text>
                    </TouchableOpacity>
                  )}
                  ListFooterComponent={
                    !expandido ? (
                      <TouchableOpacity
                        style={styles.toggleAgendaButton}
                        onPress={() => toggleExpandir(true)}
                      >
                        <Text style={styles.toggleAgendaText}>
                          Mostrar agenda completa
                        </Text>
                        <Feather
                          name="chevron-down"
                          size={16}
                          color="#00238e"
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={styles.toggleAgendaButton}
                        onPress={() => toggleExpandir(false)}
                      >
                        <Text
                          style={[
                            styles.toggleAgendaText,
                            { color: "#D32F2F" },
                          ]}
                        >
                          Recolher agenda
                        </Text>
                        <Feather name="chevron-up" size={16} color="#D32F2F" />
                      </TouchableOpacity>
                    )
                  }
                />
              </View>
            </>
          )}

          {telaAtiva === "pacientes" && (
            <View style={{ flex: 1 }}>
              <FlatList
                data={BASE_COMPLETA_PACIENTES}
                keyExtractor={(item) => "p-" + item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
                renderItem={({ item }) => (
                  <View style={styles.prontuarioCard}>
                    <View style={styles.prontuarioMainInfo}>
                      <Text style={styles.prontuarioPatientName}>
                        {item.paciente}
                      </Text>
                      <Text style={styles.prontuarioPatientAge}>
                        Idade: {item.idade}
                      </Text>
                    </View>
                  </View>
                )}
              />
            </View>
          )}

          {telaAtiva === "presenca" && (
            <View style={{ flex: 1 }}>
              <FlatList
                data={listaPresenca}
                keyExtractor={(item) => "pr-" + item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
                renderItem={({ item }) => (
                  <View style={styles.prontuarioCard}>
                    <View style={styles.prontuarioMainInfo}>
                      <Text style={styles.prontuarioPatientName}>
                        {item.paciente}
                      </Text>
                      <TouchableOpacity
                        style={[
                          styles.statusTag,
                          {
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 4,
                            borderWidth: 1,
                            borderColor:
                              item.status === "Confirmado"
                                ? "#00BFA5"
                                : "#D32F2F",
                            backgroundColor:
                              item.status === "Confirmado"
                                ? "#E0F2F1"
                                : "#FFEBEE",
                          },
                        ]}
                        onPress={() => handleTogglePresenca(item.id)}
                        activeOpacity={0.7}
                      >
                        <Feather
                          name={
                            item.status === "Confirmado"
                              ? "check-circle"
                              : "x-circle"
                          }
                          size={13}
                          color={
                            item.status === "Confirmado" ? "#00BFA5" : "#D32F2F"
                          }
                        />
                        <Text
                          style={[
                            styles.statusText,
                            {
                              color:
                                item.status === "Confirmado"
                                  ? "#00BFA5"
                                  : "#D32F2F",
                            },
                          ]}
                        >
                          {item.status === "Confirmado" ? "Presente" : "Faltou"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            </View>
          )}

          {telaAtiva === "prontuarios" && (
            <View style={{ flex: 1 }}>
              <View style={styles.searchContainer}>
                <Feather
                  name="search"
                  size={18}
                  color="#94A3B8"
                  style={{ marginRight: 8 }}
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Buscar paciente pelo nome..."
                  placeholderTextColor="#94A3B8"
                  value={pesquisaProntuario}
                  onChangeText={setPesquisaProntuario}
                />
              </View>
              <FlatList
                data={prontuariosFiltrados}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
                renderItem={({ item }) => (
                  <View style={styles.prontuarioCard}>
                    <View style={styles.prontuarioMainInfo}>
                      <Text style={styles.prontuarioPatientName}>
                        {item.paciente}
                      </Text>
                      <Text style={styles.prontuarioPatientAge}>
                        Idade: {item.idade}
                      </Text>
                    </View>
                    {verHistoricoProntuario === item.id ? (
                      <View style={styles.historicoExpandidoBox}>
                        <Text style={styles.historicoTitle}>
                          Evolução Clínica Recente:
                        </Text>
                        <Text style={styles.historicoText}>
                          {item.historicoClinico}
                        </Text>
                        <TouchableOpacity
                          style={styles.fecharProntuarioBtn}
                          onPress={() => setVerHistoricoProntuario(null)}
                        >
                          <Text style={styles.fecharProntuarioBtnText}>
                            Fechar Prontuário
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={styles.abrirProntuarioBtn}
                        onPress={() => setVerHistoricoProntuario(item.id)}
                      >
                        <Feather
                          name="folder"
                          size={16}
                          color="#00238e"
                          style={{ marginRight: 6 }}
                        />
                        <Text style={styles.abrirProntuarioBtnText}>
                          Acessar Prontuário
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              />
            </View>
          )}

          {telaAtiva === "horarios" && (
            <View style={{ flex: 1 }}>
              <View style={styles.daysContainer}>
                {(["Amanhã", "Seg", "Ter", "Qua"] as const).map((dia) => (
                  <TouchableOpacity
                    key={dia}
                    style={[
                      styles.dayButton,
                      diaSelecionado === dia && styles.dayButtonActive,
                    ]}
                    onPress={() => setDiaSelecionado(dia)}
                  >
                    <Text
                      style={[
                        styles.dayButtonText,
                        diaSelecionado === dia && styles.dayButtonTextActive,
                      ]}
                    >
                      {dia}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.helperText}>
                Toque nos horários vagos para bloquear/liberar atendimentos.
              </Text>
              <FlatList
                data={horariosExibidos}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 30 }}
                renderItem={({ item }) => (
                  <View style={styles.rowHorario}>
                    <Text style={styles.horaLabel}>{item.hora}</Text>
                    <TouchableOpacity
                      style={[
                        styles.statusBoxHorario,
                        item.status === "Ocupado" && styles.boxOcupado,
                        item.status === "Disponível" && styles.boxDisponivel,
                        item.status === "Bloqueado" && styles.boxBloqueado,
                      ]}
                      onPress={() => handleToggleHorario(item.id)}
                      disabled={item.status === "Ocupado"}
                    >
                      <View style={styles.statusBoxFlex}>
                        <Text
                          style={[
                            styles.statusBoxText,
                            item.status === "Ocupado" && styles.txtOcupado,
                            item.status === "Disponível" &&
                              styles.txtDisponivel,
                            item.status === "Bloqueado" && styles.txtBloqueado,
                          ]}
                        >
                          {item.status === "Ocupado"
                            ? `Sessão: ${item.paciente}`
                            : item.status}
                        </Text>
                        {item.status !== "Ocupado" && (
                          <Feather
                            name={
                              item.status === "Disponível" ? "unlock" : "lock"
                            }
                            size={14}
                            color={
                              item.status === "Disponível"
                                ? "#00BFA5"
                                : "#D32F2F"
                            }
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          )}

          {telaAtiva === "financas" && (
            <View style={{ flex: 1 }}>
              <View style={styles.financesSummaryContainer}>
                <View style={[styles.financeCard, { borderColor: "#00BFA5" }]}>
                  <Text style={styles.financeCardLabel}>Faturamento Maio</Text>
                  <Text style={[styles.financeCardValue, { color: "#00BFA5" }]}>
                    R$ 4.850,00
                  </Text>
                </View>
                <View style={[styles.financeCard, { borderColor: "#FF9100" }]}>
                  <Text style={styles.financeCardLabel}>
                    A Receber (Pendentes)
                  </Text>
                  <Text style={[styles.financeCardValue, { color: "#FF9100" }]}>
                    R$ 360,00
                  </Text>
                </View>
              </View>
              <View style={styles.chartSimulationBox}>
                <View style={styles.chartHeaderRow}>
                  <Text style={styles.chartTitle}>
                    Meta Mensal de Atendimentos
                  </Text>
                  <Text style={styles.chartPercentText}>85% Concluído</Text>
                </View>
                <View style={styles.progressBarBackground}>
                  <View style={styles.progressBarFill} />
                </View>
              </View>
              <Text style={styles.sectionTitle}>Últimos Recebimentos</Text>
              <FlatList
                data={HISTORICO_FINANCEIRO}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 24 }}
                renderItem={({ item }) => (
                  <View style={styles.transactionCard}>
                    <View style={styles.transactionLeft}>
                      <View style={styles.iconFinanceCircle}>
                        <Feather
                          name="arrow-down-left"
                          size={16}
                          color="#00BFA5"
                        />
                      </View>
                      <View>
                        <Text style={styles.transactionName}>
                          {item.paciente}
                        </Text>
                        <Text style={styles.transactionMeta}>
                          {item.data} • {item.tipo}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.transactionRight}>
                      <Text style={styles.transactionValue}>{item.valor}</Text>
                      <Text style={styles.transactionStatusText}>
                        {item.status}
                      </Text>
                    </View>
                  </View>
                )}
              />
            </View>
          )}

          {telaAtiva === "chats" && (
            <View style={{ flex: 1 }}>
              <View style={styles.searchContainer}>
                <Feather
                  name="search"
                  size={18}
                  color="#94A3B8"
                  style={{ marginRight: 8 }}
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Buscar conversa pelo nome..."
                  placeholderTextColor="#94A3B8"
                  value={pesquisaChat}
                  onChangeText={setPesquisaChat}
                />
              </View>
              <FlatList
                data={chatsFiltrados}
                keyExtractor={(item) => "chat-" + item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.chatListItem}
                    activeOpacity={0.7}
                    onPress={() => {
                      router.push(
                        `/chat/chat?chatId=${item.id}&nome=${encodeURIComponent(item.paciente)}&foto=${encodeURIComponent(item.foto)}`,
                      );
                    }}
                  >
                    <View style={styles.chatAvatar}>
                      {item.foto ? (
                        <Image
                          source={{ uri: item.foto }}
                          style={styles.chatAvatarImage}
                        />
                      ) : (
                        <Text style={styles.chatAvatarText}>
                          {item.paciente
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </Text>
                      )}
                    </View>
                    <View style={styles.chatInfoBox}>
                      <View style={styles.cardHeaderRow}>
                        <Text style={styles.chatPatientName} numberOfLines={1}>
                          {item.paciente}
                        </Text>
                        <Text style={styles.chatTimeText}>14:32</Text>
                      </View>
                      <Text style={styles.chatLastMessage} numberOfLines={1}>
                        Olá, Dr. Segue as anotações sobre a queixa: "
                        {item.queixa}"
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </View>

        <View style={styles.bottomTabBar}>
          <TouchableOpacity
            style={styles.tabBarButton}
            onPress={() => setTelaAtiva("home")}
          >
            <Feather
              name="home"
              size={22}
              color={telaAtiva === "home" ? "#00BFA5" : "#94A3B8"}
            />
            <Text
              style={[
                styles.tabBarText,
                { color: telaAtiva === "home" ? "#00BFA5" : "#94A3B8" },
              ]}
            >
              Início
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabBarButton}
            onPress={() => setTelaAtiva("chats")}
          >
            <Feather
              name="message-square"
              size={22}
              color={telaAtiva === "chats" ? "#00BFA5" : "#94A3B8"}
            />
            <Text
              style={[
                styles.tabBarText,
                { color: telaAtiva === "chats" ? "#00BFA5" : "#94A3B8" },
              ]}
            >
              Chats
            </Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalMetricaVisivel}
          onRequestClose={() => setModalMetricaVisivel(false)}
        >
          <TouchableWithoutFeedback
            onPress={() => setModalMetricaVisivel(false)}
          >
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContainer}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>
                      Status dos Atendimentos
                    </Text>
                    <TouchableOpacity
                      onPress={() => setModalMetricaVisivel(false)}
                    >
                      <Feather name="x" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.modalBody}>
                    <Text style={styles.modalPatientName}>Resumo de Hoje</Text>
                    <View style={styles.statusReportContainer}>
                      <View style={styles.statusReportRow}>
                        <View
                          style={[
                            styles.statusDot,
                            { backgroundColor: "#00BFA5" },
                          ]}
                        />
                        <Text style={styles.statusReportLabel}>
                          Sessões Confirmadas:
                        </Text>
                        <Text style={styles.statusReportValue}>
                          7 pacientes
                        </Text>
                      </View>
                      <View style={styles.statusReportRow}>
                        <View
                          style={[
                            styles.statusDot,
                            { backgroundColor: "#FF9100" },
                          ]}
                        />
                        <Text style={styles.statusReportLabel}>
                          Sessões Pendentes:
                        </Text>
                        <Text style={styles.statusReportValue}>
                          3 pacientes
                        </Text>
                      </View>
                      <View style={styles.statusReportRow}>
                        <View
                          style={[
                            styles.statusDot,
                            { backgroundColor: "#E2E8F0" },
                          ]}
                        />
                        <Text style={styles.statusReportLabel}>
                          Horários Bloqueados:
                        </Text>
                        <Text style={styles.statusReportValue}>
                          2 intervalos
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={[
                        styles.modalActionButtonPrimary,
                        { backgroundColor: "#00BFA5" },
                      ]}
                      onPress={() => setModalMetricaVisivel(false)}
                    >
                      <Text
                        style={[
                          styles.modalActionButtonText,
                          { color: "#ffffff" },
                        ]}
                      >
                        Entendido
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisivel}
          onRequestClose={() => setModalVisivel(false)}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisivel(false)}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContainer}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>
                      Detalhes do Agendamento
                    </Text>
                    <TouchableOpacity onPress={() => setModalVisivel(false)}>
                      <Feather name="x" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                  {pacienteSelecionado && (
                    <View style={styles.modalBody}>
                      <Text style={styles.modalPatientName}>
                        {pacienteSelecionado.paciente}
                      </Text>
                      <Text style={styles.modalPatientMeta}>
                        Idade: {pacienteSelecionado.idade} | Horário:{" "}
                        {pacienteSelecionado.horario}
                      </Text>
                      <View style={styles.infoBox}>
                        <Text style={styles.infoBoxTitle}>
                          Última queixa / Observações:
                        </Text>
                        <Text style={styles.infoBoxText}>
                          {pacienteSelecionado.queixa}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={[
                          styles.modalActionButtonPrimary,
                          { backgroundColor: "#00BFA5" },
                        ]}
                        onPress={() => {
                          setModalVisivel(false);
                          router.push(
                            `/chat/chat?chatId=${pacienteSelecionado.chatId}&nome=${encodeURIComponent(pacienteSelecionado.paciente)}&foto=${encodeURIComponent(pacienteSelecionado.foto)}`,
                          );
                        }}
                      >
                        <Feather
                          name="message-square"
                          size={18}
                          color="#ffffff"
                          style={{ marginRight: 8 }}
                        />
                        <Text
                          style={[
                            styles.modalActionButtonText,
                            { color: "#ffffff" },
                          ]}
                        >
                          Abrir Chat com Paciente
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.modalActionButtonSecondary,
                          {
                            backgroundColor: "#ffffff",
                            borderColor: "#ffffff",
                          },
                        ]}
                        onPress={() => {
                          setModalVisivel(false);
                          setTelaAtiva("prontuarios");
                          setVerHistoricoProntuario(pacienteSelecionado.id);
                        }}
                      >
                        <Feather
                          name="edit-3"
                          size={18}
                          color="#00BFA5"
                          style={{ marginRight: 8 }}
                        />
                        <Text
                          style={[
                            styles.modalActionButtonText,
                            { color: "#00BFA5" },
                          ]}
                        >
                          Ir para o Prontuário
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  masterContainer: { flex: 1, backgroundColor: "#F1F5F9" },
  container: { flex: 1, backgroundColor: "#000000" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: "#00BFA5",
  },
  welcomeText: { fontSize: 14, color: "#ffffff", opacity: 0.8 },
  doctorName: { fontSize: 24, fontWeight: "900", color: "#ffffff" },
  logoutButton: {
    padding: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 8,
  },
  content: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 22,
  },
  metricCard: {
    backgroundColor: "#F8FAFC",
    width: "30%",
    padding: 12,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  metricValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E293B",
    marginTop: 6,
  },
  metricLabel: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 2,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 12,
  },
  actionsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  actionButton: {
    backgroundColor: "#F8FAFC",
    width: "30%",
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: { fontSize: 12, fontWeight: "600", color: "#475569" },
  agendaWrapper: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    marginHorizontal: -24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  agendaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 16,
    marginBottom: 12,
  },
  agendaSectionTitle: { fontSize: 16, fontWeight: "700", color: "#334155" },
  countBadge: {
    backgroundColor: "#E2E8F0",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  countIndicator: { fontSize: 11, color: "#475569", fontWeight: "700" },
  appointmentCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#00BFA5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  appointmentInfo: { flexDirection: "row", alignItems: "center" },
  appointmentTime: { fontWeight: "bold", color: "#00BFA5", fontSize: 14 },
  appointmentPatient: { fontWeight: "700", color: "#1E293B", fontSize: 14 },
  appointmentType: { fontSize: 13, color: "#64748B", marginLeft: 21 },
  statusTag: { paddingVertical: 3, paddingHorizontal: 8, borderRadius: 8 },
  statusText: { fontSize: 11, fontWeight: "700" },
  toggleAgendaButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    gap: 6,
  },
  toggleAgendaText: {
    fontSize: 14,
    color: "#00238e",
    fontWeight: "700",
    textAlign: "center",
  },
  emptyText: {
    textAlign: "center",
    color: "#94A3B8",
    marginTop: 30,
    fontStyle: "italic",
  },
  backHeaderButton: { flexDirection: "row", alignItems: "center", gap: 12 },
  doctorNameHeader: { fontSize: 22, fontWeight: "900", color: "#ffffff" },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 46,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  searchInput: { flex: 1, color: "#1E293B", fontSize: 14, fontWeight: "500" },
  prontuarioCard: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  prontuarioMainInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  prontuarioPatientName: { fontSize: 16, fontWeight: "700", color: "#1E293B" },
  prontuarioPatientAge: { fontSize: 13, color: "#64748B", fontWeight: "600" },
  abrirProntuarioBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8EAF6",
    height: 38,
    borderRadius: 10,
  },
  abrirProntuarioBtnText: { color: "#00238e", fontSize: 13, fontWeight: "700" },
  historicoExpandidoBox: {
    marginTop: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 14,
  },
  historicoTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#475569",
    marginBottom: 4,
  },
  historicoText: {
    fontSize: 14,
    color: "#334155",
    lineHeight: 20,
    marginBottom: 12,
  },
  fecharProntuarioBtn: {
    backgroundColor: "#FFEBEE",
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  fecharProntuarioBtnText: {
    color: "#D32F2F",
    fontSize: 12,
    fontWeight: "700",
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  dayButton: {
    backgroundColor: "#F1F5F9",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    minWidth: 60,
    alignItems: "center",
  },
  dayButtonActive: { backgroundColor: "#00BFA5" },
  dayButtonText: { fontSize: 13, fontWeight: "700", color: "#475569" },
  dayButtonTextActive: { color: "#FFFFFF" },
  helperText: {
    fontSize: 12,
    color: "#64748B",
    fontStyle: "italic",
    marginBottom: 16,
  },
  rowHorario: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 14,
  },
  horaLabel: { fontSize: 15, fontWeight: "700", color: "#334155" },
  statusBoxHorario: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: "center",
    borderWidth: 1,
  },
  statusBoxFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusBoxText: { fontSize: 14, fontWeight: "600" },
  boxOcupado: { backgroundColor: "#E8EAF6", borderColor: "#C5CAE9" },
  boxDisponivel: { backgroundColor: "#E0F2F1", borderColor: "#B2DFDB" },
  boxBloqueado: { backgroundColor: "#FFEBEE", borderColor: "#FFCDD2" },
  txtOcupado: { color: "#00238e", fontWeight: "700" },
  txtDisponivel: { color: "#00BFA5" },
  txtBloqueado: { color: "#D32F2F" },
  financesSummaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  financeCard: {
    backgroundColor: "#F8FAFC",
    width: "48%",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
  },
  financeCardLabel: { fontSize: 12, fontWeight: "600", color: "#64748B" },
  financeCardValue: { fontSize: 18, fontWeight: "800", marginTop: 4 },
  chartSimulationBox: {
    backgroundColor: "#F8FAFC",
    width: "100%",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  chartHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  chartTitle: { fontSize: 13, fontWeight: "700", color: "#334155" },
  chartPercentText: { fontSize: 13, fontWeight: "700", color: "#00238e" },
  progressBarBackground: {
    height: 10,
    backgroundColor: "#E2E8F0",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    width: "85%",
    backgroundColor: "#00238e",
    borderRadius: 5,
  },
  transactionCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F1F5F9",
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 2,
    elevation: 1,
  },
  transactionLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconFinanceCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#E0F2F1",
    justifyContent: "center",
    alignItems: "center",
  },
  transactionName: { fontSize: 14, fontWeight: "700", color: "#1E293B" },
  transactionMeta: { fontSize: 12, color: "#64748B", marginTop: 2 },
  transactionRight: { alignItems: "flex-end" },
  transactionValue: { fontSize: 14, fontWeight: "700", color: "#1E293B" },
  transactionStatusText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#00BFA5",
    marginTop: 2,
    textTransform: "uppercase",
  },
  statusReportContainer: { marginVertical: 22, gap: 14 },
  statusReportRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  statusDot: { width: 10, height: 10, borderRadius: 5 },
  statusReportLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    flex: 1,
  },
  statusReportValue: { fontSize: 14, fontWeight: "700", color: "#00BFA5" },
  infoBox: {
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    padding: 16,
    borderRadius: 12,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  infoBoxTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#00BFA5",
    marginBottom: 6,
  },
  infoBoxText: { fontSize: 14, color: "#FFFFFF", lineHeight: 20 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#00238e",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 32,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    paddingBottom: 12,
  },
  modalTitle: { fontSize: 16, fontWeight: "700", color: "#00BFA5" },
  modalBody: { marginTop: 16 },
  modalPatientName: { fontSize: 22, fontWeight: "900", color: "#FFFFFF" },
  modalPatientMeta: {
    fontSize: 14,
    color: "#E2E8F0",
    marginTop: 4,
    opacity: 0.9,
  },
  modalActionButtonPrimary: {
    backgroundColor: "#00BFA5",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    borderRadius: 12,
    marginBottom: 12,
  },
  modalActionButtonSecondary: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#00BFA5",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    borderRadius: 12,
  },
  modalActionButtonText: { fontSize: 15, fontWeight: "700" },

  bottomTabBar: {
    flexDirection: "row",
    height: 64,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderColor: "#E2E8F0",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: Platform.OS === "ios" ? 14 : 0,
  },
  tabBarButton: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  tabBarText: {
    fontSize: 11,
    fontWeight: "700",
    marginTop: 4,
  },
  chatListItem: {
    flexDirection: "row",
    backgroundColor: "#F8FAFC",
    padding: 14,
    borderRadius: 16,
    marginBottom: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  chatAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#E0F2F1",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  chatAvatarText: {
    color: "#00BFA5",
    fontWeight: "bold",
    fontSize: 14,
  },
  chatAvatarImage: {
    width: 46,
    height: 46,
    borderRadius: 23,
    resizeMode: "cover",
  },
  chatInfoBox: {
    flex: 1,
  },
  chatPatientName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E293B",
    flex: 1,
  },
  chatTimeText: {
    fontSize: 11,
    color: "#94A3B8",
    fontWeight: "600",
  },
  chatLastMessage: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 4,
  },
});
