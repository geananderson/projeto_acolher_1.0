import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import api from './api';

export async function getIdUsuarioLogado() {
  try {
    const response = await api.get('/cadastros');
    const token = await AsyncStorage.getItem('token');
    if (!token) return null;
    const decoded: any = jwtDecode(token);
    const email = decoded.sub;
    const usuario = response.data.content.find((u: any) => u.email === email);
    return usuario?.id || null;
  } catch {
    return null;
  }
}

export async function getNomeUsuario() {
  try {
    const response = await api.get('/cadastros');
    const token = await AsyncStorage.getItem('token');
    if (!token) return null;
    const decoded: any = jwtDecode(token);
    const email = decoded.sub;
    const usuario = response.data.content.find((u: any) => u.email === email);
    return usuario?.nomeCompleto || email;
  } catch {
    return null;
  }
}

export async function getTipoUsuario() {
  try {
    const response = await api.get('/cadastros');
    const token = await AsyncStorage.getItem('token');
    if (!token) return null;
    const decoded: any = jwtDecode(token);
    const email = decoded.sub;
    const usuario = response.data.content.find((u: any) => u.email === email);
    return usuario?.tipo || null;
  } catch {
    return null;
  }
}

export async function getIdEspecialistaLogado() {
  try {
    const response = await api.get('/especialistas');
    const token = await AsyncStorage.getItem('token');
    if (!token) return null;
    const decoded: any = jwtDecode(token);
    const email = decoded.sub;
    const usuario = await api.get('/cadastros');
    const usuarioLogado = usuario.data.content.find((u: any) => u.email === email);
    if (!usuarioLogado) return null;
    const especialista = response.data.content.find((e: any) => e.usuarioId === usuarioLogado.id);
    return especialista?.id || null;
  } catch {
    return null;
  }
}