import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';
import { useBusquedaXmail } from '../features/utilidades/busquedaXmail';

const MiPerfil = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { email, password } = route.params || {};
    console.log("mi perfil recibe ", email);

    const usuario = useBusquedaXmail(email);
    
    if (!usuario) {
        return (
            <View style={styles.container}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 18 }}>Cargando...</Text>
            </View>
        );
    }
    
    const {
        nombre,
        apellido,
        fecha_nacimiento,
        genero,
        telefono,
        categoria,
        habilitado,
        email: usuarioEmail,
        telefono_emergencia,
        prestador_servicio_emergencia,
        direccion
    } = usuario;
    
    const fechaFormateada = moment(fecha_nacimiento).format('DD/MM/YYYY');
    
    const handleEditarUsuarioPress = () => {
        navigation.navigate('TabNavigator', { screen: 'Editar Datos', params: { email } });
    };

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
            <Button
                title='✏️ Editar'
                onPress={handleEditarUsuarioPress}
            />
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
        marginBottom: 6,
        fontSize: 15
    }
});

export default MiPerfil;


