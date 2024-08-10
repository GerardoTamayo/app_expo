import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as Constantes from '../utilidades/constante';
import { View, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Searchbar, Card, Paragraph, Modal, Portal, Text, Button, TextInput, Provider, Dialog } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Marcas() {
    const ip = Constantes.IP;
    const [searchQuery, setSearchQuery] = useState('');
    const [visible, setVisible] = useState(false);
    const [idToUpdate, setIdToUpdate] = useState(null);
    const [idToDelete, setIdToDelete] = useState(null);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);

    const [response, setResponse] = useState([]);
    const [Marca, setMarca] = useState(''); // Aquí asegúrate de que sea Marca con M mayúscula
    const [Imagen, setImagen] = useState('');

    const showModal = () => setVisible(true);
    const hideModal = () => {
        setIdToUpdate(null);
        setVisible(false);
        limpiarCampos();
    };

    const limpiarCampos = () => {
        setMarca('');
    };

    const showDeleteDialog = (id) => {
        setIdToDelete(id);
        setDeleteDialogVisible(true);
    };

    const hideDeleteDialog = () => setDeleteDialogVisible(false);

    const fillList = async () => {
        try {
            const response = await fetch(`${ip}/Expo2024/expo/api/servicios/administrador/marca.php?action=readAll`, {
                method: 'GET'
            });
            const data = await response.json();
            setResponse(data.dataset);
        } catch (error) {
            console.error(error);
            Alert.alert('Error');
        }
    };

    const insertarMarcas = async () => {
        try {
            const formData = new FormData();
            formData.append('marca', Marca);
            formData.append('imagen_marca', Imagen);
            const data = await fetch(`${ip}/Expo2024/expo/api/servicios/administrador/marca.php?action=createRow`, {
                method: 'POST',
                body: formData
            });

            const responseText = await data.text();
            console.log("Respuesta del servidor:", responseText);

            try {
                const response = JSON.parse(responseText);
                if (response.status) {
                    limpiarCampos();
                    fillList();
                    hideModal();
                    Alert.alert('Mensaje', response.message);
                } else {
                    Alert.alert('Error', response.error);
                }
            } catch (parseError) {
                Alert.alert('Error de análisis JSON', 'No se pudo parsear la respuesta del servidor como JSON.');
                console.log('Error de análisis JSON:', parseError);
            }
        } catch (error) {
            Alert.alert('No se pudo acceder a la API', error.message || error.toString());
        }
    };



    const actualizarMarcas = async () => {
        try {
            const formData = new FormData();
            formData.append('marca', Marca);
            const data = await fetch(`${ip}/Expo2024/expo/api/servicios/administrador/marca.php?action=updateRow`, {
                method: 'POST',
                body: formData
            });
            const response = await data.json();
            if (response.status) {
                Alert.alert('Mensaje', response.message);
                limpiarCampos();
                fillList();
                hideModal();
            } else {
                Alert.alert('Error', response.error);
            }
        } catch (error) {
            Alert.alert('No se pudo acceder a la API ' + response.error);
        }
    };

    const openUpdate = async (id) => {
        const formData = new FormData();
        formData.append('id_marca', id);
        try {
            const response = await fetch(`${ip}/Expo2024/expo/api/servicios/administrador/marca.php?action=readOne`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (data.status) {
                const row = data.dataset;
                setIdToUpdate(row.id_marca);
                setMarca(row.nombre_marca);
                showModal();
            } else {
                Alert.alert('Error', data.error || 'No se pudo obtener la información del producto');
            }
        } catch (error) {
            console.log('Error en la solicitud:', error);
            Alert.alert('Error', 'Ocurrió un error al intentar obtener los datos del producto');
        }
    };

    const confirmarEliminacion = () => {
        eliminarRegistros(idToDelete);
    };

    const eliminarRegistros = async (idA) => {
        try {
            const formData = new FormData();
            formData.append('id_marca', idA);
            const data = await fetch(`${ip}/Expo2024/expo/api/servicios/administrador/marca.php?action=deleteRow`, {
                method: 'POST',
                body: formData
            });
            const response = await data.json();
            if (response.status) {
                Alert.alert(response.message);
                fillList();
            } else {
                Alert.alert('Error', response.error);
            }
        } catch (error) {
            Alert.alert('No se pudo acceder a la API ' + response.error);
        }
        hideDeleteDialog();
    };

    useEffect(() => {
        fillList();
    }, []);

    useFocusEffect(
        useCallback(() => {
            fillList();
        }, [])
    );

    const handleSubmit = () => {
        if (idToUpdate) {
            actualizarMarcas();
        } else {
            insertarMarcas();
        }
    };

    const renderItem = ({ item }) => (
        <Card style={styles.card}>
            <Card.Content>
                <Paragraph>Marca: {item.nombre_marca}</Paragraph>
                <View style={styles.containerButtons}>
                    <TouchableOpacity style={styles.buttonActualizar} onPress={() => openUpdate(item.id_marca)}>
                        <Text style={styles.botonTexto}>Actualizar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonEliminar} onPress={() => showDeleteDialog(item.id_marca)}>
                        <Text style={styles.botonTexto}>Eliminar</Text>
                    </TouchableOpacity>
                </View>
            </Card.Content>
        </Card>
    );

    return (
        <Provider>
            <View style={styles.container}>
                <Searchbar
                    placeholder="Buscar marca"
                    value={searchQuery}
                    style={styles.searchbar}
                />
                <Button onPress={showModal} style={styles.addButton}>
                    <MaterialCommunityIcons name="plus-circle-outline" size={22} color="#9368EE" />
                </Button>
                <FlatList
                    data={response}
                    renderItem={renderItem}
                    keyExtractor={item => item.id_marca.toString()}
                />
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
                        <Button onPress={hideModal} style={styles.closeButton}>
                            <MaterialCommunityIcons name="close-thick" size={20} color="red" />
                        </Button>
                        <Text style={styles.title}>
                            {idToUpdate ? 'Actualizar marca' : 'Agregar marca'}
                        </Text>
                        <TextInput
                            label="Marca"
                            value={Marca} // Aquí se usa Marca con M mayúscula
                            onChangeText={text => setMarca(text)}
                            style={styles.input}
                        />
                        <TextInput
                            label="Imagen"
                            value={Imagen} // Aquí se usa Marca con M mayúscula
                            onChangeText={text => setImagen(text)}
                            style={styles.input}
                        />
                        <Button mode="contained" style={styles.saveButton} onPress={handleSubmit}>
                            Guardar
                        </Button>
                    </Modal>
                    <Dialog visible={deleteDialogVisible} onDismiss={hideDeleteDialog}>
                        <Dialog.Title>Advertencia</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>¿Desea eliminar la marca de forma permanente?</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={hideDeleteDialog}>Cancelar</Button>
                            <Button onPress={confirmarEliminacion}>Aceptar</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 10,
    },
    searchbar: {
        marginBottom: 10,
    },
    card: {
        marginBottom: 10,
    },
    addButton: {
        marginTop: 5,
        alignSelf: "flex-end",
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
    },
    input: {
        marginBottom: 10,
    },
    saveButton: {
        marginTop: 5,
        backgroundColor: 'blue',
        width: 150,
        alignSelf: "flex-end",
    },
    closeButton: {
        marginTop: 10,
        width: 5,
        alignSelf: "flex-end",
        marginBottom: 10,
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