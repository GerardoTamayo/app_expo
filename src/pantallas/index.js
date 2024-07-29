// Importamos React para poder utilizar JSX y React components.
import React from 'react';
import * as Constantes from '../utilidades/constante';

// Importamos los componentes necesarios de react-native.
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";

// Importamos los iconos de MaterialCommunityIcons de @expo/vector-icons.
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Definimos el componente de Inicio como una función.
export default function Inicio({ navigation }) {
    // Obtiene la IP del archivo de constantes.
    const ip = Constantes.IP;

    const handleLogout = async () => {
        // Función para manejar el cierre de sesión.
        try {
            const response = await fetch(`${ip}/Expo2024/expo/api/servicios/administrador/usuario.php?action=logOut`, {
                method: 'GET'
            });
            // Realiza una solicitud GET para cerrar la sesión.

            const data = await response.json();
            // Convierte la respuesta a formato JSON.

            if (data.status) {
                navigation.navigate('Sesion');
                // Navega a la pantalla de inicio si la respuesta es exitosa.
            } else {
                console.log(data);
                // Muestra el error en la consola.
                Alert.alert('Error', data.error);
                // Muestra una alerta con el error.
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al cerrar la sesión');
            // Muestra una alerta si ocurre una excepción.
        }
    };

    // Componente que define las cajas con los iconos y textos.
    const Cajas = () => {
        return (
            // Contenedor principal de las cajas.
            <View style={styles.boxContainer}>
                {/* Caja de Productos */}
                <View style={styles.box}>
                    <View style={styles.inner}>
                        <MaterialCommunityIcons name="inbox-multiple" size={85} color="black" />
                        <Text>Productos</Text>
                    </View>
                </View>

                {/* Caja de Marcas */}
                <View style={styles.box}>
                    <View style={styles.inner2}>
                        <MaterialCommunityIcons name="label-multiple" size={85} color="black" />
                        <Text>Marcas</Text>
                    </View>
                </View>

                {/* Caja de Presentaciones */}
                <View style={styles.box}>
                    <View style={styles.inner3}>
                        <MaterialCommunityIcons name="database-arrow-up-outline" size={85} color="black" />
                        <Text>Presentaciones</Text>
                    </View>
                </View>

                {/* Caja de Categorías */}
                <View style={styles.box}>
                    <View style={styles.inner4}>
                        <MaterialCommunityIcons name="text-box-outline" size={85} color="black" />
                        <Text>Categorias</Text>
                    </View>
                </View>

                {/* Botón para cerrar sesión */}
                <TouchableOpacity onPress={handleLogout} style={styles.loginButton}>
                    <MaterialCommunityIcons name="logout" size={25} color="white" />
                    <Text style={styles.loginButtonText}>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        // SafeAreaView que envuelve el contenido de la pantalla para mantenerlo dentro de los límites seguros del dispositivo.
        <SafeAreaView style={StyleSheet.container}>
            {/* Renderizamos el componente Cajas */}
            <Cajas />
        </SafeAreaView>
    );
}

// Estilos para el componente de Inicio.
const styles = StyleSheet.create({
    // Estilo para el contenedor principal.
    container: {
        flex: 1
    },
    // Estilo para el contenedor de las cajas.
    boxContainer: {
        width: '100%',
        height: '85%',
        padding: 5,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    // Estilo para cada caja.
    box: {
        width: '50%',
        height: '50%',
        padding: 5,
    },
    // Estilo para el contenido de la caja de Productos.
    inner: {
        flex: 1,
        backgroundColor: '#FFB6B6',
        alignItems: 'center',
        justifyContent: 'center'
    },
    // Estilo para el contenido de la caja de Marcas.
    inner2: {
        flex: 1,
        backgroundColor: '#FFD178',
        alignItems: 'center',
        justifyContent: 'center'
    },
    // Estilo para el contenido de la caja de Presentaciones.
    inner3: {
        flex: 1,
        backgroundColor: '#8CFF98',
        alignItems: 'center',
        justifyContent: 'center'
    },
    // Estilo para el contenido de la caja de Categorías.
    inner4: {
        flex: 1,
        backgroundColor: '#99AFFF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    // Estilo para el botón de cerrar sesión.
    loginButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#EC7373',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    // Estilo para el texto del botón de cerrar sesión.
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
