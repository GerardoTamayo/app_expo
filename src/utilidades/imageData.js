import * as Constantes from './constante';

// Función que maneja las peticiones para traer las imágenes de mi API
export default async function imageData(folder, filename) {
    // URL base del servidor
    const SERVER_URL = Constantes.IP;
    // Construir la URL completa de la imagen
    const imageUrl = `${SERVER_URL}/Expo2024/expo/api/imagenes/${folder}/${filename}`;
    try {
        console.log(imageUrl);
        return imageUrl; // Retornar la URL de la imagen si está disponible
    } catch (error) {
        console.error('Imagen error:', error);
        throw error; // Lanza el error para que useEffect pueda manejarlo
    }
};
