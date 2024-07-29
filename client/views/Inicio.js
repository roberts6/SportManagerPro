import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, SafeAreaView } from 'react-native';
import { useBusquedaXmail } from '../features/utilidades/busquedaXmail';
import { Colores } from '../features/utilidades/colores';
import VistaActual from '../features/utilidades/VistaActual';
import Avatar from '../imagenes/avatarX.png'; 
import useFotoPerfil from '../features/utilidades/traeFotoPerfilDesdeDB';
import { useSelector } from 'react-redux';
import { useGetDireccionQuery } from '../../server/servicesFireBase/services';

const Inicio = ({ route, navigation }) => {
  const { usuario } = route.params || {};
  const email = usuario ? usuario.email : null;
  //const usuariolocalId = usuario ? usuario.localId : null;
  const usuarioDatos = useBusquedaXmail(email);
  const {localId} = useSelector((state) => state.auth.value )
  const {direccion: direccionGoogleMaps} = useGetDireccionQuery(localId)

  // console.log("localId en Inicio",usuariolocalId)
  console.log("localId en Inicio",localId)

  const direccionDefinitiva = direccionGoogleMaps? direccionGoogleMaps : usuarioDatos?.direccion

  VistaActual();

const profileImageURI = useFotoPerfil()

  // agrega o actualiza profileImageURI en usuarioDatos
  const completeUsuarioDatos = { ...usuarioDatos, direccionDefinitiva, profileImageURI: profileImageURI || Avatar };
  //console.log("este es el objeto completo con foto en Inicio --> ",completeUsuarioDatos)  //el objeto es correcto! 

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.content}>
          {completeUsuarioDatos && completeUsuarioDatos.nombre ? (
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
                  {
                    opacity: pressed ? 0.6 : 1
                  },
                  styles.button
                ]}
                onPress={() => navigation.navigate('Jugadores')}
              >
                <Text style={styles.buttonText}>Jugadores</Text>
              </Pressable>
            <Pressable
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.6 : 1
                },
                styles.button
              ]}
              onPress={() => navigation.navigate('Clubes')}
            >
              <Text style={styles.buttonText}>Clubes</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.6 : 1
                },
                styles.button
              ]}
              onPress={() => navigation.navigate('Agregar Jugador')}
            >
              <Text style={styles.buttonText}>Agregar Jugador</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.6 : 1
                },
                styles.button
              ]}
              onPress={() => navigation.navigate('Datos usuario', { completeUsuarioDatos: completeUsuarioDatos })} // envía el objeto completo completeUsuarioDatos a TabNavigator.js
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
    //backgroundColor: Colores.verdeClaro,
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
