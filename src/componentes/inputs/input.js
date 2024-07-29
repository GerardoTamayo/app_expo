
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';


export default function Input({ placeHolder, setValor, contra, setTextChange }) {

    return (

        <TextInput
            style={styles.Input}
            placeholder={placeHolder}
            value={setValor}
            placeholderTextColor={'#000000'}
            secureTextEntry={contra}
            onChangeText={setTextChange}
        />

    );
}

const styles = StyleSheet.create({
    Input: {
        backgroundColor: '#ffffff',
        color: "#000000",
        height: Platform.OS === 'ios' ? 50 : 50, // Estilo de la barra de pestañas, altura diferente para iOS y Android
        width: 300,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },

});