import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';

const user = {
  name: 'Juan Pérez',
  email: 'juan.perez@example.com',
  phone: '+1234567890',
  address: '123 Calle Falsa, Ciudad, País',
  profileImage: 'https://via.placeholder.com/150'
};

const ProfileScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState(user);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleInputChange = (key, value) => {
    setUserData({ ...userData, [key]: value });
  };

  const handleSave = () => {
    // Aquí podrías agregar la lógica para guardar los datos actualizados en tu backend o estado global
    toggleModal();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileContainer}>
          <Image source={{ uri: userData.profileImage }} style={styles.profileImage} />
          <View style={styles.infoContainer}>
            <View style={styles.row}>
              <Icon name="person" size={24} color="#333" />
              <Text style={styles.label}>Nombre:</Text>
              <Text style={styles.value}>{userData.name}</Text>
            </View>
            <View style={styles.row}>
              <Icon name="email" size={24} color="#333" />
              <Text style={styles.label}>Correo:</Text>
              <Text style={styles.value}>{userData.email}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={toggleModal}>
            <Text style={styles.editButtonText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Editar Perfil</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={userData.name}
            onChangeText={(text) => handleInputChange('name', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Correo"
            value={userData.email}
            onChangeText={(text) => handleInputChange('email', text)}
          />
          <Button title="Guardar" onPress={handleSave} />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignContent: 'center',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop:120,
    padding: 20,
    borderRadius: 10,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  infoContainer: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    marginLeft: 10,
    width: 80,
  },
  value: {
    flex: 1,
    marginLeft: 10,
  },
  editButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#6200ea',
    borderRadius: 5,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
    padding: 10,
  },
});

export default ProfileScreen;
