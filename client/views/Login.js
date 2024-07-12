import React, { useState } from 'react';
import { View, Button, TextInput, ScrollView, StyleSheet, Text, TouchableOpacity, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Importa tu función de inicio de sesión / autenticación
import { apiKey } from '../../server/usersFirebase.js'; 

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
            // await apiKey({ email, password });
            // alert('Inicio de sesión exitoso');
            console.log('login:', email, password)
            // Navega a la pantalla principal
            navigation.navigate('Inicio');
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
                <Pressable onPress={iniciarSesion} style={styles.button}>
                    <Text style={styles.buttonText}>Iniciar Sesión</Text>
                </Pressable>
            </View>
            <View style={styles.signupContainer}>
                <Text style={styles.signupText}>¿No tenés una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate('Registro')} style={styles.signupButton}>
                    <Text style={styles.signupButtonText}>Registrate</Text>
                </Pressable>
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
    signupContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    signupText: {
        fontSize: 16,
    },
    signupButton: {
        marginLeft: 10,
    },
    signupButtonText: {
        fontSize: 16,
        color: 'blue',
    },
});

export default Login;