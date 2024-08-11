import React, { useState, useRef, useEffect, useCallback } from 'react'; // Importa React y algunos hooks de React
import { useFocusEffect } from '@react-navigation/native';
import * as Constantes from '../utilidades/constante'; // Importa constantes desde un archivo local
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';


const ProfileScreen = () => {
    const ip = Constantes.IP; // Asigna la IP desde las constantes a una variable local
    const [modalVisible, setModalVisible] = useState(false);
    const [perfil, setPerfil] = useState(null); // Estado para almacenar los datos del perfil
    const [nombre, setNombre] = useState(''); // Estado para el nombre
    const [apellido, setApellido] = useState(''); // Estado para el apellido
    const [correo, setCorreo] = useState(''); // Estado para el correo


    // Función para mostrar el modal.
    const showModal = () => setVisible(true);
    // Función para ocultar el modal.
    const hideModal = () => {
        setModalVisible(false);
        limpiarCampos();
    };

    // Limpiar campos del formulario
    const limpiarCampos = async () => {
        setNombre('');
        setApellido('');
        setCorreo('');
    };

    // Función para leer el perfil del usuario desde una API
    const readProfile = async () => {
        try {
            const response = await fetch(`${ip}/Expo2024/expo/api/servicios/administrador/usuario.php?action=readProfile`, {
                method: 'GET',
            });

            const data = await response.json();
            if (data.status) {
                setPerfil(data.dataset); // Guarda los datos del perfil en el estado
                setNombre(data.dataset.nombre_usuario); // Establece el nombre en el estado
                setApellido(data.dataset.apellido_usuario); // Establece el apellido en el estado
                setCorreo(data.dataset.correo_usuario); // Establece el correo en el estado
            } else {
                Alert.alert('Error', data.error); // Muestra un mensaje de error si la respuesta no es exitosa
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al obtener los datos del perfil'); // Muestra un mensaje de error si ocurre una excepción
        }
    };

    // Función para manejar la actualización de los datos del perfil
    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('nombre_perfil', nombre); // Añade el nombre al FormData
            formData.append('apellido_perfil', apellido); // Añade el apellido al FormData
            formData.append('correo_perfil', correo); // Añade el correo al FormData

            const url = `${ip}/Expo2024/expo/api/servicios/administrador/usuario.php?action=editProfile`;

            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.status) {
                Alert.alert('Perfil actualizado', data.message); // Muestra un mensaje de éxito
                readProfile(); // Vuelve a leer el perfil actualizado
                hideModal();
                limpiarCampos();
            } else {
                Alert.alert('No se pudo actualizar el perfil', data.error); // Muestra un mensaje de error si no se pudo actualizar
            }
        } catch (error) {
            Alert.alert('Ocurrió un error al actualizar el perfil', data.error); // Muestra un mensaje de error si ocurre una excepción
        }
    };

    // Hook useEffect para leer el perfil cuando el componente se monta
    useEffect(() => {
        readProfile();
    }, []);

    
    // Ejecuta fillList cuando la pantalla recibe foco
    useFocusEffect(
        useCallback(() => {
            readProfile();
        }, [])
    );

    return (
        <SafeAreaView style={styles.container}>
            {perfil ? ( // Verifica si los datos del perfil están disponibles
                <>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <View style={styles.profileContainer}>
                            <Image source={require('../imagenes/perfil.jpg')} style={styles.profileImage} />
                            <View style={styles.infoContainer}>
                                <View style={styles.row}>
                                    <Icon name="person" size={24} color="#333" />
                                    <Text style={styles.label}>Nombres:</Text>
                                    <Text style={styles.value}>{perfil.nombre_usuario}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Icon name="person" size={24} color="#333" />
                                    <Text style={styles.label}>Apellidos:</Text>
                                    <Text style={styles.value}>{perfil.apellido_usuario}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Icon name="email" size={24} color="#333" />
                                    <Text style={styles.label}>Correo:</Text>
                                    <Text style={styles.value}>{perfil.correo_usuario}</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
                                <Text style={styles.editButtonText}>Editar Perfil</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </>
            ) : (
                <Text>Cargando...</Text> // Muestra un mensaje de carga si los datos del perfil no están disponibles
            )}
            <Modal
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => {
                    setModalVisible(!modalVisible); // Cierra el modal cuando se solicita
                }}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Editar Perfil</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nombres"
                        value={nombre}
                        onChangeText={setNombre}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Apellidos"
                        value={apellido}
                        onChangeText={setApellido}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Correo"
                        value={correo}
                        onChangeText={setCorreo}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button, styles.updateButton]} onPress={handleUpdate}>
                            <Text style={styles.buttonText}>Actuzalizar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setModalVisible(false)} >
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        alignContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    button: {
        flex: 1,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: '#ff4d4d',
    },
    updateButton: {
        backgroundColor: '#4da6ff',
    },
    scrollContainer: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    profileContainer: {
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: 120,
        padding: 20,
        borderRadius: 10,
        width: '95%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    infoContainer: {
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        marginBottom: 15,
    },
    label: {
        fontWeight: 'bold',
        marginLeft: 10,
        width: 80,
    },
    value: {
        flex: 1,
        marginLeft: 1,
    },
    editButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#6200ea',
        borderRadius: 5,
    },
    editButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 15,
        padding: 10,
    },
});

export default ProfileScreen;
