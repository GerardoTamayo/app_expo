// Importamos React para poder utilizar JSX y React components.
import React from "react";

// Importamos el componente para crear un Bottom Tab Navigator de @react-navigation/bottom-tabs.
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Importamos NavigationContainer de @react-navigation/native para envolver nuestra estructura de navegación.
import { NavigationContainer } from '@react-navigation/native';

// Importamos el componente para crear un Native Stack Navigator de @react-navigation/native-stack.
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importamos los iconos de MaterialCommunityIcons de @expo/vector-icons.
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Importamos las pantallas que utilizaremos en nuestra aplicación.
import Productos from '../pantallas/productos';
import Categoria from '../pantallas/categorias';
import Presentaciones from '../pantallas/presentaciones';
import Marca from '../pantallas/marcas';
import Inicio from '../pantallas/index';
import Perfil from '../pantallas/perfil';
import { color } from "react-native-elements/dist/helpers";

// Creamos una instancia del Bottom Tab Navigator.
const Tab = createBottomTabNavigator();

// Definimos el componente Mytabs como una función que retorna el Tab Navigator configurado.
function Mytabs() {
    return (
        // Definimos el Tab Navigator con sus pantallas y opciones.
        <Tab.Navigator
            // Configuramos opciones globales para las pantallas del Tab Navigator.
            screenOptions={{
                headerShown: false, // No mostrar el encabezado por defecto.
                tabBarActiveTintColor: 'purple', // Color de los iconos activos en la barra de navegación.
            }}>
            {/* Definimos cada pantalla en el Tab Navigator */}
            <Tab.Screen
                name="Home"
                component={Inicio}
                options={{
                    tabBarLabel: 'Inicio', // Etiqueta de la pestaña.
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home-variant-outline" size={24} color="black" />
                    ),
                    headerShown: true, // Mostrar el encabezado para esta pantalla.
                    headerStyle: {
                        backgroundColor: '#9368EE' // Color de fondo del encabezado.
                    },
                }}
            />
            <Tab.Screen
                name="Productos"
                component={Productos}
                options={{
                    tabBarLabel: 'Productos', // Etiqueta que se muestra en la barra de pestañas para esta pantalla.
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="inbox-multiple" size={24} color="black" />
                        // Ícono que se muestra en la barra de pestañas, utilizando un ícono de MaterialCommunityIcons.
                    ),
                    headerShown: true, // Muestra el encabezado en la parte superior de la pantalla.
                    headerStyle: {
                        backgroundColor: '#9368EE' // Establece el color de fondo del encabezado.
                    },
                }}
            />

            <Tab.Screen
                name="Categorias"
                component={Categoria}
                options={{
                    tabBarLabel: 'Categorias', // Etiqueta que se muestra en la barra de pestañas para esta pantalla.
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="text-box-outline" size={24} color="black" />
                        // Ícono que se muestra en la barra de pestañas, utilizando un ícono de MaterialCommunityIcons.
                    ),
                    headerShown: true, // Muestra el encabezado en la parte superior de la pantalla.
                    headerStyle: {
                        backgroundColor: '#9368EE' // Establece el color de fondo del encabezado.
                    },
                }}
            />

            <Tab.Screen
                name="Marcas"
                component={Marca}
                options={{
                    tabBarLabel: 'Marcas', // Etiqueta que se muestra en la barra de pestañas para esta pantalla.
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="label-multiple" size={24} color="black" />
                        // Ícono que se muestra en la barra de pestañas, utilizando un ícono de MaterialCommunityIcons.
                    ),
                    headerShown: true, // Muestra el encabezado en la parte superior de la pantalla.
                    headerStyle: {
                        backgroundColor: '#9368EE' // Establece el color de fondo del encabezado.
                    },
                }}
            />

            <Tab.Screen
                name="Presentaciones"
                component={Presentaciones}
                options={{
                    tabBarLabel: 'Presentaciones', // Etiqueta que se muestra en la barra de pestañas para esta pantalla.
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="database-arrow-up-outline" size={24} color="black" />
                        // Ícono que se muestra en la barra de pestañas, utilizando un ícono de MaterialCommunityIcons.
                    ),
                    headerShown: true, // Muestra el encabezado en la parte superior de la pantalla.
                    headerStyle: {
                        backgroundColor: '#9368EE' // Establece el color de fondo del encabezado.
                    },
                }}
            />

            <Tab.Screen
                name="Perfil"
                component={Perfil}
                options={{
                    tabBarLabel: 'Perfil', // Etiqueta que se muestra en la barra de pestañas para esta pantalla.
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-lock-open" size={24} color="black" />
                        // Ícono que se muestra en la barra de pestañas, utilizando un ícono de MaterialCommunityIcons.
                    ),
                    headerShown: true, // Muestra el encabezado en la parte superior de la pantalla.
                    headerStyle: {
                        backgroundColor: '#9368EE' // Establece el color de fondo del encabezado.
                    },
                }}
            />

            <Tab.Screen
                name="Perfil" // Etiqueta que se muestra en la barra de pestañas para esta pantalla.
                component={Perfil}
                options={{
                    tabBarLabel: 'Perfil',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-lock-open" size={24} color="black" />
                        // Ícono que se muestra en la barra de pestañas, utilizando un ícono de MaterialCommunityIcons.
                    ),
                    headerShown: true, // Muestra el encabezado en la parte superior de la pantalla.
                    headerStyle: {
                        backgroundColor: '#9368EE'
                    },
                }}
            />
        </Tab.Navigator>
    );
}

// Exportamos el componente Mytabs para que pueda ser utilizado en otros lugares.
export default Mytabs;

// export default function Navigation() {
//     return (
//         <NavigationContainer>
//             <Mytabs />
//         </NavigationContainer>
//     )
// }
