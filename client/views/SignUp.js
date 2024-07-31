import React, { useState } from 'react';
import { View, Button, TextInput, ScrollView, StyleSheet, Text, Platform, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { calcularCategoria } from '../customHooks/calcularCategoriaHandball.js';
import { calcularEdad } from '../customHooks/calcularEdad.js';
import { fechaYhora } from '../features/utilidades/fechaYhora.js';
import { usePostJugadorMutation, usePostDelegadoMutation, usePostEntrenadorMutation } from '../../server/servicesFireBase/services';
import { useGetClubesQuery } from '../../server/servicesFireBase/services.js';
import { useSignUpMutation } from '../../server/servicesFireBase/credencialesApi';
import { useNavigation } from '@react-navigation/native';
import Avatar from '../imagenes/avatarX.png'
import { useSelector } from 'react-redux';


const SignUp = () => {
    const navigation = useNavigation();
    
    const { localId } = useSelector((state) => state.auth.value);

    const initialState = {
        foto: '',
        id: '',
        localId: '',
        nombre: '',
        apellido: '',
        dni: '',
        edad: '',
        genero: '',
        telefono: '',
        direccion: '',
        email: '',
        password: '',
        confirmacionPassword: '',
        fecha_nacimiento: '',
        club: '',
        rol: '',
        telefono_emergencia: '',
        prestador_servicio_emergencia: '',
        habilitado: false,
        fecha_registro: '',
        mostrarClubesDropdown: false
    };

    const [dato, setDato] = useState(initialState);
    const [mostrarGenero, setMostrarGenero] = useState(false);
    const [mostrarRol, setMostrarRol] = useState(false);
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

    const seleccionarRol = (valor) => {
        handleOnChangeInput('rol', valor);
        setMostrarRol(false);
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
    const [triggerPostDelegado, resultDelegado] = usePostDelegadoMutation()
    const [triggerPostEntrenador, resultEntrenador] = usePostEntrenadorMutation()
    const [triggerSignUp, resultSignUp] = useSignUpMutation()
    const {data: dataClubes} = useGetClubesQuery()

    const guardarUsuarioNuevo = async () => {
        const { nombre, apellido, dni, fecha_nacimiento, genero, telefono, rol, direccion, email, password, confirmacionPassword, club, telefono_emergencia, prestador_servicio_emergencia, fecha_registro } = dato;
    
        // Validate input fields
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
            alert('Por favor ingresá tu teléfono');
            return;
        } else if (isNaN(Number(telefono)) || telefono.length <= 9) {
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
    
        if (!password || password.length <= 5) {
            alert('Por favor ingresa con un mínimo de 6 caracteres');
            return;
        }
    
        if (confirmacionPassword !== password) {
            alert("La confirmación de tu password no es igual al password ingresado");
            return;
        }
    
        if (!fecha_nacimiento) {
            alert('Por favor ingresá tu fecha de nacimiento.');
            return;
        }
    
        if (!club) {
            alert('Por favor ingresá en qué club jugás.');
            return;
        }
    
        if (!rol) {
            alert(`Por favor ingresá cuál es tu función en ${club}.`);
            return;
        }
    
        if (!telefono_emergencia) {
            alert('Por favor ingresá un teléfono de emergencia');
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
            const generatedId = generateRandomId();
    
            const usuarioComun = {
                id: generatedId,
                localId: localId,
                nombre: dato.nombre,
                apellido: dato.apellido,
                edad: calcularEdad(dato.fecha_nacimiento),
                genero: dato.genero,
                telefono: dato.telefono,
                direccion: dato.direccion,
                email: dato.email,
                password: dato.password,
                confirmacionPassword: dato.confirmacionPassword,
                fecha_nacimiento: dato.fecha_nacimiento,
                club: dato.club,
                rol: dato.rol,
                telefono_emergencia: dato.telefono_emergencia,
                prestador_servicio_emergencia: dato.prestador_servicio_emergencia,
                habilitado: false,
                fecha_registro: fechaYhora(),
            };
            
            if (dato.rol === 'Jugador') {
                const jugador = {
                    ...usuarioComun,
                    categoria: calcularCategoria(dato.fecha_nacimiento)
                };
                await triggerPostJugador(jugador);
            } else if (dato.rol === 'Delegado') {
                const delegado = { ...usuarioComun };
                await triggerPostDelegado(delegado);
            } else if (dato.rol === 'Entrenador') {
                const entrenador = { ...usuarioComun };
                await triggerPostEntrenador(entrenador);
            }
            
            await triggerSignUp({ email, password, returnSecureToken: true });
    
            // Limpiar datos y mostrar alerta de éxito
            setDato(initialState);
            setFecha(new Date());
            setShowDatePicker(false);
            setMostrarGenero(false);
            setMostrarRol(false);
            setClubes([]);
            alert(`${dato.rol} guardado exitosamente`);
    
            navigation.navigate('Login', { id: generatedId, nombre: dato.nombre, email, password });
    
        } catch (error) {
            alert('Ups!! Hubo un error. No pudimos guardar la información');
            console.error('Error al guardar el usuario:', error);
        }
    };
    
    return (
        <ScrollView style={{flex:1}}>
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
                    autoCapitalize='none'
                    style={styles.placeholder}
                />
            </View>
            <View style={styles.input}>
                <TextInput
                    placeholder='Password'
                    onChangeText={(valor) => handleOnChangeInput('password', valor)}
                    value={dato.password}
                    style={styles.placeholder}
                    secureTextEntry={true} // Esto hace que el texto se oculte como contraseña
                />
            </View>
            <View style={styles.input}>
                <TextInput
                    placeholder='Confirmar Password'
                    onChangeText={(valor) => handleOnChangeInput('confirmacionPassword', valor)}
                    value={dato.confirmacionPassword}
                    style={styles.placeholder}
                    secureTextEntry={true} // Esto hace que el texto se oculte como contraseña
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
                <Button
                    title={dato.rol !== '' ? dato.rol : 'Rol'}
                    onPress={() => setMostrarRol(!mostrarRol)}
                />
                {mostrarRol && (
                    <View>
                        <Button title="Jugador" onPress={() => seleccionarRol('Jugador')} />
                        <Button title="Entrenador" onPress={() => seleccionarRol('Entrenador')} />
                        <Button title="Delegado" onPress={() => seleccionarRol('Delegado')} />
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
                    onPress={guardarUsuarioNuevo}
                    color='white'
                />
            </View>
            <View style={styles.signupContainer}>
                <Text style={styles.signupText}>¿No tenés una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate('Login')} style={styles.signupButton}>
                    <Text style={styles.signupButtonText}> Login</Text>
                </Pressable>
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
    signupContainer: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 45,
        justifyContent: 'center'
    },
    signupButtonText: {
        fontSize: 16,
        color: 'blue',
    },
});

export default SignUp;

