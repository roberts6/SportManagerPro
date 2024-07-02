import React from 'react';
import { View, TextInput } from 'react-native';

const FiltroNombre = ({ search, setSearch }) => {
    return (
        <View>
            <TextInput
                placeholder="Buscar por Nombre, Apellido"
                value={search}
                onChangeText={setSearch}
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, paddingLeft: 10 }}
            />
        </View>
    );
};

export default FiltroNombre;
