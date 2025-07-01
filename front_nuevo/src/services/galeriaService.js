import api from './api';

export async function uploadGaleriaImage(tipo, file) {
  const formData = new FormData();
  formData.append('tipo', tipo);
  formData.append('file', file);

  try {
    const response = await api.post(
      '/galeria/upload-image',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } },
    );
    // Si la respuesta es texto plano, intenta devolver el texto
    if (typeof response.data === 'string') {
      return { url: response.data };
    }
    return response.data;
  } catch (err) {
    // Lanzar el error completo para que el frontend lo maneje
    throw err;
  }
}

export async function getGaleriaImagesByTipo(tipo) {
  const response = await api.get(`/galeria/images/${tipo}`);
  return response.data.imagenes;
}
