import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Sesion from './pantallas/login';
import Navigation from './navigation';
import Codigo from './pantallas/recuperar_contra1';
import CambiarContra from './pantallas/recuperar_contra2';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Sesion'
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Sesion" component={Sesion} />
        <Stack.Screen name="navigation" component={Navigation} />
        <Stack.Screen name="CodeInput" component={Codigo} options={{ title: 'Recuperación de Contraseña' }} />
        <Stack.Screen name="NewPassword" component={CambiarContra} options={{ title: 'Nueva Contraseña' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
