import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Searchbar, Card, Title, Paragraph, Modal, Portal, Text, Button, TextInput, Provider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const marcaPrueba = [
    { id: '1', name:'Marca', brands: 'Zucarita' },
    { id: '2', name:'Marca', brands: 'Club max gama' },
    { id: '3', name:'Marca', brands: 'Del cañal' },
    { id: '4', name:'Marca', brands: 'Knorr' },
    { id: '5', name:'Marca', brands: 'Orisol'},
];

export default function Marcas() {
        const [brands, setBrands] = useState(marcaPrueba);
        const [searchQuery, setSearchQuery] = useState('');
        const [visible, setVisible] = useState(false);
        const [newBrand, setBrand] = useState({
            brands: '',
        });
    
        const onChangeSearch = query => setSearchQuery(query);
    
        const filteredBrands =  brands.filter(brand =>
            brand.brands.toLowerCase().includes(searchQuery.toLowerCase())
        );
    
        const renderItem = ({ item }) => (
            <Card style={styles.card}>
                <Card.Content>
                    <Title>{item.name}</Title>
                    <Paragraph>Marca: {item.brands}</Paragraph>
                </Card.Content>
            </Card>
        );
    
        const showModal = () => setVisible(true);
        const hideModal = () => setVisible(false);
    
        const handleInputChange = (brands, value) => {
            setBrand({ ...newBrand, [brands]: value });
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
                        placeholder="Buscar Marca"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                        style={styles.searchbar}
                    />
                    <Button onPress={showModal} style={styles.addButton}>
                    <MaterialCommunityIcons name="plus-circle-outline" size={22} color="#9368EE" />
                    </Button>
                    <FlatList
                        data={filteredBrands}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
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