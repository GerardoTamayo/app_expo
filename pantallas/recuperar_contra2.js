// screens/CambiarContra.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function CambiarContra({ navigation }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleConfirmPassword = () => {
    // Aquí puedes agregar la lógica para cambiar la contraseña
    // Por ahora, simplemente mostramos una alerta
    if (newPassword === confirmPassword) {
      alert('Contraseña cambiada exitosamente');
      // Redirigir a la pantalla de inicio o login
    } else {
      alert('Las contraseñas no coinciden');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ingrese una nueva contraseña</Text>
      <TextInput
        style={styles.input}
        onChangeText={setNewPassword}
        value={newPassword}
        placeholder="********"
        secureTextEntry
      />
      <Text style={styles.label}>Confirmar contraseña</Text>
      <TextInput
        style={styles.input}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        placeholder="********"
        secureTextEntry
      />
      <Button title="Confirmar contraseña" onPress={handleConfirmPassword} />
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
