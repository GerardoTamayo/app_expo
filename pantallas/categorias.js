// Importamos React y useState para poder utilizar los estados en el componente.
import React, { useState } from 'react';

// Importamos los componentes necesarios de react-native y react-native-paper.
import { View, FlatList, StyleSheet } from 'react-native';
import { Searchbar, Card, Title, Paragraph, Modal, Portal, Text, Button, TextInput, Provider } from 'react-native-paper';

// Importamos los iconos de MaterialCommunityIcons de @expo/vector-icons.
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Definimos una lista de categorías de prueba.
const categoriaPrueba = [
    { id: '1', name: 'Categoria', categories: 'Zucarita' },
    { id: '2', name: 'Categoria', categories: 'Club max gama' },
    { id: '3', name: 'Categoria', categories: 'Del cañal' },
    { id: '4', name: 'Categoria', categories: 'Knorr' },
    { id: '5', name: 'Categoria', categories: 'Orisol' },
];

// Definimos el componente principal de Categorias.
export default function Categorias() {
    // Definimos los estados necesarios.
    const [categories, setCategories] = useState(categoriaPrueba);
    const [searchQuery, setSearchQuery] = useState('');
    const [visible, setVisible] = useState(false);
    const [newCategory, setCategory] = useState({
        categories: '',
    });

    // Función que maneja el cambio en el campo de búsqueda.
    const onChangeSearch = query => setSearchQuery(query);

    // Filtramos las categorías según la consulta de búsqueda.
    const filteredCategories = categories.filter(category =>
        category.categories.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Función que renderiza cada ítem en la lista.
    const renderItem = ({ item }) => (
        <Card style={styles.card}>
            <Card.Content>
                <Title>{item.name}</Title>
                <Paragraph>Marca: {item.categories}</Paragraph>
            </Card.Content>
        </Card>
    );

    // Función para mostrar el modal.
    const showModal = () => setVisible(true);

    // Función para ocultar el modal.
    const hideModal = () => setVisible(false);

    // Función que maneja el cambio de texto en el campo de nueva categoría.
    const handleInputChange = (categories, value) => {
        setCategory({ ...newCategory, [categories]: value });
    };

    // Retornamos el componente.
    return (
        <Provider>
            <View style={styles.container}>
                {/* Barra de búsqueda */}
                <Searchbar
                    placeholder="Buscar Categoria"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    style={styles.searchbar}
                />
                {/* Botón para añadir nueva categoría */}
                <Button onPress={showModal} style={styles.addButton}>
                    <MaterialCommunityIcons name="plus-circle-outline" size={22} color="#9368EE" />
                </Button>
                {/* Lista de categorías filtradas */}
                <FlatList
                    data={filteredCategories}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
                {/* Modal para añadir nueva categoría */}
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
                        <Button onPress={hideModal} style={styles.closeButton}>
                            <MaterialCommunityIcons name="close-thick" size={20} color="red" />
                        </Button>
                        <TextInput
                            label="Categoria"
                            value={newCategory.category}
                            onChangeText={text => handleInputChange('category', text)}
                            style={styles.input}
                        />
                        <Button mode="contained" style={styles.saveButton}>
                            Guardar
                        </Button>
                    </Modal>
                </Portal>
            </View>
        </Provider>
    );
}

// Definimos los estilos para el componente.
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 10,
    },
    searchbar: {
        marginBottom: 10,
    },
    card: {
        marginBottom: 10,
    },
    addButton: {
        marginTop: 5,
        alignSelf: "flex-end",
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
    },
    input: {
        marginBottom: 10,
    },
    saveButton: {
        marginTop: 5,
        backgroundColor: 'blue',
        width: 150,
        alignSelf: "flex-end",
    },
    closeButton: {
        marginTop: 10,
        width: 5,
        alignSelf: "flex-end",
        marginBottom: 10,
    },
});
