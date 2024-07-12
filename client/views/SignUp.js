import React, { useState } from 'react';
import { View, Button, TextInput, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Importa tu función de registro
import { createUser } from '../../server/usersFirebase.js'; 

const SignUp = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigation = useNavigation();

    const validarEmail = (email) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return re.test(String(email).toLowerCase());
    };

    const registrarUsuario = async () => {
        // Validaciones de email, contraseña y nombre
        if (!nombre) {
            alert('Por favor ingrese su nombre.');
            return;
        }

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

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        try {
            // Llama a la función de registro con email y password
            await createUser({ email, password, nombre });
            alert('Registro exitoso');
            // Navega a la pantalla principal o la que sea necesaria tras el registro
            navigation.navigate('Login');
        } catch (error) {
            alert('Ups!! Hubo un error. No pudimos realizar el registro.');
            console.error('Error al registrar usuario:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Nombre'
                    onChangeText={(valor) => setNombre(valor)}
                    value={nombre}
                    style={styles.placeholder}
                />
            </View>
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
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Confirmar Password'
                    onChangeText={(valor) => setConfirmPassword(valor)}
                    value={confirmPassword}
                    style={styles.placeholder}
                    secureTextEntry={true} // Esto hace que el texto se oculte como contraseña
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={registrarUsuario} style={styles.button}>
                    <Text style={styles.buttonText}>Registrarse</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.signupContainer}>
                <Text style={styles.signupText}>¿Ya estás registrad@?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.LoginButton}>
                    <Text style={styles.signupButtonText}>Logueate</Text>
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
    signupButtonText: {
        fontSize: 16,
        color: 'blue',
    },
    LoginButton:{
        marginTop: 10,
        alignItems: 'center'
    }
});

export default SignUp;
