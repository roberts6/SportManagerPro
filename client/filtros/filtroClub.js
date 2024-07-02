import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';

const FiltroClub = ({searchClub, setSearchClub }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <TextInput
                placeholder="Buscar por club"
                value={searchClub}
                onChangeText={setSearchClub}
                style={styles.filtroClub}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    filtroClub:{ height: 40, 
        width: '95%' , 
        borderColor: 'gray', 
        borderWidth: 1, 
        margin: 10, 
        paddingLeft: 10 }
    }
)


export default FiltroClub;

