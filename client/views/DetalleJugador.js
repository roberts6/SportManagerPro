import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import SeleccionarImagen from '../features/utilidades/Camara';
import { Colores } from '../features/utilidades/colores';
import Avatar from '../imagenes/avatarX.png'
import useFotoPerfil from '../customHooks/traeFotoPerfilDesdeDB';
import { useGetFotoPerfilQuery } from '../../server/servicesFireBase/services';

const DetalleJugador = ({ route }) => {
    const { jugador } = route.params; 
    const navigation = useNavigation();

    const {key, localId, profileImageURI} = jugador;

   console.log("foto del jugador -->",profileImageURI)

   const isValidURI = typeof profileImageURI === 'string' && profileImageURI.length > 3;

    // Use the profile image if valid, otherwise default to Avatar
    const imageSource = isValidURI ? { uri: profileImageURI } : Avatar;


    if (!jugador) {
        return (
            <View style={styles.container}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 18 }}>Jugador no encontrado</Text>
            </View>
        );
    }

    //console.log("datos en jugador -->", jugador) // recibe ok la info desde "Jugadores.js" incluida la key
    //const {profileImageURI, key} = jugador;
    //console.log("foto del detalle de jugador ",key, profileImageURI)

    const handleEstadisticasPress = () => {
        navigation.navigate('Estadísticas', { jugador });
    };

    const handleEditarJugadorPress = () => {
        navigation.navigate('Datos usuario', { screen: 'Editar Datos', usuarioDatos: { jugador } }); 
    };

    const fechaFormateada = moment(jugador.fecha_nacimiento).format('DD/MM/YYYY');

    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 18 }}>{jugador.nombre} {jugador.apellido}</Text>
            {/* <Image source={jugador.profileImageURI ? { uri: jugador.profileImageURI } : Avatar} style={styles.image} />
             */}
             {/* <Image source={jugador.profileImageURI ? { uri: jugador.profileImageURI } : Avatar} style={styles.image} /> */}
             <Image source={imageSource} style={styles.image} /> 
            {/* {profileImage()} */}
            <Text style={styles.text}>{jugador.club}</Text>
            <Text style={styles.text}>Fecha de nacimiento: {fechaFormateada}</Text>
            <Text style={styles.text}>Edad: {jugador.edad}</Text>
            <Text style={styles.text}>DNI: {jugador.dni}</Text>
            <Text style={styles.text}>Categoría: {jugador.categoria}</Text>
            <Text style={styles.text}>Género: {jugador.genero}</Text>
            <Text style={styles.text}><Text>Habilitado: </Text><Text style={{ fontWeight: 'bold' }}>{jugador.habilitado === 1 ? "Sí" : "No"}</Text></Text>
            <Text style={styles.text}>Email: {jugador.email}</Text>
            <Text style={styles.text}>Teléfono: {jugador.telefono}</Text>
            <Text style={styles.text}>Dirección: {jugador.direccion}</Text>
            <Text style={styles.text}>Teléfono emergencia: {jugador.telefono_emergencia}</Text>
            <Text style={styles.text}>Obra Social: {jugador.prestador_servicio_emergencia}</Text>

            <View style={[jugador.habilitado === false ? { display: 'none' } : styles.botonContainer]}>
                <Button
                    title='Agregar 📈'
                    color='white'
                    onPress={handleEstadisticasPress}
                />
            </View>

            {/* 
            
            debería estar este botón acá??
            
            <Button
                title='✏️'
                onPress={handleEditarJugadorPress}
            /> */}
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
    text: {
        // marginBottom: 6,
        fontSize: 15,
        marginVertical: 4
    },
    botonContainer: {
        backgroundColor: Colores.verde2,
        padding: 10,
        marginVertical: 50,
        marginHorizontal: 50,
        borderRadius: 5,
    },
});

export default DetalleJugador;
