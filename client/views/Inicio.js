import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, SafeAreaView } from 'react-native';
import { useBusquedaXmail } from '../features/utilidades/busquedaXmail';
import { Colores } from '../features/utilidades/colores';
import VistaActual from '../features/utilidades/VistaActual';
import { useSelector } from 'react-redux';
import Avatar from '../imagenes/avatarX.png'; 
import { useGetFotoPerfilQuery } from '../../server/servicesFireBase/services'; 

const Inicio = ({ route, navigation }) => {
  const { usuario } = route.params || {};
  const email = usuario ? usuario.email : null;
  const usuarioDatos = useBusquedaXmail(email);

  const { localId } = useSelector((state) => state.auth.value); 
  const { data: imageFromDataBase } = useGetFotoPerfilQuery(localId);

  VistaActual();

  if (imageFromDataBase) {
    console.log("Base64 Image Data from DB en Inicio OK");
  } else {
    console.log("No image data from database en inicio");
  }

  const base64Image = imageFromDataBase?.Image;

  const isBase64 = (str) => {
    if (typeof str !== 'string') {
      return false;
    }
    const base64Pattern = /^data:image\/(jpeg|png);base64,/;
    return base64Pattern.test(str);
  };

  const profileImageURI = base64Image && isBase64(base64Image) 
    ? base64Image 
    : undefined;

  // agrega o actualiza profileImageURI en usuarioDatos
  const completeUsuarioDatos = { ...usuarioDatos, profileImageURI: profileImageURI || Avatar };
  //console.log("este es el objeto completo con foto en Inicio --> ",completeUsuarioDatos)  el objeto es correcto! 

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
            <Image source={completeUsuarioDatos.profileImageURI ? { uri: completeUsuarioDatos.profileImageURI } : require('../imagenes/avatarX.png')} style={styles.image} />
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
              onPress={() => navigation.navigate('Datos usuario', { completeUsuarioDatos: completeUsuarioDatos })} // envía el objeto completo completeUsuarioDatos
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
