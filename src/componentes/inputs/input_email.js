
import { StyleSheet, TextInput, Platform } from 'react-native';

export default function Input_email({ placeHolder, setValor, setTextChange }) {

    return (

        <TextInput
            style={styles.Input}
            placeholder={placeHolder}
            value={setValor}
            placeholderTextColor={'#000000'}
            onChangeText={setTextChange}
            keyboardType="email-address"
            autoCapitalize='none'
        />

    );
}

const styles = StyleSheet.create({
    Input: {
        backgroundColor: '#ffffff',
        color: "#000000",
        width: 300,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        padding: Platform.OS === 'ios' ? 15 : 10, // Estilo de la barra de pestañas, altura diferente para iOS y Android,
    },

});