import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Searchbar, Card, Title, Paragraph, Modal, Portal, Text, Button, TextInput, Provider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const presentacionesPrueba = [
    { id: '1', name:'Presentación', presentation: 'Caja' },
    { id: '2', name:'Presentación', presentation: 'Caja' },
    { id: '3', name:'Presentación', presentation: 'Arroba' },
    { id: '4', name:'Presentación', presentation: 'Caja' },
    { id: '5', name:'Presentación', presentation: 'Fardo'},
];

export default function Presentaciones() {
        const [presentations, setPresentations] = useState(presentacionesPrueba);
        const [searchQuery, setSearchQuery] = useState('');
        const [visible, setVisible] = useState(false);
        const [newPresentation, setPresentation] = useState({
            presentation: '',
        });
    
        const onChangeSearch = query => setSearchQuery(query);
    
        const filteredPresentations = presentations.filter(presentation =>
            presentation.presentation.toLowerCase().includes(searchQuery.toLowerCase())
        );
    
        const renderItem = ({ item }) => (
            <Card style={styles.card}>
                <Card.Content>
                    <Title>{item.name}</Title>
                    <Paragraph>Presentacion: {item.presentation}</Paragraph>
                </Card.Content>
            </Card>
        );
    
        const showModal = () => setVisible(true);
        const hideModal = () => setVisible(false);
    
        const handleInputChange = (presentation, value) => {
            setPresentation({ ...newPresentation, [presentation]: value });
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
                        placeholder="Buscar Presentacion"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                        style={styles.searchbar}
                    />
                    <Button onPress={showModal} style={styles.addButton}>
                    <MaterialCommunityIcons name="plus-circle-outline" size={22} color="#9368EE" />
                    </Button>
                    <FlatList
                        data={filteredPresentations}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                    <Portal>
                        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
                            <Button onPress={hideModal} style={styles.closeButton}>
                                <MaterialCommunityIcons name="close-thick" size={20} color="red" />
                            </Button>
                            <TextInput
                                label="Presentacion"
                                value={newPresentation.presentation}
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