import { StyleSheet, TextInput, Platform } from 'react-native';
// Importación de módulos necesarios de react-native para crear estilos y utilizar el componente TextInput.

export default function Input_email({ placeHolder, setValor, setTextChange }) {
    // Componente funcional Input_email que recibe tres props: placeHolder para el texto de marcador, 
    // setValor para establecer el valor del input, y setTextChange para manejar los cambios de texto.

    return (
        <TextInput
            style={styles.Input} // Aplica los estilos definidos en el objeto styles.
            placeholder={placeHolder} // Texto de marcador de posición que se muestra cuando el campo está vacío.
            value={setValor} // Valor actual del campo de texto.
            placeholderTextColor={'#000000'} // Color del texto del marcador de posición.
            onChangeText={setTextChange} // Función que se ejecuta cuando el texto cambia.
            keyboardType="email-address" // Establece el teclado específico para direcciones de correo electrónico.
            autoCapitalize='none' // Desactiva la capitalización automática de las primeras letras.
        />
    );
}

const styles = StyleSheet.create({
    Input: {
        backgroundColor: '#ffffff', // Color de fondo blanco para el campo de texto.
        color: "#000000", // Color del texto en negro.
        width: 300, // Ancho del campo de texto.
        padding: 10, // Espaciado interno.
        borderWidth: 1, // Grosor del borde.
        borderColor: '#ccc', // Color del borde gris claro.
        borderRadius: 5, // Bordes redondeados.
        marginBottom: 10, // Espacio debajo del campo de texto.
        padding: Platform.OS === 'ios' ? 15 : 10, // Diferente padding para iOS y Android.
    },
});
// Definición de los estilos utilizados en el componente TextInput, ajustando la apariencia según la plataforma.
