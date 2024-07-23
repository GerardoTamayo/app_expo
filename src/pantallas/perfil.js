import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// Supongamos que los datos del usuario están disponibles en este objeto
const user = {
  name: 'Juan Pérez',
  email: 'juan.perez@example.com',
  phone: '+1234567890',
  address: '123 Calle Falsa, Ciudad, País',
  profileImage: 'https://via.placeholder.com/150'
};

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.value}>{user.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Correo:</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Teléfono:</Text>
          <Text style={styles.value}>{user.phone}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Dirección:</Text>
          <Text style={styles.value}>{user.address}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff'
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20
  },
  infoContainer: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    width: 80,
  },
  value: {
    flex: 1,
  },
});

export default ProfileScreen;
