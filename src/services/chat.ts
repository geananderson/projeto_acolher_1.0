import api from './api';

export async function listarEspecialistas() {
  const response = await api.get('/especialistas');
  return response.data.content;
}
export async function listarChatsPorEspecialista(especialistaId: number) {
  const response = await api.get(`/chats?especialistaId=${especialistaId}`);
  return response.data.content;
}

export async function criarChat(usuarioId: number, especialistaId: number) {
  const response = await api.post('/chats', {
    usuarioId,
    especialistaId,
    prioridade: 'media'
  });
  return response.data;
}

export async function listarMensagensPorChat(chatId: number) {
  const response = await api.get(`/mensagens/por-chat/${chatId}`);
  return response.data;
}

export async function enviarMensagem(dados: {
  autorId: number;
  chatId: number;
  conteudoTexto: string;
  tipoMidia: string;
}) {
  const response = await api.post('/mensagens', dados);
  return response.data;
}

export async function listarMensagens() {
  const response = await api.get('/mensagens');
  return response.data.content;
}
