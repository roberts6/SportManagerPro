import { useRoute, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Home({ navigation }) {
    const route = useRoute();
    const { email, password } = route.params || {}; // Recibe el email y password desde Login
    
  return (
      <View>
        <Text> Hola {email} </Text>
        <View><Button title="Mi perfil" onPress={() => navigation.navigate('Mi perfil', { email, password })} /></View>
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