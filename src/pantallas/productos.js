// Importamos React y useState para poder utilizar estados en el componente.
import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import * as Constantes from '../utilidades/constante';
// Importamos los componentes necesarios de react-native y react-native-paper.
import { View, FlatList, StyleSheet } from 'react-native';
import { Searchbar, Card, Title, Paragraph, Modal, Portal, Text, Button, TextInput, Provider } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
// Importamos los iconos de MaterialCommunityIcons de @expo/vector-icons.
import { MaterialCommunityIcons } from '@expo/vector-icons';


// Definimos el componente principal de Productos.
export default function Productos() {
    const ip = Constantes.IP;
    // Definimos los estados necesarios.
    const [searchQuery, setSearchQuery] = useState('');
    const [dataCategorias, setDataCategorias] = useState([])
    const [dataMarcas, setDataMarcas] = useState([])
    const [dataPresentaciones, setDataPresentaciones] = useState([])
    const [visible, setVisible] = useState(false);

    // Función para mostrar el modal.
    const showModal = () => setVisible(true);
    // Función para ocultar el modal.
    const hideModal = () => {
        setVisible(false);
        limpiarCampos();
    }

    // Estados para manejar los datos, carga y errores
    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nombre, setNombre] = useState('');
    const [Fecha, setFecha] = useState('');
    const [Descripcion, setDescripcion] = useState('');
    const [Existencias, setExistencias] = useState('');
    const [Categoria, setCategoria] = useState('');
    const [Marca, setMarca] = useState('');
    const [Presentacion, setPresentacion] = useState('');
    const [error, setError] = useState(null);

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

    // Función para obtener datos de la API
    const fillList = async () => {
        try {
            // Realiza una solicitud GET para verificar la sesión del usuario
            const response = await fetch(`${ip}/Expo2024/expo/api/servicios/administrador/producto.php?action=readAll`, {
                method: 'GET'
            });
            const data = await response.json();
            setResponse(data.dataset)
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
                setDataCategorias(data.dataset)
            } else {
                console.log(data);
                // Alert the user about the error
                Alert.alert('Error categorias', data.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al listar las categorias');
        }
    }

    const getMarcas = async () => {
        try {

            //utilizar la direccion IP del servidor y no localhost
            const response = await fetch(`${ip}/Expo2024/expo/api/servicios/administrador/marca.php?action=readAll`, {
                method: 'GET',
            });

            const data = await response.json();
            if (data.status) {
                setDataMarcas(data.dataset)
            } else {
                console.log(data);
                // Alert the user about the error
                Alert.alert('Error marcas', data.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al listar las marcas');
        }
    }

    const getPresentacion = async () => {
        try {

            //utilizar la direccion IP del servidor y no localhost
            const response = await fetch(`${ip}/Expo2024/expo/api/servicios/administrador/presentacion.php?action=readAll`, {
                method: 'GET',
            });

            const data = await response.json();
            if (data.status) {
                setDataPresentaciones(data.dataset)
            } else {
                console.log(data);
                // Alert the user about the error
                Alert.alert('Error presentaciones', data.error);
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al listar las presentaciones');
        }
    }

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

    // Función que renderiza cada ítem en la lista.
    const renderItem = ({ item }) => (
        <Card style={styles.card}>
            <Card.Content>
                <Title>Producto: {item.nombre_producto}</Title>
                <Paragraph>Vencimiento: {item.fecha_vencimiento}</Paragraph>
                <Paragraph>Existencias: {item.existencias_producto}</Paragraph>
                <Paragraph>Marca: {item.nombre_marca}</Paragraph>
                <Paragraph>Descripcion: {item.descripcion}</Paragraph>
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
                        <TextInput
                            label="Nombre"
                            // value={newProduct.name}
                            onChangeText={text => handleInputChange('name', text)}
                            style={styles.input}
                        />
                        <TextInput
                            label="Fecha vencimiento"
                            // value={newProduct.expiration}
                            onChangeText={text => handleInputChange('expiration', text)}
                            style={styles.input}
                        />
                        <TextInput
                            label="Descripción"
                            // value={newProduct.description}
                            onChangeText={text => handleInputChange('description', text)}
                            style={styles.input}
                        />
                        <TextInput
                            label="Existencias"
                            // value={newProduct.stock}
                            onChangeText={text => handleInputChange('stock', text)}
                            style={styles.input}
                        />
                        <View>
                            <View style={styles.pickerContainer}>
                                <RNPickerSelect
                                    onValueChange={(value) => getMarcas(value)}
                                    placeholder={{ label: 'Selecciona una marca...', value: null }}
                                    items={dataMarcas.map(marca => ({
                                        label: marca.nombre_marca,
                                        value: marca.id_marca,
                                    }))}
                                />
                            </View>
                        </View>
                        <View>
                            <View style={styles.pickerContainer}>
                                <RNPickerSelect
                                    onValueChange={(value) => getPresentacion(value)}
                                    placeholder={{ label: 'Selecciona una presentación...', value: null }}
                                    items={dataPresentaciones.map(presentacion => ({
                                        label: presentacion.tipo_presentacion,
                                        value: presentacion.id_tipo_presentacion,
                                    }))}
                                />
                            </View>
                        </View>
                        <View>
                            <View style={styles.pickerContainer}>
                                <RNPickerSelect
                                    onValueChange={(value) => getCategorias(value)}
                                    placeholder={{ label: 'Selecciona una categoría...', value: null }}
                                    items={dataCategorias.map(categoria => ({
                                        label: categoria.nombre_categoria,
                                        value: categoria.id_categoria,
                                    }))}
                                />
                            </View>
                        </View>
                        <Button mode="contained" style={styles.saveButton}>
                            Guardar
                        </Button>
                    </Modal>
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
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
});
