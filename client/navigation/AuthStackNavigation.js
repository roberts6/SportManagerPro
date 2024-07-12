import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../views/Login';
import SignUp from '../views/SignUp';

const Stack = createNativeStackNavigator();

const AuthStackNavigator = () => {
    const [userLogged, setUserLogged] = useState(null);

    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false // para que no muestre el header
            }}
        >
            <Stack.Screen component={Login} name='Login'/>
            <Stack.Screen component={SignUp} name='Registro'/>
        </Stack.Navigator>
    );
}

export default AuthStackNavigator;
