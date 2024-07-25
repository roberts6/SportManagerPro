import {createNativeStackNavigator} from '@react-navigation/native-stack'
import MiPerfil from '../views/MiPerfil';

const Stack = createNativeStackNavigator();

const MiPerfilStackNavigator = ({ route }) => {
    const { usuarioDatos } = route.params || {};
return (
    <Stack.Navigator>
        <Stack.Screen name='Mi Perfil' component={MiPerfil} initialParams={{ usuarioDatos }} />
    </Stack.Navigator>
)
}

export default MiPerfilStackNavigator;