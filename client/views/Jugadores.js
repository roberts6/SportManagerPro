import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, FlatList, Pressable, ActivityIndicator, Image } from 'react-native';
import FiltroNombre from '../filtros/filtroNombre.js';
import FiltroHabilitado from '../filtros/filtroHabilitado.js';
import FiltroClub from '../filtros/filtroClub.js';
import { useNavigation } from '@react-navigation/native';
import { useGetJugadoresQuery, usePutJugadorIdMutation } from '../../server/servicesFireBase/services.js';
import Avatar from '../imagenes/avatarX.png'; // imagen por default si no hay profileImageURI
import useFotoPerfilJugadores from '../customHooks/fotoPerfilJugadores.js';
import { setUsuarios } from '../slice/User/SliceConKey.js';
import useJugadoresArray from '../customHooks/JugadoresArray.js';
import useUsuarioCompleto from '../customHooks/UsuarioCompleto.js';
import { useSelector } from 'react-redux';

const Jugadores = () => {
    const [filteredNombre, setFilteredNombre] = useState([]);
    const [habilitadoFilter, setHabilitadoFilter] = useState(null);
    const [search, setSearch] = useState('');
    const [searchClub, setSearchClub] = useState('');
    const navigation = useNavigation();

    const [triggerPutJugador] = usePutJugadorIdMutation();

    const { data, error, isLoading } = useGetJugadoresQuery();
   
    //console.log("esto trae data en JUGADORES",data) // trae la data correcta con todos los campos completos

    const jugadoresArray = useJugadoresArray(data); // custom Hook que convierte el objeto data en un array

    const completeUsuarioDatos = useMemo(() => {
        return jugadoresArray.map((jugador) => {
            
            const profileImageURI = jugador.profileImageURI || Avatar;
            //console.log("info de cada Jugador en jugadores", jugador.nombre, "imagen -->",profileImageURI ); // trae correctamente la info
    
            const updatedJugador = {
                ...jugador,
                key: jugador.key,
                profileImageURI: profileImageURI  
            };
            return updatedJugador;
        });
    }, [jugadoresArray]);

   
    // useEffect(() => {
    //     completeUsuarioDatos.forEach((jugador) => {
    //         if (jugador.profileImageURI && jugador.profileImageURI !== Avatar) {
    //             // If profileImageURI is set and is not the default Avatar, attempt to update the server.
    //             triggerPutJugador(jugador).unwrap().then((fulfilled) => {
    //                 console.log("Successfully updated player:", jugador.key);
    //             }).catch((error) => {
    //                 console.error("Failed to update player:", jugador.key, error);
    //             });
    //         }
    //     });
    // }, [completeUsuarioDatos, triggerPutJugador]);

    useEffect(() => {
        if (completeUsuarioDatos.length > 0) {
            let filteredData = completeUsuarioDatos.filter(jugador =>
                (jugador.nombre && jugador.apellido && 
                (jugador.nombre.toLowerCase().includes(search.toLowerCase()) || 
                jugador.apellido.toLowerCase().includes(search.toLowerCase())))
            );

            if (habilitadoFilter !== null) {
                filteredData = filteredData.filter(jugador => 
                    (habilitadoFilter === false && jugador.habilitado === false) || jugador.habilitado === habilitadoFilter
                );
            }

            if (searchClub) {
                filteredData = filteredData.filter(jugador => 
                    jugador.club && jugador.club.toLowerCase().includes(searchClub.toLowerCase())
                );
            }

            setFilteredNombre(filteredData);
        } else {
            setFilteredNombre([]);
        }
    }, [search, completeUsuarioDatos, habilitadoFilter, searchClub]);

    const handlePlayerPress = (item) => {
        navigation.navigate('Información Jugador', { jugador: item });
        console.log("esto se manda a detalle JUGADOR", item)
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
                    keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => handlePlayerPress(item)}>
                            <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray', padding: 10 }}>
                            <Image source={item.profileImageURI !== Avatar ? { uri: item.profileImageURI } : Avatar} style={{ width: 50, height: 50, borderRadius: 25 }} />
                                <Text style={{ fontWeight: 'bold' }}>{item.club}</Text>
                                <Text style={{ fontSize: 16, color: 'black' }}>{item.nombre} {item.apellido}</Text>
                                <Text>Edad: {item.edad}</Text>
                                <Text>Categoría: {item.categoria}</Text>
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
