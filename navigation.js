import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Productos from './pantallas/productos';
import Categoria from './pantallas/categorias';
import Presentaciones from './pantallas/presentaciones';
import Marca from './pantallas/marcas';
import Inicio from './pantallas/index';
import { color } from "react-native-elements/dist/helpers";

const Tab = createBottomTabNavigator();

function Mytabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: 'purple',
            }}>
                            <Tab.Screen
                name="Home"
                component={Inicio}
                options={{
                    tabBarLabel: 'Inicio',
                    tabBarIcon:({color, size}) =>(
                        <MaterialCommunityIcons name="home-variant-outline" size={24} color="black" />
                    ),
                    headerShown:true,
                    headerStyle:{
                        backgroundColor:'#9368EE'
                    },
                }}
            />
            <Tab.Screen
                name="Productos"
                component={Productos}
                options={{
                    tabBarLabel: 'Productos',
                    tabBarIcon:({color, size}) =>(
                        <MaterialCommunityIcons name="inbox-multiple" size={24} color="black" />
                    ),
                    headerShown:true,
                    headerStyle:{
                        backgroundColor:'#9368EE'
                    },
                }}
            />
                        <Tab.Screen
                name="Categorias"
                component={Categoria}
                options={{
                    tabBarLabel: 'Categorias',
                    tabBarIcon:({color, size}) =>(
                        <MaterialCommunityIcons name="text-box-outline" size={24} color="black" />
                    ),
                    headerShown:true,
                    headerStyle:{
                        backgroundColor:'#9368EE'
                    },
                }}
            />
            <Tab.Screen
                name="Marcas"
                component={Marca}
                options={{
                    tabBarLabel: 'Marcas',
                    tabBarIcon:({color, size}) =>(
                        <MaterialCommunityIcons name="label-multiple" size={24} color="black" />
                    ),
                    headerShown:true,
                    headerStyle:{
                        backgroundColor:'#9368EE'
                    },
                }}
            />
            <Tab.Screen
            name="Presentaciones"
            component={Presentaciones}
            options={{
                tabBarLabel:'Presentaciones',
                tabBarIcon:({color, size}) =>(
                    <MaterialCommunityIcons name="database-arrow-up-outline" size={24} color="black" />
                ),
                headerShown:true,
                headerStyle:{
                    backgroundColor:'#9368EE'
                },
            }}></Tab.Screen>
        </Tab.Navigator>
    );
}
export default Mytabs;
// export default function Navigation() {
//     return (
//         <NavigationContainer>
//             <Mytabs />
//         </NavigationContainer>
//     )
// }


