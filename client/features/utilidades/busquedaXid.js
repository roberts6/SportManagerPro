import { useState, useEffect } from 'react';
import { useGetJugadorIdQuery, useGetEntrenadorIdQuery, useGetDelegadoIdQuery } from '../../../server/servicesFireBase/services.js';

export const useBusquedaXid = (id) => {
    const { data: JugadorId, isSuccess: JugadorIdSuccess } = useGetJugadorIdQuery(id);
    const { data: EntrenadorId, isSuccess: EntrenadorIdSuccess } = useGetEntrenadorIdQuery(id);
    const { data: DelegadoId, isSuccess: DelegadoIdSuccess } = useGetDelegadoIdQuery(id);
    
    const [datosJugadoresId, setDatosJugadoresId] = useState(null);
    const [datosEntrenadoresId, setDatosEntrenadoresId] = useState(null);
    const [datosDelegadosId, setDatosDelegadosId] = useState(null);

    useEffect(() => {
        if (JugadorIdSuccess && JugadorId) {
            const jugador = Object.values(JugadoIdl)[0];
            setDatosJugadoresId(jugador);
        }
        if (EntrenadorIdSuccess && EntrenadorId) {
            const entrenador = Object.values(EntrenadorId)[0];
            setDatosEntrenadoresId(entrenador);
        }
        if (DelegadoIdSuccess && DelegadoId) {
            const delegado = Object.values(DelegadoId)[0];
            setDatosDelegadosId(delegado);
        }
    }, [JugadorIdSuccess, EntrenadorIdSuccess, DelegadoIdSuccess, JugadorId, EntrenadorId, DelegadoId]);

    const usuario = datosJugadoresId || datosEntrenadoresId || datosDelegadosId;

    return usuario;
}