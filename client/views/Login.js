import React, { useState } from 'react';
import { View, Button, TextInput, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Importa tu función de inicio de sesión / autenticación
import { loginUser } from '../../server/servicesFireBase/services'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const validarEmail = (email) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return re.test(String(email).toLowerCase());
    };

    const iniciarSesion = async () => {
        // Validaciones de email y contraseña
        if (!email) {
            alert('Por favor ingrese su email.');
            return;
        }

        if (!validarEmail(email)) {
            alert('Por favor ingrese un email válido.');
            return;
        }

        if (!password || password.length <= 3) {
            alert('Por favor ingrese una contraseña mayor a 4 caracteres.');
            return;
        }

        try {
            // Llama a la función de login con email y password
            await loginUser({ email, password });
            alert('Inicio de sesión exitoso');
            // Navega a la pantalla principal o la que sea necesaria tras el login
            navigation.navigate('Home');
        } catch (error) {
            alert('Ups!! Hubo un error. No pudimos iniciar sesión.');
            console.error('Error al iniciar sesión:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Email'
                    onChangeText={(valor) => setEmail(valor)}
                    value={email}
                    keyboardType='email-address'
                    style={styles.placeholder}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Password'
                    onChangeText={(valor) => setPassword(valor)}
                    value={password}
                    style={styles.placeholder}
                    secureTextEntry={true} // Esto hace que el texto se oculte como contraseña
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={iniciarSesion} style={styles.button}>
                    <Text style={styles.buttonText}>Iniciar Sesión</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    inputContainer: {
        width: '100%',
        marginVertical: 10,
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
        padding: 20,
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

export default Login;
