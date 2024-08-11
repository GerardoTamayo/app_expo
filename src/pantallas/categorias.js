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

    const [response, setResponse] = useState([]); // Estado para almacenar la respuesta del servidor .
    const [Categoria, setCategoria] = useState('');  // Estado para manejar el nombre de la categoría.
    const showModal = () => setVisible(true); // Función para mostrar el modal.
    const hideModal = () => { // Función para ocultar el modal y limpiar los campos.
        setIdToUpdate(null);
        setVisible(false);
        limpiarCampos();
    };

    const limpiarCampos = () => { // Función para limpiar los campos del formulario.
        setCategoria('');
    };

    const showDeleteDialog = (id) => { // Muestra el cuadro de diálogo de eliminación y guarda el ID a eliminar.
        setIdToDelete(id);
        setDeleteDialogVisible(true);
    };

    const hideDeleteDialog = () => setDeleteDialogVisible(false); // Oculta el cuadro de diálogo de eliminación.

    const fillList = async () => { // Función para llenar la lista de categorías obteniendo los datos del servidor.
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

    const insertarCategorias = async () => { // Función para insertar una nueva categoría en la base de datos.
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

    const actualizarCategorias = async () => { // Función para actualizar una categoría existente.
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

    const openUpdate = async (id) => { // Función para abrir el modal de actualización con los datos de la categoría seleccionada.
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

    const confirmarEliminacion = () => { // Función para confirmar la eliminación de una categoría.
        eliminarRegistros(idToDelete); // Llama a la función para eliminar la categoría.
    };


    const eliminarRegistros = async (idA) => { // Función para eliminar una categoría de la base de datos.
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


    useEffect(() => { // Hook para ejecutar fillList cuando el componente se monta.
        fillList();
    }, []);

    useFocusEffect( // Hook para ejecutar fillList cuando la pantalla gana foco.
        useCallback(() => {
            fillList();
        }, [])
    );

    const handleSubmit = () => { // Función para manejar el envío del formulario.
        if (idToUpdate) { // Si hay un ID para actualizar.
            actualizarCategorias(); // Actualiza la categoría.
        } else {
            insertarCategorias(); // Inserta una nueva categoría.
        }
    };

    const renderItem = ({ item }) => ( // Renderiza cada elemento de la lista.
        <Card style={styles.card}>
            <Card.Content>
                <Paragraph>Categoria: {item.nombre_categoria}</Paragraph>
                <View style={styles.containerButtons}>
                    <TouchableOpacity style={styles.buttonActualizar} onPress={() => openUpdate(item.id_categoria)}>
                        <Text style={styles.botonTexto}>Actualizar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonEliminar} onPress={() => showDeleteDialog(item.id_categoria)}>
                        <Text style={styles.botonTexto}>Eliminar</Text>
                    </TouchableOpacity>
                </View>
            </Card.Content>
        </Card>
    );

    return ( // Renderiza la interfaz de usuario.
        <Provider>
            <View style={styles.container}>
                {/* Barra de búsqueda para filtrar categorías */}
                <Searchbar
                    placeholder="Buscar categoria" // Texto de marcador para la barra de búsqueda.
                    value={searchQuery} // Valor actual de la búsqueda.
                    style={styles.searchbar} // Aplicación de estilos a la barra de búsqueda.
                />
                {/* Botón para mostrar el modal de agregar o actualizar categoría */}
                <Button onPress={showModal} style={styles.addButton}>
                    <MaterialCommunityIcons name="plus-circle-outline" size={22} color="#9368EE" />
                    {/* Ícono de MaterialCommunityIcons para el botón de agregar */}
                </Button>
                {/* Lista de categorías */}
                <FlatList
                    data={response} // Datos a mostrar en la lista.
                    renderItem={renderItem} // Función para renderizar cada elemento de la lista.
                    keyExtractor={item => item.id_categoria.toString()} // Identificador único para cada elemento.
                />
                <Portal>
                    {/* Modal para agregar o actualizar una categoría */}
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
                        <Button onPress={hideModal} style={styles.closeButton}>
                            <MaterialCommunityIcons name="close-thick" size={20} color="red" />
                            {/* Ícono de MaterialCommunityIcons para cerrar el modal */}
                        </Button>
                        <Text style={styles.title}>
                            {idToUpdate ? 'Actualizar categoria' : 'Agregar categoria'}
                            {/* Texto que cambia según si se está actualizando o agregando una categoría */}
                        </Text>
                        <TextInput
                            label="Categoria" // Etiqueta del campo de texto.
                            value={Categoria} // Valor actual del campo de texto.
                            onChangeText={text => setCategoria(text)} // Función para actualizar el valor del campo de texto.
                            style={styles.input} // Aplicación de estilos al campo de texto.
                        />
                        <Button mode="contained" style={styles.saveButton} onPress={handleSubmit}>
                            Guardar
                            {/* Botón para guardar los cambios */}
                        </Button>
                    </Modal>
                    {/* Diálogo de confirmación para eliminar una categoría */}
                    <Dialog visible={deleteDialogVisible} onDismiss={hideDeleteDialog}>
                        <Dialog.Title>Advertencia</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>¿Desea eliminar la categoria de forma permanente?</Paragraph>
                            {/* Mensaje en el diálogo de confirmación */}
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={hideDeleteDialog}>Cancelar</Button>
                            <Button onPress={confirmarEliminacion}>Aceptar</Button>
                            {/* Botones para cancelar o confirmar la eliminación */}
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({ // Estilos para los componentes.
    container: {
        flex: 1, // Ocupa todo el espacio disponible.
        paddingTop: 20, // Espacio en la parte superior.
        paddingHorizontal: 10, // Espacio horizontal.
    },
    searchbar: {
        marginBottom: 10, // Espacio debajo de la barra de búsqueda.
    },
    addButton: {
        marginTop: 5, // Espacio en la parte superior del botón.
        alignSelf: "flex-end", // Alineación del botón al final del contenedor.
    },
    modalContainer: {
        backgroundColor: 'white', // Color de fondo blanco para el modal.
        padding: 20, // Espaciado interno.
        margin: 20, // Margen alrededor del modal.
    },
    input: {
        marginBottom: 10, // Espacio debajo del campo de texto.
    },
    saveButton: {
        marginTop: 5, // Espacio en la parte superior del botón de guardar.
        backgroundColor: 'blue', // Color de fondo azul para el botón.
        width: 150, // Ancho del botón.
        alignSelf: "flex-end", // Alineación del botón al final del contenedor.
    },
    closeButton: {
        marginTop: 10, // Espacio en la parte superior del botón de cerrar.
        width: 5, // Ancho del botón de cerrar.
        alignSelf: "flex-end", // Alineación del botón al final del contenedor.
        marginBottom: 10, // Espacio debajo del botón de cerrar.
    },
    buttonActualizar: {
        alignItems: 'center', // Alineación del contenido al centro.
        padding: 10, // Espaciado interno del botón.
        width: 90, // Ancho del botón.
        backgroundColor: 'skyblue', // Color de fondo del botón.
        borderRadius: 5, // Bordes redondeados.
        marginVertical: 5, // Espacio vertical alrededor del botón.
    },
    buttonEliminar: {
        alignItems: 'center', // Alineación del contenido al centro.
        padding: 10, // Espaciado interno del botón.
        width: 90, // Ancho del botón.
        backgroundColor: 'red', // Color de fondo del botón.
        borderRadius: 5, // Bordes redondeados.
        marginVertical: 5, // Espacio vertical alrededor del botón.
    },
    containerButtons: {
        justifyContent: 'space-between', // Espacio entre botones.
        flexDirection: 'row', // Dirección de los botones en fila.
    },
});