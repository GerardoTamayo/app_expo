import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as Constantes from '../utilidades/constante';

export default function Codigo({ navigation }) {
    const ip = Constantes.IP;
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [nivel, setNivel] = useState('');

    // Función para validar la sesión del usuario
    const enviarCorreo = async () => {
        try {
            const fechaActual = new Date();
            const formData = new FormData();
            formData.append('fecha', fechaActual.toISOString());
            formData.append('nivel', 1);
            formData.append('correo', email);

            // Realiza una solicitud GET para verificar la sesión del usuario
            const response = await fetch(`${ip}/Expo2024/expo/api/servicios/administrador/recuperacion.php?action=envioCorreo`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.status) {
                Alert.alert('mensaje', 'Correo enviado');
                navigation.navigate('Sesion');
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Ocurrió un error al enviar el correo');
        }
    };

    // regresara los datos que quiere corregir
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Ingresa tu correo electrónico</Text>
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="usuario@gmail.com"
                keyboardType="email-address"
            />
            <TouchableOpacity style={styles.button} onPress={enviarCorreo}> 
                <Text style={styles.buttonText}>Confirmar código</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#EAD8C0',
        justifyContent: 'center',
    },
    label: {
        fontSize: 16,
        marginVertical: 8,
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
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#9368EE',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});
