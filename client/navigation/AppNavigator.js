// client/navigation/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../views/Home';
import CrearJugador from '../views/CrearJugador';
import Jugadores from '../views/Jugadores';
import Clubes from '../views/Clubes';
import DetalleJugador from '../views/DetalleJugador';
import Estadisticas from '../views/Estadisticas';
import TabNavigator from '../tabs/TabNavigator';
import AuthStackNavigator from './AuthStackNavigation';
import MiPerfil from '../views/MiPerfil';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Credenciales'>
      <Stack.Screen name="Credenciales" component={AuthStackNavigator} />
      <Stack.Screen name="Inicio" component={Home} />
      <Stack.Screen name="Agregar Jugador" component={CrearJugador} />
      <Stack.Screen name="Mi perfil" component={MiPerfil} />
      <Stack.Screen name="Clubes" component={Clubes} />
      <Stack.Screen name="Jugadores" component={Jugadores} />
      <Stack.Screen name="Información Jugador" component={DetalleJugador} />
      <Stack.Screen name="Estadísticas" component={Estadisticas} />
      <Stack.Screen name='TabNavigator' component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
