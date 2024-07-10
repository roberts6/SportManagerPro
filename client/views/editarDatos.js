import React, { useState } from 'react';
import { View, TextInput, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { usePutJugadorMutation } from '../../server/servicesFireBase/services';

const EditarDatos = () => {
    const route = useRoute();
    const { jugador } = route.params;
    const [datosJugador, setDatosJugador] = useState(jugador);
    const [triggerPutJugador, { isLoading, error }] = usePutJugadorMutation();

    const handleOnChangeInput = (clave, valor) => {
        setDatosJugador(prevState => ({ ...prevState, [clave]: valor }));
    };

    const guardarCambiosJugador = async () => {
        try {
            await triggerPutJugador(datosJugador);
            alert('Jugador editado exitosamente');
        } catch (error) {
            alert('Ups!! Hubo un error. No pudimos actualizar la información');
        }
    };

    const { nombre, apellido, dni, fecha_nacimiento, genero, telefono, direccion, email, club, telefono_emergencia, prestador_servicio_emergencia } = datosJugador;

    return (
        <ScrollView>
            <View style={[styles.input, { marginTop: 30 }]}>
                <TextInput
                    placeholder='Nombre'
                    onChangeText={(valor) => handleOnChangeInput('nombre', valor)}
                    value={nombre || ''}
                    style={styles.placeholder}
                />
            </View>
            <View style={styles.input}>
                <TextInput
                    placeholder='Apellido'
                    onChangeText={(valor) => handleOnChangeInput('apellido', valor)}
                    value={apellido || ''}
                    style={styles.placeholder}
                />
            </View>
            <View style={styles.input}>
                <Text>Email</Text>
                <TextInput
                    placeholder='email'
                    onChangeText={(valor) => handleOnChangeInput('email', valor)}
                    value={email || ''}
                    style={styles.placeholder}
                />
            </View>
            <View style={styles.input}>
                <Text>Teléfono</Text>
                <TextInput
                    placeholder='telefono'
                    onChangeText={(valor) => handleOnChangeInput('telefono', valor)}
                    value={telefono || ''}
                    style={styles.placeholder}
                />
            </View>
            <View style={styles.input}>
                <Text>Dirección</Text>
                <TextInput
                    placeholder='direccion'
                    onChangeText={(valor) => handleOnChangeInput('direccion', valor)}
                    value={direccion || ''}
                    style={styles.placeholder}
                />
            </View>
            <View style={styles.input}>
                <Text>Teléfono Emergencia</Text>
                <TextInput
                    placeholder='telefono_emergencia'
                    onChangeText={(valor) => handleOnChangeInput('telefono_emergencia', valor)}
                    value={telefono_emergencia || ''}
                    style={styles.placeholder}
                />
            </View>
            <View style={styles.input}>
                <Text>Prestador servicio de emergencia</Text>
                <TextInput
                    placeholder='prestador_servicio_emergencia'
                    onChangeText={(valor) => handleOnChangeInput('prestador_servicio_emergencia', valor)}
                    value={prestador_servicio_emergencia || ''}
                    style={styles.placeholder}
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={guardarCambiosJugador} style={styles.button}>
                    <Text style={styles.buttonText}>Guardar Cambios</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    input: {
        marginVertical: 10,
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeholder: {
        fontSize: 20,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 10,
        textAlign: "center"
    },
    buttonContainer: {
        padding: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: 'green',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default EditarDatos;
