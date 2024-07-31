import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, FlatList, Pressable, ActivityIndicator, Image } from 'react-native';
import FiltroNombre from '../filtros/filtroNombre.js';
import FiltroHabilitado from '../filtros/filtroHabilitado.js';
import FiltroClub from '../filtros/filtroClub.js';
import { useNavigation } from '@react-navigation/native';
import { useGetJugadoresQuery } from '../../server/servicesFireBase/services.js';
import Avatar from '../imagenes/avatarX.png'; // imagen por default si no hay profileImageURI
import useFotoPerfilJugadores from '../customHooks/fotoPerfilJugadores.js';
import { setUsuarios } from '../features/User/SliceConKey.js';
import { useDispatch } from 'react-redux';
import useJugadoresArray from '../customHooks/JugadoresArray.js';

const Jugadores = () => {
    const [filteredNombre, setFilteredNombre] = useState([]);
    const [habilitadoFilter, setHabilitadoFilter] = useState(null);
    const [search, setSearch] = useState('');
    const [searchClub, setSearchClub] = useState('');
    const navigation = useNavigation();

    const dispatch = useDispatch()

    const { data, error, isLoading } = useGetJugadoresQuery();
    const profileImageURI = useFotoPerfilJugadores(); 
    //console.log("esto trae data en JUGADORES",data)

    const jugadoresArray = useJugadoresArray(data); // custom Hook que convierte el objeto data en un array

    // ahora que es un array me permite hacer un .map que agrega profileImageURI a cada item "jugador" dentro
    const completeUsuarioDatos = useMemo(() => {
        return jugadoresArray.map((jugador) => {
            
            console.log("Jugador KEY: ", jugador.key) // trae la key ok
            //console.log("Jugador localId: ", jugador.localId); // trae el localId correctamente y coincide con el localId de la foto que está en profileImages de mi firebase
            return {
                ...jugador,
                profileImageURI: profileImageURI? profileImageURI : Avatar, 
            };
        });
    }, [jugadoresArray, profileImageURI]);


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
                                <Image source={item.profileImageUri ? { uri: item.profileImageUri } : Avatar} style={{ width: 50, height: 50, borderRadius: 25 }} />
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
