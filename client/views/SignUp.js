import React, { useEffect, useState } from 'react';
import { View, Button, TextInput, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSignUpMutation } from '../../server/servicesFireBase/credencialesApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/User/UserSlice';


const SignUp = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigation = useNavigation();


    const dispatch = useDispatch()
    const [triggerSignUp, result] = useSignUpMutation()

    useEffect(() => {
        if (result.isSuccess) {
            dispatch(
                setUser({
                    email:result.data.email,
                    idToken:result.data.idToken
                })
            )
        }
    },[result])

    const validarEmail = (email) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return re.test(String(email).toLowerCase());
    };

    const registrarUsuario = async () => {
        // Validaciones de email, contraseña, nombre y apellido
        // if (!nombre) {
        //     alert('Por favor ingrese su nombre.');
        //     return;
        // }

        // if (!apellido) {
        //     alert('Por favor ingrese su apellido.');
        //     return;
        // }

        if (!email) {
            alert('Por favor ingrese su email.');
            return;
        }

        if (!validarEmail(email)) {
            alert('Por favor ingrese un email válido.');
            return;
        }

        if (!password || password.length <= 5) {
            alert('Por favor ingrese una contraseña mayor a 5 caracteres.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        try {
            // Llama a la función de registro con email, password y el returnSecureToken  
            await triggerSignUp({ nombre, password, email, password, returnSecureToken: true });
            alert('Registro exitoso');
            console.log("SignUp -->", email, password)
            console.log("esto es el result del signUp:", result)
            setNombre('')
            setApellido('')
            setEmail('')
            setConfirmPassword('')
            // Navega al Login
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
                    placeholder='Apellido'
                    onChangeText={(valor) => setApellido(valor)}
                    value={apellido}
                    style={styles.placeholder}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Email'
                    onChangeText={(valor) => setEmail(valor)}
                    value={email}
                    autoCapitalize='none' // evita que se coloque sola la mayúscula
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
