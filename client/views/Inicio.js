import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import TabNavigator from '../tabs/TabNavigator';
import { useBusquedaXmail } from '../features/utilidades/busquedaXmail';

const Inicio = ({ route, navigation }) => {
  const { usuario, showTabNavigator } = route.params || {};
  const email = usuario ? usuario.email : null;
  const usuarioDatos = useBusquedaXmail(email);

  const [mostrarTabNavigator, setMostrarTabNavigator] = useState(false);

  const mostrarBotones = () => {
    setMostrarTabNavigator(false);
  };

  const mostrarTab = () => {
    setMostrarTabNavigator(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {usuarioDatos && usuarioDatos.nombre ? ( // Verifica si usuarioDatos no es null y contiene la propiedad 'nombre'
          <Text>Hola {usuarioDatos.nombre}!</Text>
        ) : (
          <Text>Cargando...</Text> // Muestra un mensaje de carga en caso de que usuarioDatos sea null o no tenga 'nombre'
        )}
        <View style={styles.vista}>
          <Image source={require('../imagenes/avatarX.png')} style={styles.image} />
        </View>
      </View>
      {!mostrarTabNavigator && (
        <View>
          <Button title="Jugadores" onPress={() => { mostrarTab(); mostrarBotones(); navigation.navigate('Jugadores'); }} />
          <Button title="Clubes" onPress={() => { mostrarTab(); mostrarBotones(); navigation.navigate('Clubes'); }} />
          <Button title="Agregar Jugador" onPress={() => { mostrarTab(); mostrarBotones(); navigation.navigate('Agregar Jugador'); }} />
        </View>
      )}
      {mostrarTabNavigator && <TabNavigator usuarioDatos={usuarioDatos} />}
      {/* <TabNavigator usuarioDatos={usuarioDatos} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vista: {
    marginTop: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  header: {
    marginTop: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});

export default Inicio;

