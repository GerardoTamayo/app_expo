// Importamos React y useState para poder utilizar los estados en el componente.
import React, { useState } from 'react';

// Importamos los componentes necesarios de react-native y react-native-paper.
import { View, FlatList, StyleSheet } from 'react-native';
import { Searchbar, Card, Title, Paragraph, Modal, Portal, Text, Button, TextInput, Provider } from 'react-native-paper';

// Importamos los iconos de MaterialCommunityIcons de @expo/vector-icons.
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Definimos una lista de marcas de prueba.
const marcaPrueba = [
    { id: '1', name: 'Marca', brands: 'Zucarita' },
    { id: '2', name: 'Marca', brands: 'Club max gama' },
    { id: '3', name: 'Marca', brands: 'Del cañal' },
    { id: '4', name: 'Marca', brands: 'Knorr' },
    { id: '5', name: 'Marca', brands: 'Orisol' },
];

// Definimos el componente principal de Marcas.
export default function Marcas() {
    // Definimos los estados necesarios.
    const [brands, setBrands] = useState(marcaPrueba);
    const [searchQuery, setSearchQuery] = useState('');
    const [visible, setVisible] = useState(false);
    const [newBrand, setBrand] = useState({
        brands: '',
    });

    // Función que maneja el cambio en el campo de búsqueda.
    const onChangeSearch = query => setSearchQuery(query);

    // Filtramos las marcas según la consulta de búsqueda.
    const filteredBrands = brands.filter(brand =>
        brand.brands.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Función que renderiza cada ítem en la lista.
    const renderItem = ({ item }) => (
        <Card style={styles.card}>
            <Card.Content>
                <Title>{item.name}</Title>
                <Paragraph>Marca: {item.brands}</Paragraph>
            </Card.Content>
        </Card>
    );

    // Función para mostrar el modal.
    const showModal = () => setVisible(true);

    // Función para ocultar el modal.
    const hideModal = () => setVisible(false);

    // Función que maneja el cambio de texto en el campo de nueva marca.
    const handleInputChange = (brands, value) => {
        setBrand({ ...newBrand, [brands]: value });
    };

    // Retornamos el componente.
    return (
        <Provider>
            <View style={styles.container}>
                {/* Barra de búsqueda */}
                <Searchbar
                    placeholder="Buscar Marca"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    style={styles.searchbar}
                />
                {/* Botón para añadir nueva marca */}
                <Button onPress={showModal} style={styles.addButton}>
                    <MaterialCommunityIcons name="plus-circle-outline" size={22} color="#9368EE" />
                </Button>
                {/* Lista de marcas filtradas */}
                <FlatList
                    data={filteredBrands}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
                {/* Modal para añadir nueva marca */}
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
                        <Button onPress={hideModal} style={styles.closeButton}>
                            <MaterialCommunityIcons name="close-thick" size={20} color="red" />
                        </Button>
                        <TextInput
                            label="Marca"
                            value={newBrand.brand}
                            onChangeText={text => handleInputChange('brand', text)}
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
