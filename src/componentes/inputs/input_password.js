import { StyleSheet, Platform, TextInput } from 'react-native';
// Importación de módulos necesarios de react-native para crear estilos y utilizar el componente TextInput.

export default function Input_password({ placeHolder, setValor, contra, valor }) {
    // Componente funcional Input_password que recibe cuatro props: 
    // placeHolder para el texto de marcador, setValor para manejar el cambio de texto, 
    // contra para determinar si el texto debe ser oculto, y valor para establecer el valor actual del input.

    return (
        <TextInput
            style={styles.Input} // Aplica los estilos definidos en el objeto styles.
            placeholder={placeHolder} // Texto de marcador de posición que se muestra cuando el campo está vacío.
            value={valor} // Valor actual del campo de texto.
            onChangeText={setValor} // Función que se ejecuta cuando el texto cambia.
            placeholderTextColor={'#000000'} // Color del texto del marcador de posición.
            secureTextEntry={contra} // Si contra es true, el texto se oculta como si fuera una contraseña.
            multiline={true} // Permite que el texto ocupe varias líneas.
            numberOfLines={4} // Especifica el número de líneas visibles.
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
