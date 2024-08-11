import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as Constantes from '../utilidades/constante';
import { View, FlatList, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { Searchbar, Card, Paragraph, Modal, Portal, Text, Button, Provider, Dialog, TextInput } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import imageData from '../utilidades/imageData';
import BrandCard from '../componentes/cards/BrandCard';
import foto from '../../assets/default.png';

export default function Marcas() {
    const ip = Constantes.IP;
    const [searchQuery, setSearchQuery] = useState('');
    const [visible, setVisible] = useState(false);
    const [idToUpdate, setIdToUpdate] = useState(null);
    const [idToDelete, setIdToDelete] = useState(null);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [response, setResponse] = useState([]);
    const [Marca, setMarca] = useState('');
    const [Imagen, setImagen] = useState('');

    const showModal = () => setVisible(true);
    const hideModal = () => {
        setIdToUpdate(null);
        setVisible(false);
        limpiarCampos();
    };

    const limpiarCampos = () => {
        setMarca('');
        setImagen('');
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
            console.log(data.dataset);
        } catch (error) {
            console.error(error);
            Alert.alert('Error');
        }
    };

    const insertarMarcas = async () => {
        try {
            const formData = new FormData();
            formData.append('marca', Marca);
            if (Imagen) {
                const uriParts = Imagen.split('.');
                const fileType = uriParts[uriParts.length - 1];
                formData.append('imagen_marca', {
                    uri: Imagen,
                    name: `photo.${fileType}`,
                    type: `image/${fileType}`,
                });
            } else {
                formData.append('imagen_marca', {
                    uri: foto,
                    name: 'default.png',
                    type: 'image/png',
                });
            }

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
            if (Imagen) {
                const uriParts = Imagen.split('.');
                const fileType = uriParts[uriParts.length - 1];
                formData.append('imagen_marca', {
                    uri: Imagen,
                    name: `photo.${fileType}`,
                    type: `image/${fileType}`,
                });
            }
            formData.append('id_marca', idToUpdate);

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
                const imageUrl = await imageData('marcas', row.imagen);
                setImagen(imageUrl);
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

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImagen(result.assets[0].uri);
        }
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
        <BrandCard item={item} onPressUpdate={openUpdate} onPressDelete={showDeleteDialog} />
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
                            value={Marca}
                            onChangeText={text => setMarca(text)}
                            style={styles.input}
                        />
                        <TouchableOpacity onPress={pickImage}>
                            <Image
                                source={Imagen ? { uri: Imagen } : foto}
                                style={styles.image}
                            />
                            <Text>{Imagen ? 'Cambiar Imagen' : 'Seleccionar Imagen'}</Text>
                        </TouchableOpacity>
                        <Button mode="contained" onPress={handleSubmit}>
                            {idToUpdate ? 'Actualizar' : 'Agregar'}
                        </Button>
                    </Modal>
                    <Dialog visible={deleteDialogVisible} onDismiss={hideDeleteDialog}>
                        <Dialog.Title>Confirmación</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>¿Estás seguro de que deseas eliminar esta marca?</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={hideDeleteDialog}>Cancelar</Button>
                            <Button onPress={confirmarEliminacion}>Eliminar</Button>
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
        marginBottom: 7,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#fff',
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
    image: {
        width: 100,
        height: 100,
        marginBottom: 16,
    },
    imagePicker: {
        width: 150,
        height: 150,
        backgroundColor: '#ececec',
        marginBottom: 16,
        alignSelf: 'center',
    },
});