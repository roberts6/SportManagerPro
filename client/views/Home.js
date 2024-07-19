import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import {
  useGetDelegadoByEmailQuery,
  useGetJugadorByEmailQuery,
  useGetEntrenadorByEmailQuery,
} from '../../server/servicesFireBase/services';

export default function Home({ navigation, route }) {
  const { nombre, email } = (route.params || {});

  const { data: JugadorEmail, isSuccess: JugadorEmailSuccess } = useGetJugadorByEmailQuery(email);
  const { data: EntrenadorEmail, isSuccess: EntrenadorEmailSuccess } = useGetEntrenadorByEmailQuery(email);
  const { data: DelegadoEmail, isSuccess: DelegadoEmailSuccess } = useGetDelegadoByEmailQuery(email);
  
  const [datosJugadoresEmail, setDatosJugadoresEmail] = useState(null)
  const [datosJEntrenadoresEmail, setDatosJEntrenadoresEmail] = useState(null)
  const [datosDelegadosEmail, setDatosDelegadosEmail] = useState(null)  

  useEffect(() => {
  if (JugadorEmailSuccess && JugadorEmail) {
    const jugador = Object.values(JugadorEmail)[0];
    console.log("Jugador",jugador)
    //setMatchedData({ ...jugador, type: 'Jugador' });
    setDatosJugadoresEmail(jugador);
  }
  if (EntrenadorEmailSuccess && EntrenadorEmail) {
    const entrenador = Object.values(EntrenadorEmail)[0];
    console.log("Entrenador",entrenador);
    //setMatchedData({ ...entrenador, type: 'Entrenador' });
    setDatosJEntrenadoresEmail(entrenador)
  }
  if (DelegadoEmailSuccess && DelegadoEmail) {
    const delegado = Object.values(DelegadoEmail)[0];
    console.log("Delegado",delegado);
    //setMatchedData({ ...delegado, type: 'Delegado' });
    setDatosDelegadosEmail(delegado)
  }
  }, [JugadorEmailSuccess, EntrenadorEmailSuccess, DelegadoEmailSuccess, JugadorEmail, EntrenadorEmail, DelegadoEmail]);

  return (
    <View style={styles.container}>
      {datosJEntrenadoresEmail ? (
        <Text> Hola {datosJEntrenadoresEmail.nombre}!</Text>
      ) : datosJugadoresEmail? (
        <Text> Hola {datosJugadoresEmail.nombre}!</Text>
      ) : datosDelegadosEmail? (
        <Text> Hola {datosDelegadosEmail.nombre}!</Text>
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