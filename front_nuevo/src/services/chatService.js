import { apiService } from './api';

export const chatService = {
  async crearConversacion(id_usuario_cliente) {
    return apiService.post('/chat/conversacion', { id_usuario_cliente });
  },
  async enviarMensaje({ id_conversacion, remitente, mensaje }) {
    return apiService.post('/chat/mensaje', { id_conversacion, remitente, mensaje });
  },
  async listarConversaciones(id_usuario_cliente = null) {
    let url = '/chat/conversaciones';
    if (id_usuario_cliente) url += `?id_usuario_cliente=${id_usuario_cliente}`;
    return apiService.get(url);
  },
  async listarMensajes(id_conversacion) {
    return apiService.get(`/chat/mensajes/${id_conversacion}`);
  },
  async marcarLeidos(id_conversacion, remitente) {
    return apiService.post(`/chat/marcar_leidos/${id_conversacion}?remitente=${remitente}`);
  }
};
