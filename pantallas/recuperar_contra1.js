// screens/Codigo.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function Codigo({ navigation }) {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const handleConfirmCode = () => {
    // Aquí puedes agregar la lógica para verificar el código
    // Por ahora, simplemente navegamos a la pantalla de nueva contraseña
    navigation.navigate('NewPassword');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ingresa tu correo electrónico</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="usuario@gmail.com"
        keyboardType="email-address"
      />
      <Text style={styles.label}>Ingrese código de verificación</Text>
      <TextInput
        style={styles.input}
        onChangeText={setCode}
        value={code}
        placeholder="******"
        secureTextEntry
      />
      <Button title="Confirmar código" onPress={handleConfirmCode} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
