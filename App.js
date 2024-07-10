import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from "react-redux";
import store from './server/Store/Store.js';

import EditarDatos from './client/views/editarDatos.js';
import CrearJugador from './client/views/CrearJugador';
import Home from './client/views/Home';
import Jugadores from './client/views/Jugadores.js';
import Clubes from './client/views/Clubes.js';
import DetalleJugador from './client/views/DetalleJugador.js';
import Estadisticas from './client/views/Estadisticas.js';
import TabNavigator from './client/tabs/TabNavigator.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator initialRouteName='Home'> 
          <Stack.Screen name="Inicio" component={Home} />
          <Stack.Screen name="Agregar Jugador" component={CrearJugador} />
          <Stack.Screen name="Clubes" component={Clubes} />
          <Stack.Screen name="Jugadores" component={Jugadores} />
          <Stack.Screen name="Información Jugador" component={DetalleJugador} />
          <Stack.Screen name="Estadísticas" component={Estadisticas} />
          <Stack.Screen name='TabNavigator' component={TabNavigator}/>
          <Stack.Screen name='Editar Datos' component={EditarDatos}/>
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
