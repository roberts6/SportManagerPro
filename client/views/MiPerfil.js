import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

export default function MiPerfil({ route, navigation }) {
  const { usuarioDatos } = route.params;

  if (!usuarioDatos) {
      return (
          <View style={styles.container}>
              <Text>Error: No se proporcionó información del usuario.</Text>
          </View>
      );
  }

  const { nombre, apellido, fecha_nacimiento, genero, telefono, categoria,
          habilitado, email: usuarioEmail, telefono_emergencia,
          prestador_servicio_emergencia, direccion } = usuarioDatos;

  const fechaFormateada = moment(fecha_nacimiento).format('DD/MM/YYYY');

  const handleEditarUsuarioPress = () => {
    navigation.navigate('Editar datos', { usuarioDatos, navigation }); // envía el objeto completo y navigation a Editar 
    console.log("2 - este el objeto completo que manda Mi Perfil a editar", usuarioDatos);
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 18 }}>{nombre} {apellido}</Text>
      <Image source={require('../imagenes/avatarX.png')} style={styles.image} />
      <Text style={styles.text}>Fecha de nacimiento: {fechaFormateada}</Text>
      <Text style={styles.text}>Género: {genero}</Text>
      <Text style={styles.text}>Teléfono: {telefono}</Text>
      <Text style={styles.text}>Dirección: {direccion}</Text>
      <Text style={styles.text}>Categoría: {categoria}</Text>
      <Text style={styles.text}>Habilitado: {habilitado ? 'Sí' : 'No'}</Text>
      <Text style={styles.text}>Email: {usuarioEmail}</Text>
      <Text style={styles.text}>Teléfono de emergencia: {telefono_emergencia}</Text>
      <Text style={styles.text}>Prestador de servicios de emergencia: {prestador_servicio_emergencia}</Text>
      {/* <Button
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
  },
});
