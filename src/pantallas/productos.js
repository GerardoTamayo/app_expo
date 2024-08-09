// Importamos React y useState para poder utilizar estados en el componente.
import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as Constantes from '../utilidades/constante';
// Importamos los componentes necesarios de react-native y react-native-paper.
import { View, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Searchbar, Card, Title, Paragraph, Modal, Portal, Text, Button, TextInput, Provider, Dialog } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
// Importamos los iconos de MaterialCommunityIcons de @expo/vector-icons.
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Definimos el componente principal de Productos.
export default function Productos() {
    const ip = Constantes.IP;
    // Definimos los estados necesarios.
    const [searchQuery, setSearchQuery] = useState('');
    const [date, setDate] = useState(new Date());
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [dataCategorias, setDataCategorias] = useState([]);
    const [dataMarcas, setDataMarcas] = useState([]);
    const [dataPresentaciones, setDataPresentaciones] = useState([]);
    const [visible, setVisible] = useState(false);
    const [idToUpdate, setIdToUpdate] = useState(null);
    const [idToDelete, setIdToDelete] = useState(null);

    // Función para mostrar el modal.
    const showModal = () => setVisible(true);
    // Función para ocultar el modal.
    const hideModal = () => {
        setIdToUpdate(null);
        setVisible(false);
        limpiarCampos();
    };

    // Estados para manejar los datos, carga y errores
    const [response, setResponse] = useState([]);
    const [nombre, setNombre] = useState('');
    const [Fecha, setFecha] = useState('');
    const [Descripcion, setDescripcion] = useState('');
    const [Existencias, setExistencias] = useState('');
    const [Categoria, setCategoria] = useState('');
    const [Marca, setMarca] = useState('');
    const [Presentacion, setPresentacion] = useState('');

    // Limpiar campos del formulario
    const limpiarCampos = async () => {
        setNombre('');
        setFecha('');
        setDescripcion('');
        setExistencias('');
        setCategoria('');
        setMarca('');
        setPresentacion('');
    };

    const showDeleteDialog = (id) => {
        setIdToDelete(id);
        setDeleteDialogVisible(true);
    };

    const hideDeleteDialog = () => setDeleteDialogVisible(false);

    // Función para obtener datos de la API
    const fillList = async () => {
        try {
            // Realiza una solicitud GET para verificar la sesión del usuario
            const response = await fetch(`${ip}/Expo2024/expo/api/servicios/administrador/producto.php?action=readAll`, {
                method: 'GET'
            });
            const data = await response.json();
            setResponse(data.dataset);
        } catch (error) {
            console.error(error);
            Alert.alert('Error');
        }
    };

    const getCategorias = async () => {
        try {
            //utilizar la direccion IP del servidor y no localhost
            const response = await fetch(`${ip}/Expo2024/expo/api/servicios/administrador/categoria.php?action=readAll`, {
                method: 'GET',
            });
            const data = await response.json();
            if (data.status) {
                setDataCategorias(data.dataset);
            } else {
                Alert.alert('Error categorias', data.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al listar las categorias');
        }
    };

    const getMarcas = async () => {
        try {
            //utilizar la direccion IP del servidor y no localhost
            const response = await fetch(`${ip}/Expo2024/expo/api/servicios/administrador/marca.php?action=readAll`, {
                method: 'GET',
            });
            const data = await response.json();
            if (data.status) {
                setDataMarcas(data.dataset);
            } else {
                Alert.alert('Error marcas', data.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al listar las marcas');
        }
    };

    const getPresentacion = async () => {
        try {
            //utilizar la direccion IP del servidor y no localhost
            const response = await fetch(`${ip}/Expo2024/expo/api/servicios/administrador/presentacion.php?action=readAll`, {
                method: 'GET',
            });
            const data = await response.json();
            if (data.status) {
                setDataPresentaciones(data.dataset);
            } else {
                Alert.alert('Error presentaciones', data.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al listar las presentaciones');
        }
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        /*
        Codigo para convertir la fecha al formato año-mes-dia */

        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

        const fecha = `${year}-${month}-${day}`;
        setFecha(fecha);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    // Insertar nuevos registros en la API
    const insertarProductos = async () => {
        try {
            const formData = new FormData();
            formData.append('nombre_producto', nombre);
            formData.append('fecha_producto', Fecha);
            formData.append('descripcion_producto', Descripcion);
            formData.append('presentacion_producto', Presentacion);
            formData.append('categoria_producto', Categoria);
            formData.append('marca_producto', Marca);
            formData.append('existencias_producto', Existencias);
            const data = await fetch(`${ip}/Expo2024/expo/api/servicios/administrador/producto.php?action=createRow`, {
                method: 'POST',
                body: formData
            });
            const response = await data.json();
            if (response.status) {
                limpiarCampos();
                fillList();
                hideModal();
                Alert.alert('Mensaje',response.message);
            } else {
                Alert.alert('Error',response.error);
            }
        } catch (error) {
            Alert.alert('No se pudo acceder a la API ' + response.error);
        }
    };

    const actualizarProductos = async () => {
        try {
            const formData = new FormData();
            formData.append('id_producto', idToUpdate);
            formData.append('nombre_producto', nombre);
            formData.append('fecha_producto', Fecha);
            formData.append('descripcion_producto', Descripcion);
            formData.append('presentacion_producto', Presentacion);
            formData.append('categoria_producto', Categoria);
            formData.append('marca_producto', Marca);
            formData.append('existencias_producto', Existencias);
            const data = await fetch(`${ip}/Expo2024/expo/api/servicios/administrador/producto.php?action=updateRow`, {
                method: 'POST',
                body: formData
            });
            const response = await data.json();
            if (response.status) {
                Alert.alert('Mensaje',response.message);
                limpiarCampos();
                fillList();
                hideModal();
            } else {
                Alert.alert('Error',response.error);
            }
        } catch (error) {
            Alert.alert('No se pudo acceder a la API ' + response.error);
        }
    };

    const openUpdate = async (id) => {
        const formData = new FormData();
        formData.append('id_producto', id);
        try {
            const response = await fetch(`${ip}/Expo2024/expo/api/servicios/administrador/producto.php?action=readOne`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (data.status) {
                const row = data.dataset;
                setIdToUpdate(row.id_producto);
                setNombre(row.nombre_producto);
                setFecha(row.fecha_vencimiento);
                setDescripcion(row.descripcion);
                setExistencias(String(row.existencias_producto));
                setCategoria(row.id_categoria);
                setMarca(row.id_marca);
                setPresentacion(row.id_tipo_presentacion);
                showModal();
            } else {
                Alert.alert('Error', data.error || 'No se pudo obtener la información del producto');
            }
        } catch (error) {
            console.log('Error en la solicitud:', error);
            Alert.alert('Error', 'Ocurrió un error al intentar obtener los datos del producto');
        }
    };

        // Confirmar eliminación de registros
        const confirmarEliminacion = () => {
            eliminarRegistros(idToDelete);
        };

        const eliminarRegistros = async (idA) => {
            try {
                const formData = new FormData();
                formData.append('id_producto', idA);
                const data = await fetch(`${ip}/Expo2024/expo/api/servicios/administrador/producto.php?action=deleteRow`, {
                    method: 'POST',
                    body: formData
                });
                const response = await data.json();
                if (response.status) {
                    Alert.alert(response.message);
                    fillList();
                } else {
                    Alert.alert('Error',response.error);
                }
            } catch (error) {
                Alert.alert('No se pudo acceder a la API ' + response.error);
            }
            hideDeleteDialog();
        };
    


    // Ejecuta fillList al montar el componente
    useEffect(() => {
        fillList();
        getCategorias();
        getMarcas();
        getPresentacion();
    }, []);

    // Ejecuta fillList cuando la pantalla recibe foco
    useFocusEffect(
        useCallback(() => {
            fillList();
            getCategorias();
            getMarcas();
            getPresentacion();
        }, [])
    );

    // Identificador de si se ingresa o se actualiza
    const handleSubmit = () => {
        if (idToUpdate) {
            actualizarProductos();
        } else {
            insertarProductos();
        }
    };


    // Función que renderiza cada ítem en la lista.
    const renderItem = ({ item }) => (
        <Card style={styles.card}>
            <Card.Content>
                <Title>Producto: {item.nombre_producto}</Title>
                <Paragraph>Vencimiento: {item.fecha_vencimiento}</Paragraph>
                <Paragraph>Existencias: {item.existencias_producto}</Paragraph>
                <Paragraph>Marca: {item.nombre_marca}</Paragraph>
                <Paragraph>Descripcion: {item.descripcion}</Paragraph>
                <View style={styles.containerButtons}>
                    <TouchableOpacity style={styles.buttonActualizar} onPress={() => openUpdate(item.id_producto)}>
                        <Text style={styles.botonTexto}>Actualizar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonEliminar} onPress={() => showDeleteDialog(item.id_producto)}>
                        <Text style={styles.botonTexto}>Eliminar</Text>
                    </TouchableOpacity>
                </View>
            </Card.Content>
        </Card>
    );

    // Retornamos el componente.
    return (
        <Provider>
            <View style={styles.container}>
                {/* Barra de búsqueda */}
                <Searchbar
                    placeholder="Buscar producto"
                    // onChangeText={onChangeSearch}
                    value={searchQuery}
                    style={styles.searchbar}
                />
                {/* Botón para añadir nuevo producto */}
                <Button onPress={showModal} style={styles.addButton}>
                    <MaterialCommunityIcons name="plus-circle-outline" size={22} color="#9368EE" />
                </Button>
                <FlatList
                    data={response}
                    renderItem={renderItem}
                    keyExtractor={item => item.id_producto.toString()}
                />
                {/* Modal para añadir nuevo producto */}
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
                        <Button onPress={hideModal} style={styles.closeButton}>
                            <MaterialCommunityIcons name="close-thick" size={20} color="red" />
                        </Button>
                        <Text style={styles.title}>
                                    {idToUpdate ? 'Actualizar producto' : 'Agregar producto'}
                                </Text>
                        <TextInput
                            label="Nombre"
                            value={nombre}
                            onChangeText={text => setNombre(text)}
                            style={styles.input}
                        />
                        <TextInput
                            label="Existencias"
                            value={Existencias}
                            onChangeText={text => setExistencias(text)}
                            style={styles.input}
                        />
                        <TextInput
                            label="Descripción"
                            value={Descripcion}
                            onChangeText={text => setDescripcion(text)}
                            style={styles.input}
                        />
                        <View style={styles.contenedorFecha}>
                            <TouchableOpacity onPress={showDatepicker}><Text style={styles.fechaSeleccionar}>Seleccionar fecha vencimiento:</Text></TouchableOpacity>
                            <Text style={styles.fecha}>Seleccion: {Fecha}</Text>
                            {show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={mode}
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChange}
                                />
                            )}
                        </View>
                        <View style={styles.pickerContainer}>
                            <RNPickerSelect
                                onValueChange={(value) => setMarca(value)}
                                value={Marca}
                                placeholder={{ label: 'Seleccione una marca', value: null }}
                                items={dataMarcas.map(marca => ({
                                    label: marca.nombre_marca,
                                    value: marca.id_marca,
                                }))}
                            />
                        </View>
                        <View style={styles.pickerContainer}>
                            <RNPickerSelect
                                onValueChange={(value) => setPresentacion(value)}
                                value={Presentacion}
                                placeholder={{ label: 'Seleccione una presentación', value: null }}
                                items={dataPresentaciones.map(presentacion => ({
                                    label: presentacion.tipo_presentacion,
                                    value: presentacion.id_tipo_presentacion,
                                }))}
                            />
                        </View>
                        <View style={styles.pickerContainer}>
                            <RNPickerSelect
                                onValueChange={(value) => setCategoria(value)}
                                value={Categoria}
                                placeholder={{ label: 'Seleccione una categoría', value: null }}
                                items={dataCategorias.map(categoria => ({
                                    label: categoria.nombre_categoria,
                                    value: categoria.id_categoria,
                                }))}
                            />
                        </View>
                        <Button mode="contained" style={styles.saveButton} onPress={handleSubmit}>
                            guardar
                        </Button>
                    </Modal>
                    <Dialog visible={deleteDialogVisible} onDismiss={hideDeleteDialog}>
                        <Dialog.Title>Advertencia</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>¿Desea eliminar el producto de forma permanente?</Paragraph>
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

// Definimos los estilos para el componente.
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
    pickerContainer: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    contenedorFecha: {

        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    fecha: {
        fontSize: 16,
    },
    fechaSeleccionar: {
        paddingBottom: 15,
        color: '#000',
    },
    containerButtons: {
        justifyContent: 'space-between',
        flexDirection: 'row',
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
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
