import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Inicio from '../views/Inicio';
import CrearJugador from '../views/CrearJugador';
import Jugadores from '../views/Jugadores';
import Clubes from '../views/Clubes';
import DetalleJugador from '../views/DetalleJugador';
import Estadisticas from '../views/Estadisticas';
import TabNavigator from '../tabs/TabNavigator';
import AuthStackNavigator from './AuthStackNavigation';
import MiPerfil from '../views/MiPerfil';
import EditarDatos from '../views/editarDatos';
import Camara from '../features/utilidades/Camara.js'

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='Credenciales'>
            <Stack.Screen name="Credenciales" component={AuthStackNavigator} />
            <Stack.Screen name="Inicio" component={Inicio} />
            <Stack.Screen name='Datos usuario' component={TabNavigator} />
            <Stack.Screen name="Agregar Jugador" component={CrearJugador} />
            <Stack.Screen name="Editar datos" component={EditarDatos} />
            <Stack.Screen name="Mi Perfil" component={MiPerfil} />
            <Stack.Screen name="Clubes" component={Clubes} />
            <Stack.Screen name="Jugadores" component={Jugadores} />
            <Stack.Screen name="Información Jugador" component={DetalleJugador} />
            <Stack.Screen name="Estadísticas" component={Estadisticas} />
            <Stack.Screen name="Camara" component={Camara} />
        </Stack.Navigator>
    );
};


export default AppNavigator;

