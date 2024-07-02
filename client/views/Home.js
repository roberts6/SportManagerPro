import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useGetJugadoresQuery } from '../../server/servicesFireBase/services';


export default function Home({ navigation }) {
    const {data} = useGetJugadoresQuery()
    console.log("esta es la data de firebase", data)
  return (
      <View>
        <Button title="Jugadores" onPress={() => navigation.navigate('Jugadores')} />
        <Button title="Clubes" onPress={() => navigation.navigate('Clubes')} />
        <Button title="Agregar Jugador" onPress={() => navigation.navigate('Agregar Jugador')} />
      </View>
)}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: 'black',
      fontSize: 24,
    },
  });