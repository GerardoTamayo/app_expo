// Importamos React para poder utilizar JSX y React components.
import React, { useEffect, useState } from 'react';
import * as Constantes from '../utilidades/constante';
import { useFocusEffect } from '@react-navigation/native';
import InputEmail from '../componentes/inputs/input_email';
import Input from '../componentes/inputs/input';

// Importamos los componentes necesarios de react-native.
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

// Definimos el componente de Login como una función.
export default function Login({ navigation }) {
    // Obtiene la IP desde las constantes
    // Esto es lo que se ocupa para mandar datos de la web
    const ip = Constantes.IP;

    // Definición de estados locales
    const [isContra, setIsContra] = useState(true); // Estado para manejar la visibilidad de la contraseña
    const [email, setEmail] = useState(''); // Estado para almacenar el email
    const [contrasenia, setPassword] = useState(''); // Estado para almacenar la contraseña

    // Efecto para cargar los detalles del carrito al cargar la pantalla o al enfocarse en ella
    useFocusEffect(
        // La función useFocusEffect ejecuta un efecto cada vez que la pantalla se enfoca.
        React.useCallback(() => {
            validarSesion(); // Llama a la función validarSesion.
        }, [])
    );

    // Función para validar la sesión del usuario
    const validarSesion = async () => {
        try {
            // Realiza una solicitud GET para verificar la sesión del usuario
            const response = await fetch(`${ip}/Expo2024/expo/api/servicios/administrador/usuario.php?action=getUser`, {
                method: 'GET'
            });

            const data = await response.json();

            if (data.status === 1) {
                navigation.navigate('navigation'); // Navega a la pantalla principal si hay sesión activa
                console.log("Se ingresa con la sesión activa");
            } else {
                console.log("No hay sesión activa");
                return;
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Ocurrió un error al validar la sesión');
        }
    };

    // Función para iniciar sesión
    const Login = async () => {
        if (!email || !contrasenia) {
            Alert.alert('Error', 'Por favor ingrese su correo y contraseña');
            return;
        }

        try {
            // Crea un objeto FormData con los datos de inicio de sesión
            const formData = new FormData();
            formData.append('correo', email);
            formData.append('contra', contrasenia);

            // Realiza una solicitud POST para iniciar sesión
            const response = await fetch(`${ip}/Expo2024/expo/api/servicios/administrador/usuario.php?action=logIn`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.status) {
                setPassword('');
                setEmail('');
                navigation.navigate('navigation'); // Navega a la pantalla principal si el inicio de sesión es exitoso
            } else {
                console.log(data);
                Alert.alert('Error sesión', data.error);
            }
        } catch (error) {
            console.error(error, "Error desde Catch");
            Alert.alert('Error', 'Ocurrió un error al iniciar sesión');
        }
    };
    // Efecto para validar la sesión cuando se monta el componente
    useEffect(() => { validarSesion() }, []);

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
            <InputEmail
                placeHolder={"Correo electronico"}
                setValor={email}
                setTextChange={setEmail}
            />
            {/* Campo de entrada para la contraseña */}
            <Input
                placeHolder={"Contraseña"}
                setValor={contrasenia}
                setTextChange={setPassword}
                contra={isContra}
            />
            {/* Botón para recuperar la contraseña */}
            <TouchableOpacity onPress={Recuperar}>
                <Text style={styles.forgotPasswordText}>Recuperar contraseña</Text>
            </TouchableOpacity>
            {/* Botón para iniciar sesión */}
            <TouchableOpacity onPress={Login} style={styles.loginButton}>
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
        justifyContent: 'flex-end',
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
