import React from 'react';
import { View, Text, Button } from 'react-native';

const FiltroHabilitado = ({ setHabilitadoFilter }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text>Habilitado?</Text>
            <Button title="Todos" onPress={() => setHabilitadoFilter(null)} />
            <Button title="Habilitados" onPress={() => setHabilitadoFilter(true)} />
            <Button title="NO Habilitados" onPress={() => setHabilitadoFilter(false)} />
        </View>
    );
};

export default FiltroHabilitado;


