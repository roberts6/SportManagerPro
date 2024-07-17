import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native-web";
import EditarDatos from "../views/editarDatos.js";  

const Tab = createBottomTabNavigator();

const TabNavigator = ({ route }) => {
    const { jugador } = route.params;
    return (
        <Tab.Navigator
        screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: styles.TabBar
        }}>
            <Tab.Screen name='Editar Datos' component={EditarDatos} initialParams={{ jugador }}/>
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    TabBar:{
        backgroundColor: "green",
        height: 50,
        position: 'absolute',
        marginBottom: 40
    }
})


export default TabNavigator;
