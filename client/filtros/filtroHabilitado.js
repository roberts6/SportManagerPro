import React from 'react';
import { View, Text, Button } from 'react-native';

const FiltroHabilitado = ({ setHabilitadoFilter }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text>Habilitado?</Text>
            <Button title="Todos" onPress={() => setHabilitadoFilter(null)} />
            <Button title="Habilitados" onPress={() => setHabilitadoFilter(1)} />
            <Button title="NO Habilitados" onPress={() => setHabilitadoFilter(0)} />
        </View>
    );
};

export default FiltroHabilitado;


