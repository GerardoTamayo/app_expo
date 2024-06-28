// Importamos React para poder utilizar JSX y React components.
import React from 'react';

// Importamos NavigationContainer de @react-navigation/native para envolver nuestra estructura de navegación.
import { NavigationContainer } from '@react-navigation/native';

// Importamos createNativeStackNavigator de @react-navigation/native-stack para crear un stack de navegación.
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importamos las pantallas que utilizaremos en nuestra aplicación.
import Sesion from './src/pantallas/login';
import Navigation from './src/navegation/navigation';
import Codigo from './src/pantallas/recuperar_contra1';
import CambiarContra from './src/pantallas/recuperar_contra2';

// Función principal de la aplicación que será exportada como el componente principal.
export default function App() {
    // Creamos una instancia del stack de navegación.
    const Stack = createNativeStackNavigator();

    return (
        // NavigationContainer envuelve toda la estructura de navegación para proporcionar el contexto necesario.
        <NavigationContainer>
            {/* Definimos el Stack Navigator con las pantallas de la aplicación */}
            <Stack.Navigator
                // Definimos la pantalla inicial de la aplicación.
                initialRouteName='Sesion'
                // Opciones globales para las pantallas, en este caso desactivamos el header.
                screenOptions={{
                    headerShown: false
                }}>
                {/* Definimos cada pantalla en el Stack Navigator */}
                <Stack.Screen name="Sesion" component={Sesion} />
                <Stack.Screen name="navigation" component={Navigation} />
                {/* La pantalla para ingresar el código de recuperación de contraseña */}
                <Stack.Screen name="CodeInput" component={Codigo} options={{ title: 'Recuperación de Contraseña' }} />
                {/* La pantalla para cambiar la contraseña */}
                <Stack.Screen name="NewPassword" component={CambiarContra} options={{ title: 'Nueva Contraseña' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
