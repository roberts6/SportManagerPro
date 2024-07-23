import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Pressable, ActivityIndicator } from 'react-native';
import FiltroNombre from '../filtros/filtroNombre.js';
import FiltroHabilitado from '../filtros/filtroHabilitado.js';
import FiltroClub from '../filtros/filtroClub.js';
import { useNavigation } from '@react-navigation/native';
import { useGetJugadoresByClubQuery, useGetJugadoresQuery } from '../../server/servicesFireBase/services.js';
import TabNavigator from '../tabs/TabNavigator.js';

const Jugadores = () => {
    const [filteredNombre, setFilteredNombre] = useState([]);
    const [habilitadoFilter, setHabilitadoFilter] = useState(null);
    const [search, setSearch] = useState('');
    const [searchClub, setSearchClub] = useState('');
    const navigation = useNavigation();
    
    const { data, error, isLoading } = useGetJugadoresQuery(); 

    //console.log("esto trae data en Jugadores",data)

    useEffect(() => {
        if (data) { 
            let filteredData = Object.values(data).filter(jugador =>
                (jugador.nombre && jugador.apellido && (jugador.nombre.toLowerCase().includes(search.toLowerCase()) ||
                jugador.apellido.toLowerCase().includes(search.toLowerCase()))
            ));
    
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
                keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
                renderItem={({ item }) => (
                    <Pressable onPress={() => handlePlayerPress(item)}>
                        <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray', padding: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>{item.club}</Text>
                            <Text style={{ fontSize: 16, color: 'black' }}>{item.nombre}  {item.apellido}</Text>
                            <Text>Edad: {item.edad}</Text>
                            <Text>Categoría: {item.categoria}</Text>
                            <Text>Género: {item.genero}</Text>
                            <Text>Habilitado: <Text style={{ fontWeight: 'bold' }}>{item.habilitado === true ? "Sí" : "No"}</Text></Text>
                        </View>
                    </Pressable>
                )}
            />            
            )}
            <TabNavigator/>
        </View>
    );
};

export default Jugadores;