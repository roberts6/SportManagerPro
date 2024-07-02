import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CrearJugador from './client/views/CrearJugador';
import Home from './client/views/Home';
import Jugadores from './client/views/Jugador';
import Clubes from './client/views/Clubes.js';
import store from './server/Store/Store.js';
import { Provider } from "react-redux";

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
