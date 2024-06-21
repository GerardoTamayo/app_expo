import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Searchbar, Card, Title, Paragraph, Modal, Portal, Text, Button, TextInput, Provider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const productosPrueba = [
    { id: '1', name: 'Cereal del zucarita', expiration: '17/11/2025', stock: 25, brand: 'zucarita' },
    { id: '2', name: 'Cereal del zucarita', expiration: '17/11/2025', stock: 25, brand: 'zucarita' },
    { id: '3', name: 'Cereal del zucarita', expiration: '17/11/2025', stock: 25, brand: 'zucarita' },
    { id: '4', name: 'Cereal del zucarita', expiration: '17/11/2025', stock: 25, brand: 'zucarita' },
    { id: '5', name: 'Cereal del zucarita', expiration: '17/11/2025', stock: 25, brand: 'zucarita' },
];

export default function Productos() {
    const [products, setProducts] = useState(productosPrueba);
    const [searchQuery, setSearchQuery] = useState('');
    const [visible, setVisible] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        expiration: '',
        description: '',
        stock: '',
        category: '',
        brand: '',
        presentation: '',
    });

    const onChangeSearch = query => setSearchQuery(query);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderItem = ({ item }) => (
        <Card style={styles.card}>
            <Card.Content>
                <Title>{item.name}</Title>
                <Paragraph>Vencimiento: {item.expiration}</Paragraph>
                <Paragraph>Existencias: {item.stock}</Paragraph>
                <Paragraph>Marca: {item.brand}</Paragraph>
            </Card.Content>
        </Card>
    );

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const handleInputChange = (name, value) => {
        setNewProduct({ ...newProduct, [name]: value });
    };

    // const addProduct = () => {
    //     setProducts([...products, { ...newProduct, id: (products.length + 1).toString() }]);
    //     setNewProduct({
    //         name: '',
    //         expiration: '',
    //         description: '',
    //         stock: '',
    //         category: '',
    //         brand: '',
    //         presentation: '',
    //     });
    //     hideModal();
    // };

    return (
        <Provider>
            <View style={styles.container}>
                <Searchbar
                    placeholder="Buscar producto"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    style={styles.searchbar}
                />
                <Button onPress={showModal} style={styles.addButton}>
                <MaterialCommunityIcons name="plus-circle-outline" size={22} color="#9368EE" />
                </Button>
                <FlatList
                    data={filteredProducts}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
                        <Button onPress={hideModal} style={styles.closeButton}>
                            <MaterialCommunityIcons name="close-thick" size={20} color="red" />
                        </Button>
                        <TextInput
                            label="Nombre"
                            value={newProduct.name}
                            onChangeText={text => handleInputChange('name', text)}
                            style={styles.input}
                        />
                        <TextInput
                            label="Fecha vencimiento"
                            value={newProduct.expiration}
                            onChangeText={text => handleInputChange('expiration', text)}
                            style={styles.input}
                        />
                        <TextInput
                            label="Descripcion"
                            value={newProduct.description}
                            onChangeText={text => handleInputChange('description', text)}
                            style={styles.input}
                        />
                        <TextInput
                            label="Existencias"
                            value={newProduct.stock}
                            onChangeText={text => handleInputChange('stock', text)}
                            style={styles.input}
                        />
                        <TextInput
                            label="Categoria"
                            value={newProduct.category}
                            onChangeText={text => handleInputChange('category', text)}
                            style={styles.input}
                        />
                        <TextInput
                            label="Marca"
                            value={newProduct.brand}
                            onChangeText={text => handleInputChange('brand', text)}
                            style={styles.input}
                        />
                        <TextInput
                            label="Presentacion"
                            value={newProduct.presentation}
                            onChangeText={text => handleInputChange('presentation', text)}
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
        marginBottom: 10
    },
});

