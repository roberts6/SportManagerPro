import {createNativeStackNavigator} from '@react-navigation/native-stack'
import MiPerfil from '../views/MiPerfil';
import Camara from '../features/utilidades/Camara.js'
import LocationSelector from '../features/utilidades/Geolocalizacion.js';

const Stack = createNativeStackNavigator();

const MiPerfilStackNavigator = ({ route }) => {
    const { usuarioDatos } = route.params || {};
return (
    <Stack.Navigator initialRouteName='Mi Perfil'>
        <Stack.Screen name='Mi Perfil' component={MiPerfil} initialParams={{ usuarioDatos }} />
        <Stack.Screen name='Camara' component={Camara} />
        <Stack.Screen name='Location' component={LocationSelector} />
    </Stack.Navigator>
)
}

export default MiPerfilStackNavigator;