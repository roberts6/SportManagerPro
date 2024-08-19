import React from 'react';
import { View, Text, StyleSheet, Image, Button, Pressable } from 'react-native';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { Colores } from '../features/utilidades/colores';
import Avatar from '../imagenes/avatarX.png'
import { useSelector } from 'react-redux';

export default function MiPerfil({ route, navigation }) {
  const { completeUsuarioDatos } = route.params;
  const {localId, imageCamera} = useSelector((state) => state.auth.value)
  //console.log("Mi perfil localId", localId)
  console.log("imageCamera en Mi Perfil -->",imageCamera)

  if (!completeUsuarioDatos) {
      return (
          <View style={styles.container}>
              <Text>Error: No se proporcionó información del usuario.</Text>
          </View>
      );
  }

  const { nombre, apellido, fecha_nacimiento, genero, telefono, categoria,
          habilitado, email: usuarioEmail, telefono_emergencia,
          prestador_servicio_emergencia, direccion, profileImageURI } = completeUsuarioDatos;

  const fechaFormateada = moment(fecha_nacimiento).format('DD/MM/YYYY');

  const isValidURI = typeof profileImageURI === 'string' && profileImageURI.length > 3;

  const imageSource = isValidURI ? { uri: profileImageURI } : Avatar;

//   const handleEditarUsuarioPress = () => {
//     navigation.navigate('Editar datos', { completeUsuarioDatos, navigation }); // envía el objeto completo y navigation a Editar 
//     console.log("2 - este el objeto completo que manda Mi Perfil a editar", completeUsuarioDatos);
//   }

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 18 }}>{nombre} {apellido}</Text>
      {profileImageURI ? (
         <Image source={imageSource} style={styles.image} />
      ) : (
        <Image source={Avatar} style={styles.image} />
      )}
      <Text style={styles.text}>Fecha de nacimiento: {fechaFormateada}</Text>
      <Text style={styles.text}>Género: {genero}</Text>
      <Text style={styles.text}>Teléfono: {telefono}</Text>
      <Text style={styles.text}>Dirección: {direccion}</Text>
      <Text style={styles.text}>Categoría: {categoria}</Text>
      <Text style={styles.text}>Habilitado: {habilitado ? 'Sí' : 'No'}</Text>
      <Text style={styles.text}>Email: {usuarioEmail}</Text>
      <Text style={styles.text}>Teléfono de emergencia: {telefono_emergencia}</Text>
      <Text style={styles.text}>Prestador de servicios de emergencia: {prestador_servicio_emergencia}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginVertical: 4,
  },
  image: {
    marginBottom: 10,
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  button: {
    backgroundColor: Colores.verde2,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
});