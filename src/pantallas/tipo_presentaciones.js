// Importamos React y useState para poder utilizar estados en el componente.
import React, { useState, useEffect } from 'react';

// Importamos los componentes necesarios de react-native y react-native-paper.
import { View, FlatList, StyleSheet } from 'react-native';
import { Searchbar, Card, Title, Paragraph, Modal, Portal, Text, Button, TextInput, Provider } from 'react-native-paper';

// Importamos los iconos de MaterialCommunityIcons de @expo/vector-icons.
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Importamos SQLite
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('quickstock.db');

// Inicializamos la base de datos
const initializeDatabase = () => {
    db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS tipo_presentaciones (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                presentation TEXT
            );`,
            [],
            () => { console.log('Tabla creada exitosamente'); },
            (error) => { console.log('Error al crear la tabla', error); }
        );
    });
};

// Definimos el componente principal de Presentaciones.
export default function Presentaciones() {
    const [presentations, setPresentations] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [visible, setVisible] = useState(false);
    const [newPresentation, setPresentation] = useState({
        name: '',
        presentation: '',
    });

    // Cargar las presentaciones al iniciar el componente
    useEffect(() => {
        initializeDatabase();
        loadPresentations();
    }, []);

    // Función para cargar presentaciones desde la base de datos
    const loadPresentations = () => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM tipo_presentaciones',
                [],
                (tx, results) => {
                    let temp = [];
                    for (let i = 0; i < results.rows.length; i++) {
                        temp.push(results.rows.item(i));
                    }
                    setPresentations(temp);
                },
                (error) => { console.log('Error al cargar las presentaciones', error); }
            );
        });
    };

    // Función para añadir una nueva presentación
    const addPresentation = () => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO tipo_presentaciones (name, presentation) VALUES (?, ?)',
                [newPresentation.name, newPresentation.presentation],
                (tx, results) => {
                    if (results.rowsAffected > 0) {
                        loadPresentations();
                        hideModal();
                    }
                },
                (error) => { console.log('Error al insertar', error); }
            );
        });
    };

    // Función para eliminar una presentación
    const deletePresentation = (id) => {
        db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM tipo_presentaciones WHERE id = ?',
                [id],
                (tx, results) => {
                    if (results.rowsAffected > 0) {
                        loadPresentations();
                    }
                },
                (error) => { console.log('Error al eliminar', error); }
            );
        });
    };

    // Función que maneja el cambio en el campo de búsqueda
    const onChangeSearch = query => setSearchQuery(query);

    // Filtramos las presentaciones según la consulta de búsqueda
    const filteredPresentations = presentations.filter(presentation =>
        presentation.presentation.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Función que renderiza cada ítem en la lista
    const renderItem = ({ item }) => (
        <Card style={styles.card}>
            <Card.Content>
                <Title>{item.name}</Title>
                <Paragraph>Presentación: {item.presentation}</Paragraph>
            </Card.Content>
            <Card.Actions>
                <Button onPress={() => deletePresentation(item.id)}>
                    Eliminar
                </Button>
            </Card.Actions>
        </Card>
    );

    // Función para mostrar el modal
    const showModal = () => setVisible(true);

    // Función para ocultar el modal
    const hideModal = () => setVisible(false);

    // Función que maneja el cambio de texto en el campo de nueva presentación
    const handleInputChange = (field, value) => {
        setPresentation({ ...newPresentation, [field]: value });
    };

    return (
        <Provider>
            <View style={styles.container}>
                {/* Barra de búsqueda */}
                <Searchbar
                    placeholder="Buscar Presentación"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    style={styles.searchbar}
                />
                {/* Botón para añadir nueva presentación */}
                <Button onPress={showModal} style={styles.addButton}>
                    <MaterialCommunityIcons name="plus-circle-outline" size={22} color="#9368EE" />
                </Button>
                {/* Lista de presentaciones filtradas */}
                <FlatList
                    data={filteredPresentations}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                />
                {/* Modal para añadir nueva presentación */}
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
                        <Button onPress={hideModal} style={styles.closeButton}>
                            <MaterialCommunityIcons name="close-thick" size={20} color="red" />
                        </Button>
                        <TextInput
                            label="Nombre"
                            value={newPresentation.name}
                            onChangeText={text => handleInputChange('name', text)}
                            style={styles.input}
                        />
                        <TextInput
                            label="Presentación"
                            value={newPresentation.presentation}
                            onChangeText={text => handleInputChange('presentation', text)}
                            style={styles.input}
                        />
                        <Button mode="contained" onPress={addPresentation} style={styles.saveButton}>
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
        marginBottom: 7,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#fff',
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
