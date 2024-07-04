import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const DetalleJugador = ({ route }) => { // es el objeto que envía handlePlayerPress en Jugadores.js
    const { jugador } = route.params; // { route } es el objeto completo y route.params contiene todos los parámetros que fueron pasados cuando se hizo la llamada a navigation.navigate en Jugadores.js
    const navigation = useNavigation();

    const handleEstadisticasPress = () => {
        navigation.navigate('Estadísticas', { jugador });
    };

    const fechaFormateada = moment(jugador.fecha_nacimiento).format('D/M/YYYY');

    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 18 }}>{jugador.nombre} {jugador.apellido}</Text>
            <Image source={require('../imagenes/avatarX.png')} style = {styles.image}/> 
            <Text style={styles.text}>Club: {jugador.club}</Text>
            <Text style={styles.text}>fecha_nacimiento: {fechaFormateada}</Text>
            <Text style={styles.text}>Categoría: {jugador.categoria}</Text>
            <Text style={styles.text}>Edad: {jugador.edad}</Text>
            <Text style={styles.text}>Género: {jugador.genero}</Text>
            <Text style={styles.text}><Text>Habilitado: </Text><Text style={{ fontWeight: 'bold' }}>{jugador.habilitado === 1 ? "Sí" : "No"}</Text></Text>
            <Text style={styles.text}>Email: {jugador.email}</Text>
            <Text style={styles.text}>Teléfono: {jugador.telefono}</Text>
            <Text style={styles.text}>Dirección: {jugador.direccion}</Text>
            <Text style={styles.text}>Obra Social: {jugador.prestador_servicio_emergencia}</Text>
            <View style={[jugador.habilitado === 0 ? { display: 'none' } : styles.botonContainer]}>
                <Button
                    title='Agregar 📈'
                    color='white'
                    onPress={handleEstadisticasPress}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 25,
      alignItems: 'center'
    },
    image: {
      width: 200,
      height: 200,
      marginBottom: 15
    },
    text:{
        marginBottom:6,
        fontSize: 15
    },
    botonContainer:{
        backgroundColor: 'green',
        padding: 10,
        marginVertical: 50,
        marginHorizontal: 50,
        borderRadius: 5,
    },
  });

export default DetalleJugador;