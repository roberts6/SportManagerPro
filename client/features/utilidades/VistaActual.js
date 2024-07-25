import React,{useState, useEffect} from 'react';
import { useNavigationState } from '@react-navigation/native';


export default VistaActual = () => {
    const navigationState = useNavigationState(state => state);
    const [currentRoute, setCurrentRoute] = useState('');

    useEffect(() => {
      // me da el nombre de la ruta actual
      const currentRouteName = navigationState.routes[navigationState.index].name;
      setCurrentRoute(currentRouteName);
      console.log("ahora estoy en ",currentRouteName)
  }, [navigationState]);
}


