import React, { useState } from 'react';
import { View, Button, TextInput, ScrollView, StyleSheet, Text, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { calcularCategoria } from '../features/utilidades/calcularCategoriaHandball.js';
import { calcularEdad } from '../features/utilidades/calcularEdad.js';
import { usePostJugadorMutation } from '../../server/servicesFireBase/services.js';

const CrearJugador = () => {
    const initialState = {
        id: '',
        nombre: '',
        apellido: '',
        dni: '',
        edad: '',
        genero: '',
        telefono: '',
        direccion: '',
        email: '',
        fecha_nacimiento: '',
        club: '',
        telefono_emergencia: '',
        prestador_servicio_emergencia: '',
        habilitado: false,
        mostrarClubesDropdown: false
    };

    const [dato, setDato] = useState(initialState);
    const [mostrarGenero, setMostrarGenero] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [clubes, setClubes] = useState([]);
    const [fecha, setFecha] = useState(new Date());

    const handleOnChangeInput = (clave, valor) => {
        //console.log('Actualizando estado:', clave, valor);
        setDato((dato) => ({ ...dato, [clave]: valor }));
    };

    const seleccionarGenero = (valor) => {
        handleOnChangeInput('genero', valor);
        setMostrarGenero(false);
    };

    const seleccionarFecha = (event, selectedDate) => {
        // Maneja la cancelación del DatePicker en Android
        if (event.type === 'dismissed') {
            setShowDatePicker(false);
            return;
        }

        // Si la fecha está definida, actualiza el estado
        // const currentDate = selectedDate || fecha;
        // setShowDatePicker(false);
        // setFecha(currentDate);
        const currentDate = selectedDate || fecha;
    if(Platform.OS === 'ios') {
        setShowDatePicker(true); // Para iOS
    } else {
        setShowDatePicker(false); // Para Android
    }
    setFecha(currentDate);

        //console.log('Fecha seleccionada:', currentDate);

        // Convierte la fecha a una cadena en formato YYYY-MM-DD
        const formattedDate = currentDate.toISOString().split('T')[0];
        //console.log('Fecha formateada:', formattedDate);

        handleOnChangeInput('fecha_nacimiento', formattedDate);
    };

    const generateRandomId = () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    };

    const validarEmail = (email) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return re.test(String(email).toLowerCase());
    };

    const [triggerPostJugador, result] = usePostJugadorMutation();

    const guardarJugadorNuevo = async () => {
        try {
            const jugador = {
                id: generateRandomId(),
                nombre: dato.nombre,
                apellido: dato.apellido,
                edad: calcularEdad(dato.fecha_nacimiento),
                categoria: calcularCategoria(dato.fecha_nacimiento),
                genero: dato.genero,
                telefono: dato.telefono,
                direccion: dato.direccion,
                email: dato.email,
                fecha_nacimiento: dato.fecha_nacimiento,
                club: dato.club,
                telefono_emergencia: dato.telefono_emergencia,
                prestador_servicio_emergencia: dato.prestador_servicio_emergencia,
                habilitado: false
            };
            await triggerPostJugador(jugador);
            alert('Jugador guardado exitosamente');
            //console.log('Jugador guardado exitosamente', jugador);

            // Reinicia el formulario a valores vacíos
            setDato(initialState);

            // Reinicia otros estados si es necesario
            setFecha(new Date());
            setShowDatePicker(false);
            setMostrarGenero(false);
            setClubes([]);
        } catch (error) {
            alert('Ups!! Hubo un error. No pudimos guardar la información');
            //console.error('Error al guardar el jugador:', error);
        }
    };

    return (
        <ScrollView>
            <View style={[styles.input, {marginTop: 30}]}>
                <TextInput
                    placeholder='Nombre'
                    onChangeText={(valor) => handleOnChangeInput('nombre', valor)}
                    value={dato.nombre}
                    style={styles.placeholder}
                />
            </View>
            <View style={styles.input}>
                <TextInput
                    placeholder='Apellido'
                    onChangeText={(valor) => handleOnChangeInput('apellido', valor)}
                    value={dato.apellido}
                    style={styles.placeholder}
                />
            </View>
            <View style={styles.input}>
                <TextInput
                    placeholder='DNI'
                    onChangeText={(valor) => handleOnChangeInput('dni', valor)}
                    value={dato.dni}
                    keyboardType='numeric'
                    style={styles.placeholder}
                />
            </View>
            <View style={styles.input}>
                <Button
                    title={dato.genero !== '' ? dato.genero : 'Género'}
                    onPress={() => setMostrarGenero(!mostrarGenero)}
                />
                {mostrarGenero && (
                    <View>
                        <Button title="Masculino" onPress={() => seleccionarGenero('Masculino')} />
                        <Button title="Femenino" onPress={() => seleccionarGenero('Femenino')} />
                    </View>
                )}
            </View>
            <View style={styles.input}>
                <TextInput
                    placeholder='Teléfono'
                    onChangeText={(valor) => handleOnChangeInput('telefono', valor)}
                    value={dato.telefono}
                    keyboardType='phone-pad'
                    style={styles.placeholder}
                />
            </View>
            <View style={styles.input}>
                <TextInput
                    placeholder='Dirección'
                    onChangeText={(valor) => handleOnChangeInput('direccion', valor)}
                    value={dato.direccion}
                    style={styles.placeholder}
                />
            </View>
            <View style={styles.input}>
                <TextInput
                    placeholder='Email'
                    onChangeText={(valor) => handleOnChangeInput('email', valor)}
                    value={dato.email}
                    keyboardType='email-address'
                    style={styles.placeholder}
                />
            </View>
            <View style={[styles.input, styles.fecha]}>
                <Button
                    title={dato.fecha_nacimiento !== '' ? dato.fecha_nacimiento : 'Fecha de Nacimiento'}
                    onPress={() => setShowDatePicker(true)}
                />
                {showDatePicker && (
                    <DateTimePicker
                        value={fecha}
                        mode="date"
                        display="default"
                        onChange={seleccionarFecha}
                    />
                )}
            </View>
            <View style={styles.input}>
                <Text style={{color: "black"}}>Edad {dato.edad}</Text>
            </View>
            <View style={styles.input}>
                <Button
                    title={dato.club !== '' ? dato.club : 'Club'} 
                    onPress={() => handleOnChangeInput('mostrarClubesDropdown', !dato.mostrarClubesDropdown)}
                />
                {dato.mostrarClubesDropdown && (
                    <View>
                        {clubes.map((club) => (
                            <Button title={club.nombre} key={club.id} onPress={() => handleOnChangeInput('club', club.nombre)} />
                        ))}
                    </View>
                )}
            </View>
            <View style={styles.input}>
                <TextInput
                    placeholder='Teléfono de Emergencia'
                    onChangeText={(valor) => handleOnChangeInput('telefono_emergencia', valor)}
                    value={dato.telefono_emergencia}
                    keyboardType='numeric'
                    style={styles.placeholder}
                />
            </View>
            <View style={styles.input}>
                <TextInput
                    placeholder='Prestador de Servicio de Emergencia'
                    onChangeText={(valor) => handleOnChangeInput('prestador_servicio_emergencia', valor.toUpperCase())}
                    value={dato.prestador_servicio_emergencia}
                    style={styles.placeholder}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title='Guardar'
                    onPress={guardarJugadorNuevo}
                    color='white'
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    input: {
        marginVertical: 10,
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    placeholder:{
        fontSize:20
    },
    fecha: {
        textAlign: "center",
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "column"
    },
    buttonContainer: {
        backgroundColor: 'green',
        padding: 10,
        marginVertical: 50,
        marginHorizontal: 50,
        borderRadius: 5,
    },
});

export default CrearJugador;

