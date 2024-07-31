import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, SafeAreaView } from 'react-native';
import { useBusquedaXmail } from '../customHooks/busquedaXmail.js';
import { Colores } from '../features/utilidades/colores';
import Avatar from '../imagenes/avatarX.png'; 
import useFotoPerfil from '../customHooks/traeFotoPerfilDesdeDB.js';
import { useSelector } from 'react-redux';
import { useGetDireccionQuery } from '../../server/servicesFireBase/services';

const Inicio = ({ route, navigation }) => {
  const { usuario, key } = route.params || {};
  const email = usuario ? usuario.email : null;
  const usuarioDatos = useBusquedaXmail(email); 
  const usuarioConKey = useSelector((state) => state.usuarios.usuarios) 

  // console.log("INICIO",usuarioConKey)

  // console.log("KEY en INICIO",key)

  const {localId} = useSelector((state) => state.auth.value)

  const { data: direccionData } = useGetDireccionQuery(localId);

  // console.log("Local ID en Inicio:", localId);  // OK
  // console.log("Direccion Data:", direccionData.direccion); // OK

  const direccionDefinitiva = direccionData ? direccionData.direccion : usuarioDatos?.direccion || ''; 

  const profileImageURI = useFotoPerfil();

  // le agrega a los datos de la BD foto y dirección si es que hay en firebase
  const completeUsuarioDatos = { 
    ...usuarioDatos, 
    direccion: direccionDefinitiva, 
    profileImageURI: profileImageURI || Avatar 
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.content}>
          {completeUsuarioDatos.nombre ? (
            <Text style={styles.greeting}>Hola {completeUsuarioDatos.nombre}!</Text>
          ) : (
            <Text style={styles.greeting}>Sin datos del usuario...</Text>
          )}
          <View style={styles.vista}>
            <Image source={completeUsuarioDatos.profileImageURI ? { uri: completeUsuarioDatos.profileImageURI } : Avatar} style={styles.image} />
          </View>
          <View style={styles.buttons}>
              <Pressable
                style={({ pressed }) => [
                  { opacity: pressed ? 0.6 : 1 },
                  styles.button
                ]}
                onPress={() => navigation.navigate('Jugadores')}
              >
                <Text style={styles.buttonText}>Jugadores</Text>
              </Pressable>
            <Pressable
              style={({ pressed }) => [
                { opacity: pressed ? 0.6 : 1 },
                styles.button
              ]}
              onPress={() => navigation.navigate('Clubes')}
            >
              <Text style={styles.buttonText}>Clubes</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                { opacity: pressed ? 0.6 : 1 },
                styles.button
              ]}
              onPress={() => navigation.navigate('Agregar Jugador')}
            >
              <Text style={styles.buttonText}>Agregar Jugador</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                { opacity: pressed ? 0.6 : 1 },
                styles.button
              ]}
              onPress={() => navigation.navigate('Datos usuario', { completeUsuarioDatos })} // envía el objeto completo a TabNavigator.js
            >
              <Text style={styles.buttonText}>Mi Perfil</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
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
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colores.verde2, 
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Inicio;
