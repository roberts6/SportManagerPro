import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, Pressable, View } from 'react-native';
import MiPerfil from '../views/MiPerfil';
import EditarDatos from '../views/editarDatos';

const Tab = createBottomTabNavigator();

const TabNavigator = ({ route }) => {
    const { completeUsuarioDatos } = route.params;
    console.log("datos en el tabNavigator",completeUsuarioDatos)
    return (
        <Tab.Navigator 
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
            }}
        >
            <Tab.Screen
                name="Mi Perfil Tab"
                component={MiPerfil}
                initialParams={{ completeUsuarioDatos }}
                options={{
                    tabBarButton: ({ onPress }) => (
                        <Pressable onPress={onPress} style={styles.tabBarButton}>
                            <Text>🤾 Mi Perfil</Text>
                        </Pressable>
                    ),
                }}
            />
            <Tab.Screen 
                name="Editar datos Tab"
                component={EditarDatos}
                initialParams={{ completeUsuarioDatos }}
                options={{
                    tabBarButton: ({ onPress }) => (
                        <Pressable onPress={onPress} style={styles.tabBarButton}>
                            <Text>✏️ Editar</Text>
                        </Pressable>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        height: 60,
        width: '100%',
        marginBottom: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarButton: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%',  
        marginTop:'4%'
    },
});

export default TabNavigator;
