import { useEffect, useState } from 'react';
import { chatService } from '../../services/chatService';

const ChatNotifications = ({ user }) => {
  const [conversaciones, setConversaciones] = useState([]);
  const [mensajes, setMensajes] = useState([]);
  const [chatAbierto, setChatAbierto] = useState(null);

  useEffect(() => {
    if (!user) return;
    // Si es admin, ver todas. Si es cliente, solo las suyas
    chatService.listarConversaciones(user.rol === 'admin' ? null : user.id_cliente)
      .then(setConversaciones);
  }, [user]);

  const abrirChat = async (id_conversacion) => {
    setChatAbierto(id_conversacion);
    const mensajes = await chatService.listarMensajes(id_conversacion);
    setMensajes(mensajes);
    // Marcar como leídos los mensajes recibidos
    chatService.marcarLeidos(id_conversacion, user.rol);
  };

  return (
    <div>
      <h2>Notificaciones de Chat</h2>
      <ul>
        {conversaciones.map(conv => (
          <li key={conv.id_conversacion}>
            <button onClick={() => abrirChat(conv.id_conversacion)}>
              Chat cliente #{conv.id_usuario_cliente}
            </button>
          </li>
        ))}
      </ul>
      {chatAbierto && (
        <div>
          <h3>Conversación</h3>
          <div style={{ maxHeight: 300, overflowY: 'auto', border: '1px solid #ccc', padding: 8 }}>
            {mensajes.map(msg => (
              <div key={msg.id_mensaje} style={{ textAlign: msg.remitente === user.rol ? 'right' : 'left' }}>
                <b>{msg.remitente}:</b> {msg.mensaje}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatNotifications;
