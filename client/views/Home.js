// // import { useRoute, useNavigation } from '@react-navigation/native';
// // import React from 'react';
// // import { View, Text, Button, StyleSheet } from 'react-native';
// // import { useGetEntrenadorByIdQuery, useGetDelegadoByIdQuery, useGetJugadorByIdQuery } from '../../server/servicesFireBase/services';

// // export default function Home({ navigation }) {
// //     const route = useRoute();

// //     const {data: delegadoData} = useGetDelegadoByIdQuery()
// //     console.log("data del delegado", delegadoData)
// //     const {data: jugadorData} = useGetJugadorByIdQuery()
// //     console.log("data del jugador", jugadorData)
// //     const {data: entrenadorData} = useGetEntrenadorByIdQuery()
// //     console.log("data del entrenador", entrenadorData)

// //     const { id, nombre, email, password } = route.params || {}; // Recibe el email y password desde Login
    
// //   return (
// //       <View>
// //         <Text> Hola {nombre} </Text>
// //         <View><Button title="Mi perfil" onPress={() => navigation.navigate('Mi perfil', { email, password })} /></View>
// //         <Button title="Jugadores" onPress={() => navigation.navigate('Jugadores')} />
// //         <Button title="Clubes" onPress={() => navigation.navigate('Clubes')} />
// //         <Button title="Agregar Jugador" onPress={() => navigation.navigate('Agregar Jugador')} />
// //       </View>
// // )}

// // const styles = StyleSheet.create({
// //     container: {
// //       flex: 1,
// //       justifyContent: 'center',
// //       alignItems: 'center',
// //     },
// //     text: {
// //       color: 'black',
// //       fontSize: 24,
// //     },
// //   });

// import React, { useEffect, useState } from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';
// import { useGetDelegadoByIdQuery, useGetJugadorByIdQuery, useGetEntrenadorByIdQuery, useGetEntrenadoresQuery, useGetDelegadosQuery, useGetJugadoresQuery, useGetJugadorByEmailQuery } from '../../server/servicesFireBase/services';

// export default function Home({ navigation, route }) {
//     const [delegadoData, setDelegadoData] = useState(null);
//     const [jugadorData, setJugadorData] = useState(null);
//     const [entrenadorData, setEntrenadorData] = useState(null);

    

//     const {dataDelegados} = useGetDelegadosQuery();
//     console.log("dataDelegados",dataDelegados)
    
//     useEffect(() => {
//       if(dataDelegados) {
//         console.log("dataDelegados", dataDelegados);
//     }
//         const fetchData = async () => {
//             const delegadoData = await useGetDelegadoByIdQuery();
//             setDelegadoData(delegadoData);

//             const jugadorData = await useGetJugadorByIdQuery();
//             setJugadorData(jugadorData);

//             const entrenadorData = await useGetEntrenadorByIdQuery();
//             setEntrenadorData(entrenadorData);
//         };

//         fetchData();
//     }, [dataDelegados]);

//     const { nombre, email } = route.params || {};
//     const {data: dataEmail} = useGetJugadorByEmailQuery(email);
//     console.log("funciona? -->",dataEmail)
//     // console.log("delegadoData",delegadoData)
//     // console.log("jugadorData",jugadorData)
//     // console.log("entrenadorData",entrenadorData)

// if (email === dataEmail) {
//   console.log("funciona?",dataEmail.nombre)
// }

//     return (
//         <View style={styles.container}>
//             {delegadoData && delegadoData.nombre ? (
//                 <Text> Hola {delegadoData.nombre} </Text>
//             ) : (
//                 jugadorData && jugadorData.nombre ? (
//                     <Text> Hola {jugadorData.nombre} </Text>
//                 ) : (
//                     entrenadorData && entrenadorData.nombre ? (
//                         <Text> Hola {entrenadorData.nombre} </Text>
//                     ) : (
//                         <Text> Bienvenido {dataEmail}! </Text>
//                     )
//                 )
//             )}

//             <View>
//                 <Button title="Mi perfil" onPress={() => navigation.navigate('Mi perfil', { email, password })}/>
//             </View>
//             <Button title="Jugadores" onPress={() => navigation.navigate('Jugadores')} />
//             <Button title="Clubes" onPress={() => navigation.navigate('Clubes')} />
//             <Button title="Agregar Jugador" onPress={() => navigation.navigate('Agregar Jugador')} />
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         marginTop: 35,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     text: {
//         color: 'black',
//         fontSize: 24,
//     },
// });


import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useGetDelegadoByIdQuery, useGetJugadorByIdQuery, useGetEntrenadorByIdQuery, useGetDelegadosQuery, useGetJugadorByEmailQuery, useGetEntrenadoresQuery, useGetJugadoresQuery } from '../../server/servicesFireBase/services';

export default function Home({ navigation, route }) {
    const { nombre, email } = route.params || {};

    const { data: dataDelegados } = useGetDelegadosQuery();
    const { data: dataEntrenadores } = useGetEntrenadoresQuery();
    const { data: dataJugadores } = useGetJugadoresQuery();

    const [matchedData, setMatchedData] = useState(null);

    useEffect(() => {
        if (dataDelegados && dataEntrenadores && dataJugadores) {
            // Check delegates
            for (const [key, delegado] of Object.entries(dataDelegados)) {
                if (delegado.email === email) {
                    setMatchedData({ ...delegado, type: 'Delegado' });
                    return;
                }
            }

            // Check coaches
            for (const [key, entrenador] of Object.entries(dataEntrenadores)) {
                if (entrenador.email === email) {
                    setMatchedData({ ...entrenador, type: 'Entrenador' });
                    return;
                }
            }

            // Check players
            for (const [key, jugador] of Object.entries(dataJugadores)) {
                if (jugador.email === email) {
                    setMatchedData({ ...jugador, type: 'Jugador' });
                    return;
                }
            }
        }
    }, [dataDelegados, dataEntrenadores, dataJugadores]);

    return (
        <View style={styles.container}>
            {matchedData ? (
                <Text> Hola {matchedData.nombre}, your role is {matchedData.type} </Text>
            ) : (
                <Text> Bienvenido {email}! </Text>
            )}

            <View>
                <Button title="Mi perfil" onPress={() => navigation.navigate('Mi perfil', { email })} />
            </View>
            <Button title="Jugadores" onPress={() => navigation.navigate('Jugadores')} />
            <Button title="Clubes" onPress={() => navigation.navigate('Clubes')} />
            <Button title="Agregar Jugador" onPress={() => navigation.navigate('Agregar Jugador')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'black',
        fontSize: 24,
    },
});

