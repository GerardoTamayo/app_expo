import React, { useState, useEffect } from 'react'; 
// Importación de React y hooks para manejar el estado y efectos secundarios en el componente.

import { Card, Text, ActivityIndicator, Paragraph } from 'react-native-paper'; 
// Importación de componentes de la librería react-native-paper, que se utilizarán para el diseño de la tarjeta, texto y animación de carga.

import { StyleSheet, View, TouchableOpacity } from 'react-native'; 
// Importación de componentes básicos de React Native, como View para contenedores, TouchableOpacity para botones, y StyleSheet para estilos.

import imageData from '../../utilidades/imageData'; 
// Importación de una función personalizada que obtiene la URL de la imagen.

const BrandCard = ({ item, onPressUpdate, onPressDelete }) => { 
    // Declaración del componente funcional BrandCard, que recibe un objeto item y funciones para manejar actualizaciones y eliminaciones como props.

    const [imagenUrl, setImagenUrl] = useState(null); 
    // Estado para almacenar la URL de la imagen.

    const [loading, setLoading] = useState(true); 
    // Estado para gestionar si la imagen aún está cargando.

    const [error, setError] = useState(null); 
    // Estado para manejar cualquier error que ocurra durante la carga de la imagen.

    useEffect(() => { 
        // Hook useEffect para ejecutar un efecto secundario cuando la imagen del item cambia.

        const cargarImagen = async () => { 
            // Función asincrónica para cargar la imagen desde un recurso externo.

            try {
                const uri = await imageData('marcas', item.imagen); 
                // Llamada a la función imageData para obtener la URL de la imagen y almacenarla en la variable uri.

                setImagenUrl(uri); 
                // Actualización del estado imagenUrl con la URL obtenida.

            } catch (error) { 
                setError(error); 
                // Si ocurre un error, se almacena en el estado error.

            } finally {
                setLoading(false); 
                // Finalmente, se establece que la carga ha finalizado (loading se pone en false).
            }
        };

        cargarImagen(); 
        // Se invoca la función para cargar la imagen.

    }, [item.imagen]); 
    // Dependencia del efecto: solo se ejecuta cuando item.imagen cambia.

    if (loading) { 
        // Si la imagen aún está cargando, se muestra un indicador de carga.

        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" /> 
                {/* Componente para mostrar un indicador de actividad mientras la imagen se carga. */}
            </View>
        );
    }

    if (error) { 
        // Si ocurre un error al cargar la imagen, se muestra un mensaje de error.

        return <Text>Error al cargar la imagen</Text>;
    }

    return (
        <Card style={styles.card}> 
            {/* Tarjeta que contiene la imagen y los botones de acción. */}

            <Card.Cover source={{ uri: imagenUrl }} /> 
            {/* Muestra la imagen de la marca usando la URL obtenida. */}

            <Card.Content>
                <Paragraph>Marca: {item.nombre_marca}</Paragraph> 
                {/* Muestra el nombre de la marca. */}

                <View style={styles.containerButtons}>
                    <TouchableOpacity style={styles.buttonActualizar} onPress={() => onPressUpdate(item.id_marca)}> 
                        {/* Botón para actualizar la marca. Se invoca la función onPressUpdate con el ID de la marca al presionarlo. */}

                        <Text style={styles.botonTexto}>Actualizar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonEliminar} onPress={() => onPressDelete(item.id_marca)}> 
                        {/* Botón para eliminar la marca. Se invoca la función onPressDelete con el ID de la marca al presionarlo. */}

                        <Text style={styles.botonTexto}>Eliminar</Text>
                    </TouchableOpacity>
                </View>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({ 
    // Definición de los estilos que se aplican a los componentes.

    card: {
        flex: 1,
        margin: 5,
        borderRadius: 10,
        zIndex: 2,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    brandTitle: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonActualizar: {
        alignItems: 'center',
        padding: 10,
        width: 90,
        backgroundColor: 'skyblue',
        borderRadius: 5,
        marginVertical: 5,
    },
    buttonEliminar: {
        alignItems: 'center',
        padding: 10,
        width: 90,
        backgroundColor: 'red',
        borderRadius: 5,
        marginVertical: 5,
    },
    containerButtons: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
});

export default BrandCard; 
// Exportación del componente para su uso en otras partes de la aplicación.
