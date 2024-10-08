import React, { useState, useEffect } from 'react';
import { View, TextInput, ScrollView, StyleSheet, Text, Pressable, Button, Platform, Image } from 'react-native';
import { usePutJugadorIdMutation, usePutDelegadoIdMutation, usePutEntrenadorIdMutation } from '../../server/servicesFireBase/services';
import { useGetClubesQuery } from '../../server/servicesFireBase/services';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colores } from '../features/utilidades/colores';
import Avatar from '../imagenes/avatarX.png'
import { useSelector } from 'react-redux';

const EditarDatos = ({route, navigation}) => {
    const { completeUsuarioDatos } = route.params;
    //console.log("3 - objeto recibido en editar", completeUsuarioDatos)
    //const {localId: localDelUsuario} = completeUsuarioDatos;
    //console.log("esta es la key?",completeUsuarioDatos.id)

    const { data: dataClubes } = useGetClubesQuery();
    const {localId} = useSelector((state) => state.auth.value)
    //console.log("localId",localId)

    const [datosUsuario, setDatosUsuario] = useState(completeUsuarioDatos);
    const [mostrarClubesDropdown, setMostrarClubesDropdown] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [fecha, setFecha] = useState(new Date());


    const [triggerPutJugador, { isLoadingJugador, errorJugador }] = usePutJugadorIdMutation();
    const [triggerPutDelegado, { isLoadingDelegado, errorDelegado }] = usePutDelegadoIdMutation();
    const [triggerPutEntrenador, { isLoadingEntrenador, errorEntrenador }] = usePutEntrenadorIdMutation();

    const handleOnChangeInput = (clave, valor) => {
        setDatosUsuario(prevState => ({ ...prevState, [clave]: valor }));
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

    const validarEmail = (email) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return re.test(String(email).toLowerCase());
    };

    const guardarCambiosUsuario = async () => {
        const { nombre, apellido, profileImageURI, dni, fecha_nacimiento, genero, telefono, direccion, email, password, confirmacionPassword, club, telefono_emergencia, prestador_servicio_emergencia, id } = datosUsuario;

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

    if (!password || password.length <= 3) {
        alert('Por favor ingresa un password mayor a 4 caracteres')
        return;
    }

if (confirmacionPassword !== password) {
    alert("La confirmación de tu password no es igual al password ingresado")
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
            if (datosUsuario.rol === "Jugador") {
                await triggerPutJugador({ datosUsuario, id });
                console.log("esto se envía con modificaciones",datosUsuario, 'id enviado al service:', id)
                alert('Datos editados exitosamente');    
            } else if (datosUsuario.rol === "Delegado") {
                //await triggerPutDelegado(datosUsuario, id);
            console.log("esto se envía con modificaciones",datosUsuario, 'id enviado al service:', id)
            alert('Datos editados exitosamente');
            }else {
                //await triggerPutEntrenador(datosUsuario, id);
            console.log("esto se envía con modificaciones",datosUsuario, 'id enviado al service:', id)
            alert('Datos editados exitosamente');
            }
            
        } catch (error) {
            alert('Ups!! Hubo un error. No pudimos actualizar la información');
        }
    };

    if (!datosUsuario) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Cargando...</Text>
            </View>
        );
    }

    const { nombre, apellido, dni, fecha_nacimiento, profileImageURI, genero, telefono, direccion, email: emailUsuario, club, telefono_emergencia, prestador_servicio_emergencia, password, confirmacionPassword } = datosUsuario;

    const isValidURI = typeof profileImageURI === 'string' && profileImageURI.length > 3;

  const imageSource = isValidURI ? { uri: profileImageURI } : Avatar;

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
            <View>
            <Image source={imageSource} style={styles.imagen} />
            </View>
            <Pressable
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.6 : 1
                },
                styles.button
              ]}
              onPress={() => navigation.navigate('Camara', {completeUsuarioDatos})}
            >
              <Text style={styles.buttonText}>Cambiar Foto</Text>
            </Pressable>
                <View style={[styles.inputContainer, { marginTop: 30 }]}>
                    <Text>Nombre</Text>
                    <TextInput
                        placeholder='Nombre'
                        onChangeText={(valor) => handleOnChangeInput('nombre', valor)}
                        value={nombre || ''}
                        style={styles.placeholder}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text>Apellido</Text>
                    <TextInput
                        placeholder='Apellido'
                        onChangeText={(valor) => handleOnChangeInput('apellido', valor)}
                        value={apellido || ''}
                        style={styles.placeholder}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text>Club</Text>
                    <Button
                        title={club || 'Seleccionar Club'}
                        onPress={() => setMostrarClubesDropdown(!mostrarClubesDropdown)}
                    />
                    {mostrarClubesDropdown && dataClubes && (
                        <View style={styles.dropdown}>
                            {dataClubes.map((clubItem) => (
                                <Button
                                    title={clubItem.nombre}
                                    key={clubItem.clubId}
                                    onPress={() => {
                                        handleOnChangeInput('club', clubItem.nombre);
                                        setMostrarClubesDropdown(false);
                                    }}
                                />
                            ))}
                        </View>
                    )}
                </View>
                <View style={styles.inputContainer}>
                    <Text>Email</Text>
                    <TextInput
                        placeholder='email'
                        onChangeText={(valor) => handleOnChangeInput('email', valor)}
                        value={emailUsuario || ''}
                        style={styles.placeholder}
                    />
                </View>
                <View style={styles.input}>
                <TextInput
                    placeholder='Password'
                    onChangeText={(valor) => handleOnChangeInput('password', valor)}
                    value={password}
                    style={styles.placeholder}
                    secureTextEntry={true} // Esto hace que el texto se oculte como contraseña
                />
            </View>
            <View style={styles.input}>
                <TextInput
                    placeholder='Confirmar Password'
                    onChangeText={(valor) => handleOnChangeInput('confirmacionPassword', valor)}
                    value={confirmacionPassword}
                    style={styles.placeholder}
                    secureTextEntry={true} // Esto hace que el texto se oculte como contraseña
                />
            </View>
                <View style={styles.inputContainer}>
                    <Text>Teléfono</Text>
                    <TextInput
                        placeholder='telefono'
                        onChangeText={(valor) => handleOnChangeInput('telefono', valor)}
                        value={telefono || ''}
                        style={styles.placeholder}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text>Dirección</Text>
                    <TextInput
                        placeholder='direccion'
                        onChangeText={(valor) => handleOnChangeInput('direccion', valor)}
                        value={direccion || ''}
                        style={styles.placeholder}
                    />
                </View>
                <Pressable
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.6 : 1
                },
                styles.button
              ]}
              onPress={() => navigation.navigate('Location', {completeUsuarioDatos})}
            >
              <Text style={styles.buttonText}>Geolocalización</Text>
            </Pressable>
                <View style={styles.inputContainer}>
                    <Text>DNI</Text>
                    <TextInput
                        placeholder='DNI'
                        onChangeText={(valor) => handleOnChangeInput('dni', valor)}
                        value={dni || ''}
                        style={styles.placeholder}
                    />
                </View>
                <View style={[styles.input, styles.fecha]}>
                <Text>Fecha nacimiento</Text>
                <Button
                    title={datosUsuario.fecha_nacimiento !== '' ? datosUsuario.fecha_nacimiento : 'Fecha de Nacimiento'}
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
                <View style={styles.inputContainer}>
                    <Text>Género</Text>
                    <TextInput
                        placeholder='genero'
                        onChangeText={(valor) => handleOnChangeInput('genero', valor)}
                        value={genero || ''}
                        style={styles.placeholder}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text>Teléfono Emergencia</Text>
                    <TextInput
                        placeholder='telefono_emergencia'
                        onChangeText={(valor) => handleOnChangeInput('telefono_emergencia', valor)}
                        value={telefono_emergencia || ''}
                        style={styles.placeholder}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text>Prestador servicio de emergencia</Text>
                    <TextInput
                        placeholder='prestador_servicio_emergencia'
                        onChangeText={(valor) => handleOnChangeInput('prestador_servicio_emergencia', valor)}
                        value={prestador_servicio_emergencia || ''}
                        style={styles.placeholder}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <Pressable onPress={guardarCambiosUsuario} style={styles.buttonConfirm}>
                        <Text style={styles.buttonText}>Guardar Cambios</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1
    },
    container: {
        padding: 20,
        alignItems: 'center'
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingText: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 18
    },
    inputContainer: {
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    placeholder: {
        fontSize: 20,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 10,
        textAlign: 'center'
    },
    buttonContainer: {
        padding: 10,
        borderRadius: 5,
        marginTop: 20
    },
    button: {
        backgroundColor: Colores.verde1,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center'
    },
    buttonConfirm: {
        backgroundColor: Colores.verdeOoscuro,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    dropdown: {
        width: '100%',
        backgroundColor: '#eee',
        padding: 5,
        borderRadius: 5,
        marginVertical: 10,
    },
    imagen: {
        width: 200,
        height: 200,
        borderRadius: 100, 
        marginBottom: 15
    },
});

export default EditarDatos;


