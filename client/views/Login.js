import React, { useEffect, useState } from 'react';
import { View, TextInput, ScrollView, StyleSheet, Text, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useSignInMutation } from '../../server/servicesFireBase/credencialesApi';
import { setUser } from '../slice/User/AuthSlice';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [triggerSignIn, result] = useSignInMutation();

    useEffect(() => {
        if (result.isSuccess) {
            const { idToken, displayName, email, localId } = result.data;
            dispatch(setUser({ displayName, email, idToken, localId }));
            navigation.navigate('Inicio', { usuario: result.data, showTabNavigator: true });
            console.log("1 - datos que vienen con el result", result.data);
        } else if (result.isError) {
            Alert.alert('Error', 'Error al iniciar sesión. Por favor, inténtalo de nuevo.');
            console.log("Error:", result.status);
        }
    }, [result, dispatch, navigation]);

    const validarEmail = (email) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return re.test(String(email).toLowerCase());
    };

    const iniciarSesion = async () => {
        // Validaciones de email y contraseña
        if (!email) {
            Alert.alert('Error', 'Por favor ingrese su email.');
            return;
        }

        if (!validarEmail(email)) {
            Alert.alert('Error', 'Por favor ingrese un email válido.');
            return;
        }

        if (!password || password.length <= 3) {
            Alert.alert('Error', 'Por favor ingrese una contraseña mayor a 4 caracteres.');
            return;
        }

        try {
            await triggerSignIn({ email, password, returnSecureToken: true });
            console.log('login:', email, password);
        } catch (error) {
            Alert.alert('Error', 'Ups!! Hubo un error. No pudimos iniciar sesión.');
            console.error('Error al iniciar sesión:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Email'
                    onChangeText={setEmail}
                    value={email}
                    autoCapitalize='none'
                    keyboardType='email-address'
                    style={styles.placeholder}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Password'
                    onChangeText={setPassword}
                    value={password}
                    style={styles.placeholder}
                    secureTextEntry={true} 
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
