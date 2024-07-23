// import React from 'react';
// import { View, Text, Image, StyleSheet, Button } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import moment from 'moment';
// import { useBusquedaXmail } from '../features/utilidades/busquedaXmail';
// //import TabNavigator from '../tabs/TabNavigator';

// const MiPerfil = () => {
//     const route = useRoute();
//     const navigation = useNavigation();
//     const { email, password } = route.params || {};
//     console.log("mi perfil recibe ?", email);

//     const usuario = useBusquedaXmail(email);
//     console.log("datos de usuario en 'mi perfil'",usuario)
    
//     if (!usuario) {
//         return (
//             <View style={styles.container}>
//                 <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 18 }}>Cargando...</Text>
//             </View>
//         );
//     }
    
//     const {
//         nombre,
//         apellido,
//         fecha_nacimiento,
//         genero,
//         telefono,
//         categoria,
//         habilitado,
//         email: usuarioEmail,
//         telefono_emergencia,
//         prestador_servicio_emergencia,
//         direccion
//     } = usuario;
    
//     const fechaFormateada = moment(fecha_nacimiento).format('DD/MM/YYYY');
    
//     const handleEditarUsuarioPress = () => {
//         navigation.navigate('TabNavigator', { screen: 'Editar Datos', usuario });
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 18 }}>{nombre} {apellido}</Text>
//             <Image source={require('../imagenes/avatarX.png')} style={styles.image} />
//             <Text style={styles.text}>Fecha de nacimiento: {fechaFormateada}</Text>
//             <Text style={styles.text}>Género: {genero}</Text>
//             <Text style={styles.text}>Teléfono: {telefono}</Text>
//             <Text style={styles.text}>Dirección: {direccion}</Text>
//             <Text style={styles.text}>Categoría: {categoria}</Text>
//             <Text style={styles.text}>Habilitado: {habilitado ? 'Sí' : 'No'}</Text>
//             <Text style={styles.text}>Email: {usuarioEmail}</Text>
//             <Text style={styles.text}>Teléfono de emergencia: {telefono_emergencia}</Text>
//             <Text style={styles.text}>Prestador de servicios de emergencia: {prestador_servicio_emergencia}</Text>
//             <Button
//                 title='✏️ Editar'
//                 onPress={handleEditarUsuarioPress}
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
//     tabNavigatorStyle:{}
// });

// export default MiPerfil;


import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import moment from 'moment';

export default function MiPerfil({ route }) {
  const { usuarioDatos } = route.params;

  if (!usuarioDatos) {
      return (
          <View style={styles.container}>
              <Text>Error: No se proporcionó información del usuario.</Text>
          </View>
      );
  }

  const fechaFormateada = moment(fecha_nacimiento).format('DD/MM/YYYY');

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
    } = usuarioDatos;

  return (
    <View style={styles.container}>
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

