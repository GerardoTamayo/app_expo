import React from 'react';
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Inicio = () => {

    const Cajas = () =>{
        return(
            <View style={styles.boxContainer}>
                <View style={styles.box}>
                    <View style={styles.inner}>
                    <MaterialCommunityIcons name="inbox-multiple" size={85} color="black" />
                        <Text>Productos</Text>
                    </View>
                </View>

                <View style={styles.box}>
                    <View style={styles.inner2}>
                    <MaterialCommunityIcons name="label-multiple" size={85} color="black" />
                        <Text>Marcas</Text>
                    </View>
                </View>

                <View style={styles.box}>
                    <View style={styles.inner3}>
                    <MaterialCommunityIcons name="database-arrow-up-outline" size={85} color="black" />
                        <Text>Presentaciones</Text>
                    </View>
                </View>

                <View style={styles.box}>
                    <View style={styles.inner4}>
                    <MaterialCommunityIcons name="text-box-outline" size={85} color="black" />
                        <Text>Categorias</Text>
                    </View>
                </View>
            </View>
        )
    }

    return(
        <SafeAreaView style={StyleSheet.container}>
            <Cajas/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    boxContainer:{
        width:'100%',
        height:'85%',
        padding:5,
        flexDirection:'row',
        flexWrap:'wrap'
    },
    box:{
        width:'50%',
        height:'50%',
        padding:5,
    },
    inner:{
        flex:1,
        backgroundColor:'#FFB6B6',
        alignItems:'center',
        justifyContent:'center'
    },
    inner2:{
        flex:1,
        backgroundColor:'#FFD178',
        alignItems:'center',
        justifyContent:'center'
    },
    inner3:{
        flex:1,
        backgroundColor:'#8CFF98',
        alignItems:'center',
        justifyContent:'center'
    },
    inner4:{
        flex:1,
        backgroundColor:'#99AFFF',
        alignItems:'center',
        justifyContent:'center'
    },
});

export default Inicio;