import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, Pressable } from 'react-native';
import MiPerfil from '../views/MiPerfil';
import EditarDatos from '../views/editarDatos';

const Tab = createBottomTabNavigator();

const TabNavigator = ({ route }) => {
    const { usuarioDatos } = route.params;
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
                initialParams={{ usuarioDatos }}
                options={{
                    tabBarButton: ({ onPress }) => (
                        <Pressable onPress={onPress} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>🤾 Mi Perfil</Text>
                        </Pressable>
                    ),
                }}
            />
            <Tab.Screen 
                name="Editar datos Tab"
                component={EditarDatos}
                initialParams={{ usuarioDatos }}
                options={{
                    tabBarButton: ({ onPress }) => (
                        <Pressable onPress={onPress} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
        height: 50,
        width: '100%',
        marginBottom: 40,
        flexDirection: 'row',
    },
});

export default TabNavigator;

