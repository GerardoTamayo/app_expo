import React, { useState, useEffect, useCallback } from 'react'; // Importación de React y algunos hooks útiles.
import { useFocusEffect } from '@react-navigation/native'; // Hook de navegación para manejar el enfoque en la pantalla.
import * as Constantes from '../utilidades/constante'; // Importa constantes desde un archivo local.
import { View, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native'; // Componentes de React Native.
import { Searchbar, Card, Paragraph, Modal, Portal, Text, Button, TextInput, Provider, Dialog } from 'react-native-paper'; // Componentes de la librería react-native-paper.
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Importa íconos de Material Community Icons.

export default function Categorias() { // Define el componente principal llamado "Categorias".
    const ip = Constantes.IP; // Obtiene la IP desde las constantes importadas.
    const [searchQuery, setSearchQuery] = useState(''); // Estado para manejar la consulta de búsqueda.
    const [visible, setVisible] = useState(false); // Estado para manejar la visibilidad del modal.
    const [idToUpdate, setIdToUpdate] = useState(null); // Estado para manejar el ID de la categoría a actualizar.
    const [idToDelete, setIdToDelete] = useState(null); // Estado para manejar el ID de la categoría a eliminar.
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false); // Estado para manejar la visibilidad del cuadro de diálogo de eliminación.

    const [response, setResponse] = useState([]); // Estado para almacenar la respuesta del servidor con las categorías.
    const [Categoria, setCategoria] = useState('');  // Estado para manejar el nombre de la categoría.
    
    // Funciones para mostrar y ocultar el modal
    const showModal = () => setVisible(true); 
    const hideModal = () => { 
        setIdToUpdate(null);
        setVisible(false);
        limpiarCampos();
    };

    // Función para limpiar los campos del formulario.
    const limpiarCampos = () => { 
        setCategoria('');
    };

    // Funciones para mostrar y ocultar el cuadro de diálogo de eliminación
    const showDeleteDialog = (id) => { 
        setIdToDelete(id);
        setDeleteDialogVisible(true);
    };
    const hideDeleteDialog = () => setDeleteDialogVisible(false); 

    // Función para llenar la lista de categorías obteniendo los datos del servidor.
    const fillList = async () => { 
        try {
            const response = await fetch(`${ip}/Expo2024/expo/api/servicios/administrador/categoria.php?action=readAll`, {
                method: 'GET'
            });
            const data = await response.json(); // Convierte la respuesta en JSON.
            setResponse(data.dataset); // Guarda los datos obtenidos en el estado response.
        } catch (error) {
            console.error(error); // Muestra el error en la consola.
            Alert.alert('Error'); // Muestra una alerta de error.
        }
    };

    // Función para insertar una nueva categoría en la base de datos.
    const insertarCategorias = async () => { 
        try {
            const formData = new FormData();
            formData.append('categoria', Categoria); // Agrega el nombre de la categoría al FormData.
            const data = await fetch(`${ip}/Expo2024/expo/api/servicios/administrador/categoria.php?action=createRow`, {
                method: 'POST',
                body: formData
            });

            const responseText = await data.text(); // Obtiene la respuesta como texto.
            console.log("Respuesta del servidor:", responseText); // Muestra la respuesta del servidor en la consola.

            try {
                const response = JSON.parse(responseText); // Intenta parsear la respuesta como JSON.
                if (response.status) { // Si la inserción fue exitosa.
                    limpiarCampos(); // Limpia los campos del formulario.
                    fillList(); // Actualiza la lista de categorías.
                    hideModal(); // Oculta el modal.
                    Alert.alert('Mensaje', response.message); // Muestra un mensaje de éxito.
                } else {
                    Alert.alert('Error', response.error); // Muestra un mensaje de error.
                }
            } catch (parseError) {
                Alert.alert('Error de análisis JSON', 'No se pudo parsear la respuesta del servidor como JSON.');
                console.log('Error de análisis JSON:', parseError); // Muestra el error de parsing en la consola.
            }
        } catch (error) {
            Alert.alert('No se pudo acceder a la API', error.message || error.toString()); // Muestra una alerta si la conexión a la API falla.
        }
    };

    // Función para actualizar una categoría existente.
    const actualizarCategorias = async () => { 
        try {
            const formData = new FormData();
            formData.append('id_categoria', idToUpdate); // Agrega el ID de la categoría al FormData.
            formData.append('categoria', Categoria); // Agrega el nombre actualizado de la categoría.
            const data = await fetch(`${ip}/Expo2024/expo/api/servicios/administrador/categoria.php?action=updateRow`, {
                method: 'POST',
                body: formData
            });
            const response = await data.json(); // Convierte la respuesta en JSON.
            if (response.status) { // Si la actualización fue exitosa.
                Alert.alert('Mensaje', response.message); // Muestra un mensaje de éxito.
                limpiarCampos(); // Limpia los campos del formulario.
                fillList(); // Actualiza la lista de categorías.
                hideModal(); // Oculta el modal.
            } else {
                Alert.alert('Error', response.error); // Muestra un mensaje de error.
            }
        } catch (error) {
            Alert.alert('No se pudo acceder a la API ' + response.error); // Muestra una alerta si la conexión a la API falla.
        }
    };

    // Función para abrir el modal de actualización con los datos de la categoría seleccionada.
    const openUpdate = async (id) => { 
        const formData = new FormData();
        formData.append('id_categoria', id); // Agrega el ID de la categoría al FormData.
        try {
            const response = await fetch(`${ip}/Expo2024/expo/api/servicios/administrador/categoria.php?action=readOne`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json(); // Convierte la respuesta en JSON.
            if (data.status) { // Si la solicitud fue exitosa.
                const row = data.dataset; // Obtiene la fila de datos de la categoría.
                setIdToUpdate(row.id_categoria); // Guarda el ID de la categoría para la actualización.
                setCategoria(row.nombre_categoria); // Establece el nombre de la categoría en el estado.
                showModal(); // Muestra el modal.
            } else {
                Alert.alert('Error', data.error || 'No se pudo obtener la información del producto'); // Muestra un error si no se pudieron obtener los datos.
            }
        } catch (error) {
            console.log('Error en la solicitud:', error); // Muestra el error en la consola.
            Alert.alert('Error', 'Ocurrió un error al intentar obtener los datos del producto'); // Muestra un mensaje de error.
        }
    };

    // Función para confirmar la eliminación de una categoría.
    const confirmarEliminacion = () => { 
        eliminarRegistros(idToDelete); // Llama a la función para eliminar la categoría.
    };

    // Función para eliminar una categoría de la base de datos.
    const eliminarRegistros = async (idA) => { 
        try {
            const formData = new FormData();
            formData.append('id_categoria', idA); // Agrega el ID de la categoría al FormData.
            const data = await fetch(`${ip}/Expo2024/expo/api/servicios/administrador/categoria.php?action=deleteRow`, {
                method: 'POST',
                body: formData
            });
            const response = await data.json(); // Convierte la respuesta en JSON.
            if (response.status) { // Si la eliminación fue exitosa.
                Alert.alert(response.message); // Muestra un mensaje de éxito.
                fillList(); // Actualiza la lista de categorías.
            } else {
                Alert.alert('Error', response.error); // Muestra un mensaje de error.
            }
        } catch (error) {
            Alert.alert('No se pudo acceder a la API ' + response.error); // Muestra una alerta si la conexión a la API falla.
        }
        hideDeleteDialog(); // Oculta el cuadro de diálogo de eliminación.
    };

    // Hook para ejecutar fillList cuando el componente se monta.
    useEffect(() => { 
        fillList();
    }, []);

    // Hook para ejecutar fillList cuando la pantalla gana foco.
    useFocusEffect( 
        useCallback(() => {
            fillList();
        }, [])
    );

    // Función para manejar el envío del formulario.
    const handleSubmit = () => { 
        if (idToUpdate) { // Si hay un ID para actualizar.
            actualizarCategorias(); // Actualiza la categoría.
        } else {
            insertarCategorias(); // Inserta una nueva categoría.
        }
    };

    // Renderiza cada elemento de la lista.
    const renderItem = ({ item }) => ( 
        <Card style={styles.card}>
            <Card.Content>
                <Paragraph>Categoria: {item.nombre_categoria}</Paragraph>
            </Card.Content>
            <Card.Actions>
                <TouchableOpacity onPress={() => openUpdate(item.id_categoria)} style={styles.touchable}>
                    <MaterialCommunityIcons name="file-document-edit" size={30} color="#000000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => showDeleteDialog(item.id_categoria)} style={styles.touchable}>
                    <MaterialCommunityIcons name="delete" size={30} color="red" />
                </TouchableOpacity>
            </Card.Actions>
        </Card>
    );

    return (
        <Provider>
            <View style={styles.container}>
                <Searchbar
                    placeholder="Buscar"
                    onChangeText={(query) => setSearchQuery(query)}
                    value={searchQuery}
                    style={styles.searchbar}
                />
                <FlatList
                    data={response.filter((item) => item.nombre_categoria.toLowerCase().includes(searchQuery.toLowerCase()))}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id_categoria.toString()}
                />
                <TouchableOpacity onPress={showModal} style={styles.addButton}>
                    <MaterialCommunityIcons name="plus-circle" size={60} color="#6200ee" />
                </TouchableOpacity>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
                        <Text style={styles.modalTitle}>{idToUpdate ? 'Actualizar Categoría' : 'Agregar Categoría'}</Text>
                        <TextInput
                            label="Categoria"
                            value={Categoria}
                            onChangeText={(text) => setCategoria(text)}
                            style={styles.textInput}
                        />
                        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
                            {idToUpdate ? 'Actualizar' : 'Guardar'}
                        </Button>
                    </Modal>
                    <Dialog visible={deleteDialogVisible} onDismiss={hideDeleteDialog}>
                        <Dialog.Title>Confirmación</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>¿Está seguro que desea eliminar esta categoría?</Paragraph>
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

// Estilos para el componente.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f2f2f2',
    },
    searchbar: {
        marginBottom: 10,
    },
    card: {
        marginBottom: 10,
        borderRadius: 10,
    },
    touchable: {
        marginHorizontal: 10,
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 20,
    },
    textInput: {
        marginBottom: 20,
    },
    button: {
        marginTop: 10,
    },
});