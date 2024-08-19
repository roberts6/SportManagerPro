import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsuarios } from '../slice/User/SliceConKey.js';

const useJugadoresArray = (data) => {
    const dispatch = useDispatch();
    const {imageCamera} = useSelector((state) => state.auth.value)
    console.log("qué es imageCamera que trae el useSelector?",imageCamera)

    const jugadoresArray = useMemo(() => {
        if (data && typeof data === 'object') {
            return Object.entries(data).map(([key, jugador]) => ({ key, ...jugador, imageCamera }));
        }
        return [];
    }, [data, imageCamera]);

   
    useEffect(() => {
        if (jugadoresArray.length > 0) {
            //console.log("Jugadores Array with Keys:", jugadoresArray);
            dispatch(setUsuarios(jugadoresArray)); // guarda el objeto jugadoresArray en Redux
        }
    }, [jugadoresArray, dispatch]);

    return jugadoresArray; 
};

export default useJugadoresArray;
