import React, { useState, useEffect } from 'react';
import { Card, Text, ActivityIndicator, Paragraph } from 'react-native-paper';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import imageData from '../../utilidades/imageData';

const BrandCard = ({ item, onPressUpdate, onPressDelete }) => {
    // Constantes para el manejo de la imagen
    const [imagenUrl, setImagenUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Método para cargar la imagen y manejar el error en caso de que no se encuentre
        const cargarImagen = async () => {
            try {
                // Traer la imagen y aplicarla a la url
                const uri = await imageData('marcas', item.imagen);
                setImagenUrl(uri);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        cargarImagen();
    }, [item.imagen]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return <Text>Error al cargar la imagen</Text>;
    }

    return (
        <Card style={styles.card}>
            <Card.Cover source={{ uri: imagenUrl }} />
            <Card.Content>
                <Paragraph>Marca: {item.nombre_marca}</Paragraph>
                <View style={styles.containerButtons}>
                    <TouchableOpacity style={styles.buttonActualizar} onPress={() => onPressUpdate(item.id_marca)}>
                        <Text style={styles.botonTexto}>Actualizar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonEliminar} onPress={() => onPressDelete(item.id_marca)}>
                        <Text style={styles.botonTexto}>Eliminar</Text>
                    </TouchableOpacity>
                </View>
            </Card.Content>
        </Card>
    );
};

const styles = StyleSheet.create({
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
