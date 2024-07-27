import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Pressable, Text } from 'react-native';  
import Avatar from '../../imagenes/avatarX.png'; 
import { Colores } from './colores';
import * as ImagePicker from 'expo-image-picker';
import { setCameraImage } from '../User/UserSlice'; // viene de UserSlice.js dentro de User
import { useDispatch, useSelector } from 'react-redux'; // permite ejecutar el dispach para la función en el slice
import { useGetFotoPerfilQuery, usePostFotoPerfilMutation } from '../../../server/servicesFireBase/services';
import VistaActual from './VistaActual';

const SeleccionarImagen = ({ route,navigation }) => {
    const { completeUsuarioDatos } = route.params;
    const [fotoPerfil, setFotoPerfil] = useState(null); 
    const [triggerPostImage, result] = usePostFotoPerfilMutation();
    const dispatch = useDispatch()
    const {localId} = useSelector((state) => state.auth.value) // Hook de Redux que me permite tomar datos desde el state del store (UserSlice.js) 

    const verifyCameraPermisson = async () => {
        const { granted } = await ImagePicker.requestCameraPermissionsAsync(); 
        return granted;
    }
    
    const takeImage = async () => {
        const CameraOk = await verifyCameraPermisson();
        if (CameraOk) {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                base64: true,
                quality: 0.3 
            });

            if (!result.canceled) {
                const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
                setFotoPerfil(base64Image);
            }
        } 
    }

    const pickImage = async () => {
        const CameraOk = await verifyCameraPermisson();
        if (CameraOk) {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                base64: true,
                quality: 0.3
            });

            if (!result.canceled) {
                const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
                setFotoPerfil(base64Image);
            }
        } 
    }

    const saveImage = () => {
        try {
                dispatch(setCameraImage(fotoPerfil)) 
                triggerPostImage({ fotoPerfil, localId }) 
                console.log("imagen guardada")
                navigation.goBack();     
        } catch (error) {
            console.log("error en saveImage", error);
        }
    }


    return (
        <View style={styles.container}>
            {!fotoPerfil ? (
                <>
                    <Image source={{uri: completeUsuarioDatos.profileImageURI}} style={styles.imagen} /> 
                    <Pressable
                        style={({ pressed }) => [
                            { opacity: pressed ? 0.6 : 1 },
                            styles.button
                        ]}
                        onPress={takeImage}
                    >
                        <Text style={styles.buttonText}>Sacar Foto</Text>
                    </Pressable>
                    <Pressable
                        style={({ pressed }) => [
                            { opacity: pressed ? 0.6 : 1 },
                            styles.button
                        ]}
                        onPress={pickImage}
                    >
                        <Text style={styles.buttonText}>Seleccionar desde la galería</Text>
                    </Pressable>
                    <Pressable
                        style={({ pressed }) => [
                            { opacity: pressed ? 0.6 : 1 },
                            [styles.button, styles.confirmButton]
                        ]}
                        onPress={saveImage}
                    >
                        <Text style={styles.buttonText}>Confirmar y Guardar</Text>
                    </Pressable>
                </>
            ) : (
                <>
                    <Image source={{ uri: fotoPerfil }} style={styles.imagen} /> 
                    <Pressable
                        style={({ pressed }) => [
                            { opacity: pressed ? 0.6 : 1 },
                            styles.button
                        ]}
                        onPress={takeImage}
                    >
                        <Text style={styles.buttonText}>Sacar Foto</Text>
                    </Pressable>
                    <Pressable
                        style={({ pressed }) => [
                            { opacity: pressed ? 0.6 : 1 },
                            styles.button
                        ]}
                        onPress={pickImage}
                    >
                        <Text style={styles.buttonText}>Seleccionar desde la galería</Text>
                    </Pressable>
                    <Pressable
                        style={({ pressed }) => [
                            { opacity: pressed ? 0.6 : 1 },
                            [styles.button, styles.confirmButton]
                        ]}
                        onPress={saveImage}
                    >
                        <Text style={styles.buttonText}>Confirmar y Guardar</Text>
                    </Pressable>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        marginVertical: 25
    },
    imagen: {
        width: 200,
        height: 200,
        borderRadius: 100, 
        marginBottom: 15
    },
    button: {
        backgroundColor: Colores.verde2, 
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default SeleccionarImagen;
