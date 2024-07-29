
import { StyleSheet, Platform, TextInput } from 'react-native';

export default function Input_password({ placeHolder, setValor, contra, valor }) {

    return (

        <TextInput
            style={styles.Input}
            placeholder={placeHolder}
            value={valor}
            onChangeText={setValor}
            placeholderTextColor={'#000000'}
            secureTextEntry={contra}
            multiline={true}
            numberOfLines={4}
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