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
    const ip = Constantes.IP; // Dirección IP para la API.
    const [searchQuery, setSearchQuery] = useState(''); // Estado para almacenar el texto de búsqueda.
    const [visible, setVisible] = useState(false); // Estado para controlar la visibilidad del modal.
    const [idToUpdate, setIdToUpdate] = useState(null); // Estado para almacenar el ID de la marca a actualizar.
    const [idToDelete, setIdToDelete] = useState(null); // Estado para almacenar el ID de la marca a eliminar.
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false); // Estado para controlar la visibilidad del diálogo de eliminación.
    const [response, setResponse] = useState([]); // Estado para almacenar la lista de marcas obtenidas de la API.
    const [Marca, setMarca] = useState(''); // Estado para almacenar el nombre de la marca.
    const [Imagen, setImagen] = useState(''); // Estado para almacenar la URI de la imagen de la marca.

    //Constantes para la busqueda con el elemento de la libreria searchBar
    const onChangeSearch = (query) => setSearchQuery(query);
    // Mostrar el modal de agregar/actualizar marca
    const showModal = () => setVisible(true);
    // Ocultar el modal y limpiar los campos
    const hideModal = () => {
        setIdToUpdate(null);
        setVisible(false);
        limpiarCampos();
    };

    // Limpiar los campos de marca e imagen
    const limpiarCampos = () => {
        setMarca('');
        setImagen('');
    };

    // Mostrar el diálogo de confirmación de eliminación
    const showDeleteDialog = (id) => {
        setIdToDelete(id);
        setDeleteDialogVisible(true);
    };

    // Ocultar el diálogo de confirmación de eliminación
    const hideDeleteDialog = () => setDeleteDialogVisible(false);

    // Obtener la lista de marcas de la API
    const fillList = async (searchForm = null) => {
        try {
            const action = searchForm ? "searchRows" : "readAll";
            if (action != "readAll") {
                const response = await fetch(`${ip}/Expo2024/expo/api/servicios/administrador/marca.php?action=${action}`, {
                    method: 'POST',
                    body: searchForm
                });
                const data = await response.json();
                setResponse(data.dataset);
                console.log(data.dataset);
            } else {
                const response = await fetch(`${ip}/Expo2024/expo/api/servicios/administrador/marca.php?action=${action}`, {
                    method: 'GET'
                });
                const data = await response.json();
                setResponse(data.dataset);
                console.log(data.dataset);
            }
        } catch (error) {
            console.error(error);
            console.log('Error', 'No se pudo obtener la lista de marcas');
        }
    };

    useEffect(() => {
        if (searchQuery != "") {
            const formData = new FormData();
            formData.append("search", searchQuery);
            fillList(formData);
        } else {
            fillList();
        }
    }, [searchQuery]);

    // Insertar una nueva marca en la API
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

    // Actualizar una marca existente en la API
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
            Alert.alert('No se pudo acceder a la API', error.message || error.toString());
        }
    };

    // Abrir el modal para actualizar una marca existente
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
                Alert.alert('Error', data.error || 'No se pudo obtener la información de la marca');
            }
        } catch (error) {
            console.log('Error en la solicitud:', error);
            Alert.alert('Error', 'Ocurrió un error al intentar obtener los datos de la marca');
        }
    };

    // Confirmar la eliminación de una marca
    const confirmarEliminacion = () => {
        eliminarRegistros(idToDelete);
    };

    // Eliminar una marca de la API
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
            Alert.alert('No se pudo acceder a la API', error.message || error.toString());
        }
        hideDeleteDialog();
    };

    // Seleccionar una imagen desde la galería
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
        fillList(); // Llamar a la función para llenar la lista de marcas cuando el componente se monta
    }, []);

    useFocusEffect(
        useCallback(() => {
            fillList(); // Volver a llenar la lista de marcas cuando la pantalla obtiene el foco
        }, [])
    );

    // Manejar la sumisión del formulario (agregar o actualizar una marca)
    const handleSubmit = () => {
        if (idToUpdate) {
            actualizarMarcas();
        } else {
            insertarMarcas();
        }
    };

    // Renderizar cada elemento de la lista de marcas
    const renderItem = ({ item }) => (
        <BrandCard item={item} onPressUpdate={openUpdate} onPressDelete={showDeleteDialog} />
    );

    return (
        <Provider>
            <View style={styles.container}>
                {/* Barra de búsqueda para filtrar marcas */}
                <Searchbar
                    placeholder="Buscar marca"
                    value={searchQuery}
                    onChangeText={onChangeSearch} // Agrega función para manejar cambios en el texto de búsqueda
                    style={styles.searchbar}
                />
                {/* Botón para abrir el modal de agregar/actualizar marca */}
                <Button onPress={showModal} style={styles.addButton}>
                    <MaterialCommunityIcons name="plus-circle-outline" size={22} color="#9368EE" />
                </Button>
                {/* Lista de marcas */}
                <FlatList
                    data={response}
                    renderItem={renderItem} // Renderiza cada ítem de la lista usando renderItem
                    keyExtractor={item => item.id_marca.toString()} // Usa id_marca como clave única para cada ítem
                />
                <Portal>
                    {/* Modal para agregar o actualizar una marca */}
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
                        {/* Botón para cerrar el modal */}
                        <Button onPress={hideModal} style={styles.closeButton}>
                            <MaterialCommunityIcons name="close-thick" size={20} color="red" />
                        </Button>
                        {/* Título del modal basado en si se está actualizando o agregando */}
                        <Text style={styles.title}>
                            {idToUpdate ? 'Actualizar marca' : 'Agregar marca'}
                        </Text>
                        {/* Campo de texto para ingresar el nombre de la marca */}
                        <TextInput
                            label="Marca"
                            value={Marca}
                            onChangeText={text => setMarca(text)} // Actualiza el estado Marca cuando cambia el texto
                            style={styles.input}
                        />
                        {/* Botón para seleccionar una imagen desde la galería */}
                        <TouchableOpacity onPress={pickImage}>
                            <Image
                                source={Imagen ? { uri: Imagen } : foto} // Muestra la imagen seleccionada o una imagen predeterminada
                                style={styles.image}
                            />
                            <Text>{Imagen ? 'Cambiar Imagen' : 'Seleccionar Imagen'}</Text>
                        </TouchableOpacity>
                        {/* Botón para enviar el formulario */}
                        <Button mode="contained" onPress={handleSubmit}>
                            {idToUpdate ? 'Actualizar' : 'Agregar'}
                        </Button>
                    </Modal>
                    {/* Diálogo de confirmación para eliminar una marca */}
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