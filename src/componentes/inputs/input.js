import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
// Importación de módulos necesarios de react-native para crear estilos y utilizar componentes básicos como Text, View, TextInput, etc.

export default function Input({ placeHolder, setValor, contra, setTextChange }) {
    // Componente funcional Input que recibe cuatro props:
    // placeHolder para el texto de marcador, setValor para manejar el valor del input, 
    // contra para determinar si el texto debe ser oculto, y setTextChange para manejar el cambio de texto.

    return (
        <TextInput
            style={styles.Input} // Aplica los estilos definidos en el objeto styles.
            placeholder={placeHolder} // Texto de marcador de posición que se muestra cuando el campo está vacío.
            value={setValor} // Valor actual del campo de texto.
            placeholderTextColor={'#000000'} // Color del texto del marcador de posición.
            secureTextEntry={contra} // Si contra es true, el texto se oculta como si fuera una contraseña.
            onChangeText={setTextChange} // Función que se ejecuta cuando el texto cambia.
        />
    );
}

const styles = StyleSheet.create({
    Input: {
        backgroundColor: '#ffffff', // Color de fondo blanco para el campo de texto.
        color: "#000000", // Color del texto en negro.
        height: Platform.OS === 'ios' ? 50 : 50, // Altura del campo de texto, igual para iOS y Android.
        width: 300, // Ancho del campo de texto.
        padding: 10, // Espaciado interno.
        borderWidth: 1, // Grosor del borde.
        borderColor: '#ccc', // Color del borde gris claro.
        borderRadius: 5, // Bordes redondeados.
        marginBottom: 10, // Espacio debajo del campo de texto.
    },
});
// Definición de los estilos utilizados en el componente TextInput, ajustando la apariencia según la plataforma.
