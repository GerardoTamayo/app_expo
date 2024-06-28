// Importamos React para poder utilizar JSX y React components.
import React from 'react';

// Importamos los componentes necesarios de react-native.
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

// Definimos el componente de Login como una función.
export default function Login({ navigation }) {

    // Función que maneja el evento de inicio de sesión.
    const handlerLogin = async () => {
        // Navegamos a la pantalla principal de navegación.
        navigation.navigate('navigation');
    };

    // Función que maneja el evento de recuperación de contraseña.
    const Recuperar = async () => {
        // Navegamos a la pantalla de ingreso de código de recuperación.
        navigation.navigate('CodeInput');
    };    

    return (
        // Vista principal del componente de login.
        <View style={styles.container}>
            {/* Texto de bienvenida */}
            <Text style={styles.welcomeText}>Bienvenido</Text>
            {/* Campo de entrada para el correo electrónico */}
            <TextInput style={styles.input} placeholder="Correo electronico" />
            {/* Campo de entrada para la contraseña */}
            <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry />
            {/* Botón para recuperar la contraseña */}
            <TouchableOpacity onPress={Recuperar}>
                <Text style={styles.forgotPasswordText}>Recuperar contraseña</Text>
            </TouchableOpacity>
            {/* Botón para iniciar sesión */}
            <TouchableOpacity onPress={handlerLogin} style={styles.loginButton}>
                <Text style={styles.loginButtonText}>INICIAR SESIÓN</Text>
            </TouchableOpacity>
        </View>
    );
}

// Estilos para el componente de login.
const styles = StyleSheet.create({
    // Estilo para el contenedor principal.
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    // Estilo para el texto de bienvenida.
    welcomeText: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 40,
    },
    // Estilo para los campos de entrada.
    input: {
        width: '100%',
        height: 50,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        fontSize: 18,
    },
    // Estilo para el texto de recuperación de contraseña.
    forgotPasswordText: {
        fontSize: 16,
        color: '#000',
        marginBottom: 20,
        display: 'flex',
        justifyContent:'flex-end',
    },
    // Estilo para el botón de inicio de sesión.
    loginButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#9368EE',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    // Estilo para el texto del botón de inicio de sesión.
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
