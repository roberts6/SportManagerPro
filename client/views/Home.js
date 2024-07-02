import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function Home({ navigation }) {
    
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