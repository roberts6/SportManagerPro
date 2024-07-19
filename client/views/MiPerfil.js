// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, StyleSheet, Button } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import moment from 'moment';


// import { usePostUsuarioMutation } from '../../server/servicesFireBase/services';

// const MiPerfil = () => {
//     const route = useRoute();
//     const navigation = useNavigation();
//     const { email, password } = route.params || {};

//     const [jugador, setJugador] = useState(null);

//     // Iniciar el hook para postear datos del usuario
//     const [triggerPostUsuario, result] = usePostUsuarioMutation();

//     useEffect(() => {
//         if (!email || !password) {
//             navigation.navigate('Home'); // Regresa a Home si los parámetros no existen
//             return;
//         }

//         // Función para obtener los datos del jugador
//         const fetchJugadorDatos = async () => {
//             try {
//                 const response = await triggerPostUsuario({ email, password });
//                 //setJugador(response.data);
//                 console.log("datos del usuario",response)
//             } catch (error) {
//                 console.error('Error al obtener datos del jugador:', error);
//                 alert('Error al obtener tus datos. Por favor, intenta de nuevo.');
//             }
//         };

//         fetchJugadorDatos();
//     }, [email, password, triggerPostUsuario, navigation]);

//     if (!jugador) {
//         return (
//             <View style={styles.container}>
//                 <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 18 }}>Cargando...</Text>
//             </View>
//         );
//     }

//     const handleEstadisticasPress = () => {
//         navigation.navigate('Estadísticas', { jugador });
//     };

//     const handleEditarJugadorPress = () => {
//         navigation.navigate('TabNavigator', { screen: 'Editar Datos', params: { jugador } });
//     };

//     const fechaFormateada = moment(jugador.fecha_nacimiento).format('DD/MM/YYYY');

//     return (
//         <View style={styles.container}>
//             <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 18 }}>{jugador.nombre} {jugador.apellido}</Text>
//             <Image source={require('../imagenes/avatarX.png')} style={styles.image} />
//             <Text style={styles.text}>{jugador.club}</Text>
//             <Text style={styles.text}>Fecha de nacimiento: {fechaFormateada}</Text>
//             <Text style={styles.text}>Edad: {jugador.edad}</Text>
//             <Text style={styles.text}>Categoría: {jugador.categoria}</Text>
//             <Text style={styles.text}>Género: {jugador.genero}</Text>
//             <Text style={styles.text}><Text>Habilitado: </Text><Text style={{ fontWeight: 'bold' }}>{jugador.habilitado === 1 ? "Sí" : "No"}</Text></Text>
//             <Text style={styles.text}>Email: {jugador.email}</Text>
//             <Text style={styles.text}>Teléfono: {jugador.telefono}</Text>
//             <Text style={styles.text}>Dirección: {jugador.direccion}</Text>
//             <Text style={styles.text}>Teléfono emergencia: {jugador.telefono_emergencia}</Text>
//             <Text style={styles.text}>Obra Social: {jugador.prestador_servicio_emergencia}</Text>

//             <Button
//                 title='✏️'
//                 onPress={handleEditarJugadorPress}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         marginTop: 25,
//         alignItems: 'center'
//     },
//     image: {
//         width: 200,
//         height: 200,
//         marginBottom: 15
//     },
//     text: {
//         marginBottom: 6,
//         fontSize: 15
//     },
//     botonContainer: {
//         backgroundColor: 'green',
//         padding: 10,
//         marginVertical: 50,
//         marginHorizontal: 50,
//         borderRadius: 5,
//     },
// });

// export default MiPerfil;

import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';
import { useGetJugadorByEmailQuery, useGetEntrenadorByEmailQuery, useGetDelegadoByEmailQuery } from '../../server/servicesFireBase/services';

const MiPerfil = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { email, password } = route.params || {};
    
    const { data: JugadorEmail, isSuccess: JugadorEmailSuccess } = useGetJugadorByEmailQuery(email);
    const { data: EntrenadorEmail, isSuccess: EntrenadorEmailSuccess } = useGetEntrenadorByEmailQuery(email);
    const { data: DelegadoEmail, isSuccess: DelegadoEmailSuccess } = useGetDelegadoByEmailQuery(email);
    
    const [datosJugadoresEmail, setDatosJugadoresEmail] = useState(null);
    const [datosEntrenadoresEmail, setDatosEntrenadoresEmail] = useState(null);
    const [datosDelegadosEmail, setDatosDelegadosEmail] = useState(null);
    
    useEffect(() => {
        if (JugadorEmailSuccess && JugadorEmail) {
            const jugador = Object.values(JugadorEmail)[0];
            setDatosJugadoresEmail(jugador);
        }
        if (EntrenadorEmailSuccess && EntrenadorEmail) {
            const entrenador = Object.values(EntrenadorEmail)[0];
            setDatosEntrenadoresEmail(entrenador)
        }
        if (DelegadoEmailSuccess && DelegadoEmail) {
            const delegado = Object.values(DelegadoEmail)[0];
            setDatosDelegadosEmail(delegado)
        }
    }, [JugadorEmailSuccess, EntrenadorEmailSuccess, DelegadoEmailSuccess, JugadorEmail, EntrenadorEmail, DelegadoEmail]);
    
    const usuario = datosJugadoresEmail || datosEntrenadoresEmail || datosDelegadosEmail;
    
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
        navigation.navigate('TabNavigator', { screen: 'Editar Datos', params: { usuario } });
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 18 }}>{nombre} {apellido}</Text>
            <Image source={require('../imagenes/avatarX.png')} style={styles.image} />
            <Text style={styles.text}>Fecha de nacimiento: {fechaFormateada}</Text>
            <Text style={styles.text}>Género: {genero}</Text>
            <Text style={styles.text}>Teléfono: {telefono}</Text>
            <Text style={styles.text}>Categoría: {categoria}</Text>
            <Text style={styles.text}>Habilitado: {habilitado ? 'Sí' : 'No'}</Text>
            <Text style={styles.text}>Email: {usuarioEmail}</Text>
            <Text style={styles.text}>Teléfono de emergencia: {telefono_emergencia}</Text>
            <Text style={styles.text}>Prestador de servicios de emergencia: {prestador_servicio_emergencia}</Text>
            <Text style={styles.text}>Dirección: {direccion}</Text>
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

