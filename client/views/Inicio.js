import React from 'react';
import { View, Text, StyleSheet, Image, Button, SafeAreaView } from 'react-native';
import { useBusquedaXmail } from '../features/utilidades/busquedaXmail';
import { Colores } from '../features/utilidades/colores';
import VistaActual from '../features/utilidades/VistaActual';


const Inicio = ({ route, navigation }) => {
  const { usuario } = route.params || {};
  const email = usuario ? usuario.email : null;
  const usuarioDatos = useBusquedaXmail(email);

VistaActual();

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.content}>
          {usuarioDatos && usuarioDatos.nombre ? (
            <Text style={styles.greeting}>Hola {usuarioDatos.nombre}!</Text>
          ) : (
            <Text style={styles.greeting}>Sin datos del usuario...</Text>
          )}
          <View style={styles.vista}>
            <Image source={require('../imagenes/avatarX.png')} style={styles.image} />
          </View>
          <View style={styles.buttons}>
            <Button title="Jugadores" onPress={() => navigation.navigate('Jugadores')} />
            <Button title="Clubes" onPress={() => navigation.navigate('Clubes')} />
            <Button title="Agregar Jugador" onPress={() => navigation.navigate('Agregar Jugador')} />
            <Button title="Mi Perfil" onPress={() => navigation.navigate('Datos usuario', { usuarioDatos })} /> 
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Colores.verdeClaro,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vista: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  buttons: {
    marginBottom: 20,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Inicio;
