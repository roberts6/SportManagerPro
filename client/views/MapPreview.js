import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { googleApiKey } from '../../GoogleApiKey';

const MapPreview = ({ location }) => {
        const MapPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=13&size=300x300&maptype=roadmap&markers=color:red%7Clabel:Me%7C${location.latitude},${location.longitude}&key=${googleApiKey.mapStatic}`;
        // const MapPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=13&size=600x300&maptype=roadmap
        // &markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C${location.latitude},${location.longitude}
        // &key=${googleApiKey.mapStatic}`;
        //console.log("resultado de MapPreview.js",MapPreviewUrl);
  return (
    <View style={styles.mapPreview}>
        <Image style={styles.mapImage} source={{ uri: MapPreviewUrl }} />
    </View>
  );
};

const styles = StyleSheet.create({
    mapPreview: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    mapImage: {
        width: 300,
        height: 300
    }
})

export default MapPreview;
