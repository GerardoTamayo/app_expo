import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function Login({ navigation }) {

    const handlerLogin = async () => {
        navigation.navigate('navigation');
    };

    // const irRegistrar = async () => {
    //     navigation.navigate('Registro');
    // };

    // const Recuperar = async () => {
    //     navigation.navigate('RecuperarContrasenia');
    // };    

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Bienvenido</Text>
            <TextInput style={styles.input} placeholder="Correo electronico" />
            <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry />
            <TouchableOpacity>
                <Text style={styles.forgotPasswordText}>Recuperar contraseña</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handlerLogin} style={styles.loginButton}>
                <Text style={styles.loginButtonText}>INICIAR SESIÓN</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    welcomeText: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 40,
    },
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
    forgotPasswordText: {
        fontSize: 16,
        color: '#000',
        marginBottom: 20,
        display: 'flex',
        justifyContent:'flex-end',
    },
    loginButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#9368EE',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});