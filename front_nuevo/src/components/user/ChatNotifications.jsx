import { chatService } from '../../services/chatService';
import { useEffect, useState, useRef } from 'react';

const ChatNotifications = ({ user }) => {
  const [conversaciones, setConversaciones] = useState([]);
  const [mensajes, setMensajes] = useState([]);
  const [chatAbierto, setChatAbierto] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const chatBoxRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (!user) return;
    const fetchData = () => {
      chatService.listarConversaciones(user.rol === 'admin' ? null : user.id_cliente, user.rol)
        .then(data => {
          setConversaciones(data);
          // Sumar todos los no_leidos de cada conversación
          const totalNoLeidos = data.reduce((acc, conv) => acc + (conv.no_leidos || 0), 0);
          setUnreadCount(totalNoLeidos);
        });
    };
    fetchData();
    const interval = setInterval(fetchData, 5000); // Actualiza cada 5 segundos
    return () => clearInterval(interval);
  }, [user]);

  const abrirChat = async (id_conversacion) => {
    setChatAbierto(id_conversacion);
    const mensajes = await chatService.listarMensajes(id_conversacion);
    setMensajes(mensajes);
    await chatService.marcarLeidos(id_conversacion, user.rol);
  };

  const enviarMensaje = async (e) => {
    e.preventDefault();
    if (!nuevoMensaje.trim()) return;
    // Normalizar el remitente para que siempre sea 'cliente' o 'admin'
    const remitente = user.rol && user.rol.toLowerCase() === 'admin' ? 'admin' : 'cliente';
    await chatService.enviarMensaje({
      id_conversacion: chatAbierto,
      remitente,
      mensaje: nuevoMensaje
    });
    setNuevoMensaje('');
    // Refrescar mensajes
    const mensajes = await chatService.listarMensajes(chatAbierto);
    setMensajes(mensajes);
  };

  useEffect(() => {
    if (chatBoxRef.current && chatEndRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [mensajes]);

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4 text-primary">
        Notificaciones de Chat
        <span className="bg-accent text-white rounded-full px-2 py-1 text-xs ml-2">
          {unreadCount}
        </span>
      </h2>
      <ul className="mb-4 space-y-2">
        {conversaciones.map(conv => (
          <li key={conv.id_conversacion} className="relative">
            <button
              onClick={() => abrirChat(conv.id_conversacion)}
              className={`w-full text-left px-4 py-2 rounded-lg border border-neutral-200 shadow-sm hover:bg-primary/10 transition-colors ${chatAbierto === conv.id_conversacion ? 'bg-primary/10 border-primary' : ''}`}
            >
              <span className="font-semibold text-primary">
                {conv.nombre_cliente ? conv.nombre_cliente : `Chat cliente #${conv.id_usuario_cliente}`}
              </span>
              {conv.no_leidos > 0 && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-accent text-white rounded-full px-2 py-1 text-xs ml-2">
                  {conv.no_leidos}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
      {chatAbierto && (
        <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
          <h3 className="text-lg font-bold mb-2 text-accent">Conversación</h3>
          <div
            className="space-y-2 max-h-64 overflow-y-auto mb-2"
            ref={chatBoxRef}
          >
            {mensajes.length === 0 && (
              <div className="text-center text-neutral-400 py-8">
                No hay mensajes en esta conversación.
              </div>
            )}
            {mensajes
              .filter(msg => typeof msg === 'object' && msg.mensaje && typeof msg.mensaje === 'string')
              .map(msg => (
                <div
                  key={msg.id_mensaje}
                  className={`flex flex-col ${msg.remitente === user.rol ? 'items-end' : 'items-start'}`}
                >
                  <div className={`px-4 py-2 rounded-2xl max-w-xs break-words shadow-sm ${msg.remitente === user.rol ? 'bg-primary text-white' : 'bg-neutral-100 text-neutral-800'}`}
                       style={{ opacity: msg.leido ? 0.7 : 1 }}>
                    <span className="text-xs font-semibold">{msg.remitente}</span>
                    <div>{msg.mensaje}</div>
                    {Boolean(msg.leido) && <span className="text-[10px] text-neutral-500 ml-2">(leído)</span>}
                  </div>
                </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <form onSubmit={enviarMensaje} className="flex gap-2 mt-2">
            <input
              type="text"
              value={nuevoMensaje}
              onChange={e => setNuevoMensaje(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="flex-1 px-4 py-2 rounded-full border border-neutral-200 focus:ring-2 focus:ring-primary outline-none"
            />
            <button
              type="submit"
              className="bg-accent hover:bg-accent/90 text-white font-medium px-6 py-2 rounded-full transition-colors"
            >
              Enviar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatNotifications;
