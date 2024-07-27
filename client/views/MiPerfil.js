import React from 'react';
import { View, Text, StyleSheet, Image, Button, Pressable } from 'react-native';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { Colores } from '../features/utilidades/colores';
import Avatar from '../imagenes/avatarX.png'
import { useSelector } from 'react-redux';
import { useGetFotoPerfilQuery } from '../../server/servicesFireBase/services';

export default function MiPerfil({ route, navigation }) {
  const { completeUsuarioDatos } = route.params;
  const {imageCamera, localId} = useSelector((state) => state.auth.value)
  const {data: imageFromDataBase} = useGetFotoPerfilQuery(localId)
  console.log("Mi perfil localId", localId)

  if (!completeUsuarioDatos) {
      return (
          <View style={styles.container}>
              <Text>Error: No se proporcionó información del usuario.</Text>
          </View>
      );
  }

  const { foto, nombre, apellido, fecha_nacimiento, genero, telefono, categoria,
          habilitado, email: usuarioEmail, telefono_emergencia,
          prestador_servicio_emergencia, direccion } = completeUsuarioDatos;

  const fechaFormateada = moment(fecha_nacimiento).format('DD/MM/YYYY');

  const handleEditarUsuarioPress = () => {
    navigation.navigate('Editar datos', { completeUsuarioDatos, navigation }); // envía el objeto completo y navigation a Editar 
    console.log("2 - este el objeto completo que manda Mi Perfil a editar", completeUsuarioDatos);
  }

if (imageFromDataBase) {
    //console.log("Base64 Image Data:", imageFromDataBase);
    console.log("Base64 Image Data ok");
  } else {
    console.log("No hay data de imagen desde database");
  }

  // Extrae la cadena de texto de Base64 en imageFromDataBase.Image
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

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 18 }}>{nombre} {apellido}</Text>
      {profileImageURI ? (
        <Image source={{ uri: profileImageURI }} style={styles.image} />
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
      {/* 
      tiene que estar este botón acá?? revisar...
      
      <Button
        title='✏️ Editar'
        onPress={handleEditarUsuarioPress}
      /> */}
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