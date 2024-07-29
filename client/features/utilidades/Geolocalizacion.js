import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';  
import * as Location from 'expo-location';
import MapPreview from '../../views/MapPreview';
import { Colores } from './colores';
import { googleApiKey } from '../../../GoogleApiKey';
import { usePostDireccionMutation } from '../../../server/servicesFireBase/services';
import { useSelector } from 'react-redux';

const LocationSelector = ({navigation}) => {
        const [location, setLocation] = useState(null);
        const [direccion, setDireccion] = useState('')
        const [error, setError] = useState('');
        const [triggerPostDireccion, result] = usePostDireccionMutation()
        const {localId} = useSelector((state) => state.auth.value )

        const fecha = new Date()

        const GuardarDireccion = () => {
            triggerPostDireccion({
                location:{
                latitude: location.latitude,
                longitude: location.longitude,
                direccion,
                modificado: `${fecha.getDate()}/${fecha.getMonth()}/${fecha.getFullYear()} - ${fecha.getHours()}: ${fecha.getMinutes()} `
            },
            localId: localId
        })
            console.log("dirección guardada")
        }
    
        useEffect(() => {
        // esta función se va a crear y cuando termina se auto ejecuta. Se llama IIFE
        (async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                  setError('Permiso para geolocalización denegado');
                  return;
                } else if (status === 'granted') {
                  let location = await Location.getCurrentPositionAsync({});
                  //console.log("location",location)
                  setLocation({
                      latitude: location.coords.latitude,
                      longitude: location.coords.longitude
                  });
                }       
            } catch (error) {
                console.log(error)
            }
        })();
      }, []);

      useEffect(() => {
        (async() => {
            try {
                if (location.latitude) {
                    const url_reverse_geocode = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${googleApiKey}`
                    const response = await fetch(url_reverse_geocode);
                    const data = await response.json()
                    console.dir("geocode",data) // muestra el log en formato de objeto
                    if (data.status === 'OK' && data.results.length > 0) {
                        setDireccion(data.results[0].formatted_address); 
                    } else {
                        console.log("Geocoding error:", data.error_message);
                    }
                }
            } catch (error) {
                console.log(error)
            }
        })()
          }, [location]) // cuando se actualiza location vuelve a ejecutarse el useEffect

    return (
        <View style={styles.container}>
            {error ? (
                <View>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            ) : location ? (
                <View>
                    <Text>Latitude: {location.latitude}, Longitude: {location.longitude}</Text>
                    <MapPreview location={location} />
                    <Pressable
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.6 : 1
                },
                styles.button
              ]}
              onPress={GuardarDireccion}
            >
              <Text style={styles.buttonText}>Guardar dirección 📍</Text>
            </Pressable>
                </View>
            ) : (
                <View>
                    <Text>Loading location...</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        textAlign:'center',
        marginVertical: 45
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },button: {
        backgroundColor: Colores.verde2, 
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
      },
      buttonText: {
        color: 'black',
        fontSize: 16,
      },
});

export default LocationSelector;
