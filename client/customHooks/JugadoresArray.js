import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setUsuarios } from '../features/User/SliceConKey.js';

const useJugadoresArray = (data) => {
    const dispatch = useDispatch();

    const jugadoresArray = useMemo(() => {
        if (data && typeof data === 'object') {
            return Object.entries(data).map(([key, jugador]) => ({ key, ...jugador }));
        }
        return [];
    }, [data]);

   
    useEffect(() => {
        if (jugadoresArray.length > 0) {
            //console.log("Jugadores Array with Keys:", jugadoresArray);
            dispatch(setUsuarios(jugadoresArray)); // Store jugadores in Redux
        }
    }, [jugadoresArray, dispatch]);

    return jugadoresArray; 
};

export default useJugadoresArray;
