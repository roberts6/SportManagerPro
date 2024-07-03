import React, { useState } from 'react';
import { View, Button, TextInput, ScrollView, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
// import { db } from '../../server/credencialesFireBase';
// import { collection, addDoc } from 'firebase/firestore';


const CrearJugador = () => {
    const [dato, setDato] = useState({
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
    });

    const [mostrarGenero, setMostrarGenero] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [clubes, setClubes] = useState([]);
    const [fecha, setFecha] = useState(new Date());

    const handleOnChangeInput = (clave, valor) => {
        setDato((dato) => ({ ...dato, [clave]: valor }));
    };

    const seleccionarGenero = (valor) => {
        handleOnChangeInput('genero', valor);
        setMostrarGenero(false);
    };

    const seleccionarFecha = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            const offsetDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000);
            const fechaFormateada = offsetDate.toISOString().split('T')[0];
            const [year, month, day] = fechaFormateada.split('-');
            const formattedDate = `${day}/${month}/${year}`;
            setFecha(selectedDate);
            handleOnChangeInput('fecha_nacimiento', formattedDate);
        }
    };

    const validarEmail = (email) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return re.test(String(email).toLowerCase());
    };

    const guardarJugadorNuevo = async () => {
        if (dato.nombre === '') {
            alert('Por favor, ingresa un nombre válido.');
            return;
        }

        if (dato.apellido === '') {
            alert('Por favor, ingresa un apellido válido.');
            return;
        }

        if (dato.edad === '' || isNaN(dato.edad) || parseInt(dato.edad) <= 0) {
            alert('Por favor, ingresa una edad válida.');
            return;
        }

        if (dato.genero === '') {
            alert('Por favor, selecciona un género.');
            return;
        }

        if (dato.telefono === '' || dato.telefono.length < 10) {
            alert('Por favor, ingresa un número de teléfono válido.');
            return;
        }

        if (dato.direccion === '') {
            alert('Por favor, ingresa una dirección válida.');
            return;
        }

        if (dato.email === '' || !validarEmail(dato.email)) {
            alert('Por favor, ingresa un email válido.');
            return;
        }

        if (dato.fecha_nacimiento === '') {
            alert('Por favor, ingresa una fecha de nacimiento válida.');
            return;
        }

        if (dato.telefono_emergencia === '' || dato.telefono_emergencia.length < 10) {
            alert('Por favor, ingresa un número de teléfono de emergencia válido.');
            return;
        }

        if (dato.prestador_servicio_emergencia === '') {
            alert('Por favor, ingresa un prestador de servicio de emergencia válido.');
            return;
        }

        try {
            const docRef = await addDoc(collection(db, 'jugador'), {
                nombre: dato.nombre,
                apellido: dato.apellido,
                edad: dato.edad,
                genero: dato.genero,
                telefono: dato.telefono,
                direccion: dato.direccion,
                email: dato.email,
                fecha_nacimiento: dato.fecha_nacimiento,
                club: dato.club,
                telefono_emergencia: dato.telefono_emergencia,
                prestador_servicio_emergencia: dato.prestador_servicio_emergencia,
                habilitado: false,
            });
            alert('Jugador guardado exitosamente');
            console.log('Jugador guardado con ID:', docRef.dni);
        } catch (error) {
            console.error("Error añadiendo el documento: ", error);
            alert('Hubo un error guardando el jugador');
        }
        console.log(`Este es el jugador: ${JSON.stringify(dato)}`);
    };

    return (
        <ScrollView>
            <View style={styles.input}>
                <TextInput
                    placeholder='Nombre'
                    onChangeText={(valor) => handleOnChangeInput('nombre', valor)}
                    value={dato.nombre}
                />
            </View>
            <View style={styles.input}>
                <TextInput
                    placeholder='Apellido'
                    onChangeText={(valor) => handleOnChangeInput('apellido', valor)}
                    value={dato.apellido}
                />
            </View>
            <View style={styles.input}>
                <TextInput
                    placeholder='DNI'
                    onChangeText={(valor) => handleOnChangeInput('dni', valor)}
                    value={dato.dni}
                    keyboardType='numeric'
                />
            </View>
            <View style={styles.input}>
                <TextInput
                    placeholder='Edad'
                    onChangeText={(valor) => handleOnChangeInput('edad', valor)}
                    value={dato.edad}
                    keyboardType='numeric'
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
                />
            </View>
            <View style={styles.input}>
                <TextInput
                    placeholder='Dirección'
                    onChangeText={(valor) => handleOnChangeInput('direccion', valor)}
                    value={dato.direccion}
                />
            </View>
            <View style={styles.input}>
                <TextInput
                    placeholder='Email'
                    onChangeText={(valor) => handleOnChangeInput('email', valor)}
                    value={dato.email}
                    keyboardType='email-address'
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
                />
            </View>
            <View style={styles.input}>
                <TextInput
                    placeholder='Prestador de Servicio de Emergencia'
                    onChangeText={(valor) => handleOnChangeInput('prestador_servicio_emergencia', valor)}
                    value={dato.prestador_servicio_emergencia}
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
        alignItems: 'center',
        justifyContent: 'center'
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