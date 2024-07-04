// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, Pressable } from 'react-native';
// //import { FetchData } from '../components/fetch.js';
// import FiltroNombre from '../filtros/filtroNombre.js'
// import FiltroHabilitado from '../filtros/filtroHabilitado.js';
// import FiltroClub from '../filtros/filtroClub.js';
// import { useNavigation } from '@react-navigation/native';
// import { useGetJugadoresByClubQuery } from '../../server/servicesFireBase/services.js';

// const Jugadores = () => {
//     const [jugadores, setJugadores] = useState([]);
//     const [filteredNombre, setFilteredNombre] = useState([]);
//     const [habilitadoFilter, setHabilitadoFilter] = useState(null);
//     const [search, setSearch] = useState('');
//     const [searchClub, setSearchClub] = useState('');
//     //const [error, setError] = useState(null);
//     const navigation = useNavigation();
//     const {data, error, isLoading} = useGetJugadoresByClubQuery(clubId);
//     const JugadorDB = setJugadores(data)

//     // useEffect(() => {
//     //     const fetchDataFromServer = async () => {
//     //         try {
//     //             await FetchData(setJugadores);
//     //         } catch (err) {
//     //             setError(err.message);
//     //         }
//     //     };
//     //     fetchDataFromServer();
//     // }, []);


//     useEffect(() => {
//         let filteredData = jugadores.filter(jugador =>
//             (jugador.nombre.toLowerCase().includes(search.toLowerCase()) ||
//             jugador.apellido.toLowerCase().includes(search.toLowerCase()))
//         );

//         if (habilitadoFilter !== null) {
//             filteredData = filteredData.filter(jugador =>
//                 (habilitadoFilter === 0 && jugador.habilitado === 0) || jugador.habilitado === habilitadoFilter
//             );
//         }

//         if (searchClub) {
//             filteredData = filteredData.filter(jugador =>
//                 jugador.club.toLowerCase().includes(searchClub.toLowerCase())
//             );
//         }

//         setFilteredNombre(filteredData);
//     }, [search, jugadores, habilitadoFilter, searchClub]);

//     const handlePlayerPress = (item) => {
//         navigation.navigate('Información Jugador', { jugador: item });
//     };

//     return (
//         <View>
//             <FiltroNombre search={search} setSearch={setSearch} />
//             <FiltroClub searchClub={searchClub} setSearchClub={setSearchClub} />
//             <FiltroHabilitado setHabilitadoFilter={setHabilitadoFilter} />
//             <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 }}>
//                 Lista de Jugadores
//             </Text>
//             {error ? (
//                 <Text style={{ color: 'red', textAlign: 'center' }}>Error: {error}</Text>
//             ) : (
//                 <FlatList
//                     //data={filteredNombre}
//                     data= {JugadorDB}
//                     keyExtractor={(data) => data}
//                     renderItem={({ item }) => (
//                         <Pressable onPress={() => handlePlayerPress(item)}>
//                             <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray', padding: 10 }}>
//                                 <Text style={{ fontWeight: 'bold' }}>Club: {item.club}</Text>
//                                 <Text style={{ fontSize: 16, color: 'black' }}>{item.nombre} - {item.apellido}</Text>
//                                 <Text>Edad: {item.edad}</Text>
//                                 <Text>Género: {item.genero}</Text>
//                                 <Text>Habilitado: <Text style={{ fontWeight: 'bold' }}>{item.habilitado === 1 ? "Sí" : "No"}</Text></Text>
//                             </View>
//                         </Pressable>
//                     )}
//                 />
//             )}
//         </View>
//     );
// };

// export default Jugadores;


import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Pressable, ActivityIndicator } from 'react-native';
import FiltroNombre from '../filtros/filtroNombre.js';
import FiltroHabilitado from '../filtros/filtroHabilitado.js';
import FiltroClub from '../filtros/filtroClub.js';
import { useNavigation } from '@react-navigation/native';
import { useGetJugadoresByClubQuery, useGetJugadoresQuery } from '../../server/servicesFireBase/services.js';

const Jugadores = () => {
    const [filteredNombre, setFilteredNombre] = useState([]);
    const [habilitadoFilter, setHabilitadoFilter] = useState(null);
    const [search, setSearch] = useState('');
    const [searchClub, setSearchClub] = useState('');
    const navigation = useNavigation();
    
    const { data, error, isLoading } = useGetJugadoresQuery(); 

    useEffect(() => {
        if (data) { 
            let filteredData = Object.values(data).filter(jugador =>
                (jugador.nombre.toLowerCase().includes(search.toLowerCase()) ||
                jugador.apellido.toLowerCase().includes(search.toLowerCase()))
            );

            if (habilitadoFilter !== null) {
                filteredData = filteredData.filter(jugador =>
                    (habilitadoFilter === false && jugador.habilitado === false) || jugador.habilitado === habilitadoFilter
                );
            }

            if (searchClub) {
                filteredData = filteredData.filter(jugador =>
                    jugador.club.toLowerCase().includes(searchClub.toLowerCase())
                );
            }

            setFilteredNombre(filteredData);
        }
    }, [search, data, habilitadoFilter, searchClub]);

    const handlePlayerPress = (item) => {
        navigation.navigate('Información Jugador', { jugador: item });
    };

    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={{ flex: 1 }}>
            <FiltroNombre search={search} setSearch={setSearch} />
            <FiltroClub searchClub={searchClub} setSearchClub={setSearchClub} />
            <FiltroHabilitado setHabilitadoFilter={setHabilitadoFilter} />
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 }}>
                Lista de Jugadores
            </Text>
            {error ? (
                <Text style={{ color: 'red', textAlign: 'center' }}>Error: {error.message}</Text>
            ) : (
                <FlatList
                    data={filteredNombre}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => handlePlayerPress(item)}>
                            <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray', padding: 10 }}>
                                <Text style={{ fontWeight: 'bold' }}>Club: {item.club}</Text>
                                <Text style={{ fontSize: 16, color: 'black' }}>{item.nombre}  {item.apellido}</Text>
                                <Text>Edad: {item.edad}</Text>
                                <Text>Género: {item.genero}</Text>
                                <Text>Habilitado: <Text style={{ fontWeight: 'bold' }}>{item.habilitado === true ? "Sí" : "No"}</Text></Text>
                            </View>
                        </Pressable>
                    )}
                />
            )}
        </View>
    );
};

export default Jugadores;