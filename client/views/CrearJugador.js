import React, { useState } from 'react';
import { View, Button, TextInput, ScrollView, StyleSheet, Text, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { calcularCategoria } from '../features/utilidades/calcularCategoriaHandball.js';
import { calcularEdad } from '../features/utilidades/calcularEdad.js';
import { usePostJugadorMutation } from '../../server/servicesFireBase/services.js';
import { useGetClubesQuery } from '../../server/servicesFireBase/services.js';

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
        // password: '',
        // confirmacionPassword: '',
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

    // este handler recibe los cambios en cada input y almacena los valores en el objeto dato
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
    
        // Ajusta la fecha para evitar cambios por zona horaria
        const currentDate = selectedDate || date;
        const normalizedDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate()
                );
    
        if (Platform.OS === 'ios') {
            setShowDatePicker(true); // Para iOS
        } else {
            setShowDatePicker(false); // Para Android
        }
        setFecha(normalizedDate);
    
        // Convierte la fecha a una cadena en formato YYYY-MM-DD
        const formattedDate = normalizedDate.toISOString().split('T')[0];
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
    const {data: dataClubes} = useGetClubesQuery()

    const guardarJugadorNuevo = async () => {
        // desestructuro los valores de "dato"
        const { nombre, apellido, dni, fecha_nacimiento, genero, telefono, direccion, email, password, confirmacionPassword, club, telefono_emergencia, prestador_servicio_emergencia } = dato;

    if (!nombre) {
        alert('Por favor ingresá tu nombre.');
        return;
    }

    if (!apellido) {
        alert('Por favor ingresá tu apellido.');
        return;
    }

    if (!dni) {
        alert('Por favor ingresá tu dni.');
        return;
    }

    if (!genero) {
        alert('Por favor elegí tu género.');
        return;
    }

    if (!telefono) {
        alert('Por favor ingresá tu teléfono')
        return;
    } else if (isNaN(Number(telefono)) || telefono.length <= 9 ) {
        alert('El teléfono debe ser numérico y tener al menos 10 dígitos.');
        return;
    }

    if (!direccion) {
        alert('Por favor ingresá tu dirección.');
        return;
    }

    if (!validarEmail(email)) {
        alert('Por favor ingrese un email válido.');
        return;
    }

//     if (!password || password.length <= 3) {
//         alert('Por favor ingresa un password mayor a 4 caracteres')
//         return;
//     }

// if (confirmacionPassword !== password) {
//     alert("La confirmación de tu password no es igual al password ingresado")
//     return;
// }

if (!fecha_nacimiento) {
    alert('Por favor ingresá tu fecha de nacimiento.');
    return;
}

    if (!club) {
        alert('Por favor ingresá en qué club jugás.');
        return;
    }

    if (!telefono_emergencia) {
        alert('Por favor ingresá un teléfono de emergencia')
        return;
    } else if (isNaN(Number(telefono_emergencia)) || telefono_emergencia.length <= 9) {
        alert('El teléfono de emergencia debe ser numérico y tener al menos 10 dígitos.');
        return;
    }

    if (!prestador_servicio_emergencia) {
        alert('Por favor ingresá cuál es tu prestador de servicios de salud.');
        return;
    }

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
                // password: dato.password,
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

            // Reinicia el resto de los estados.
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
                <Button
                    title={dato.club !== '' ? dato.club : 'Club'}
                    onPress={() => handleOnChangeInput('mostrarClubesDropdown', !dato.mostrarClubesDropdown)}
                />
                {dato.mostrarClubesDropdown && (
                    <View style={styles.dropdown}>
                        {dataClubes.map((club) => (
                            <Button
                                title={club.nombre}
                                key={club.clubId}
                                onPress={() => {
                                    handleOnChangeInput('club', club.nombre);
                                    handleOnChangeInput('mostrarClubesDropdown', false); // Cierra el dropdown después de elegir una opción
                                }}
                            />
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

